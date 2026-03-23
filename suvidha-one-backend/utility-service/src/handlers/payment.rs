use crate::AppState;
use axum::{extract::{Json, State}, response::IntoResponse};
use rust_decimal::Decimal;
use serde::Deserialize;
use shared::{
    error::{AppError, PaymentError},
    razorpay::{KioskPaymentRequest, RazorpayService, paise_to_decimal},
    response::ok,
};
use uuid::Uuid;

#[derive(Debug, Deserialize)]
pub struct CreateKioskPaymentRequest {
    pub phone: String,
    pub amount: i64, // Amount in paise
    pub service_type: String,
    pub kiosk_id: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct VerifyKioskPaymentRequest {
    pub razorpay_order_id: String,
    pub razorpay_payment_id: String,
    pub razorpay_signature: String,
}

fn validate_indian_phone(phone: &str) -> Result<String, AppError> {
    let cleaned = phone.trim().replace(&[' ', '-', '(', ')'][..], "");

    let normalized = if cleaned.starts_with("+91") {
        cleaned
    } else if cleaned.starts_with("91") && cleaned.len() == 12 {
        format!("+{}", cleaned)
    } else if cleaned.len() == 10 && cleaned.chars().all(|c| c.is_ascii_digit()) {
        format!("+91{}", cleaned)
    } else {
        return Err(AppError::Validation(
            "Phone number must be a valid Indian number (+91XXXXXXXXXX)".to_string(),
        ));
    };

    if !normalized.starts_with("+91") || normalized.len() != 13 {
        return Err(AppError::Validation(
            "Phone number must be in format +91XXXXXXXXXX".to_string(),
        ));
    }

    Ok(normalized)
}

pub async fn create_kiosk_payment(
    State(state): State<AppState>,
    Json(req): Json<CreateKioskPaymentRequest>,
) -> Result<impl IntoResponse, AppError> {
    let phone = validate_indian_phone(&req.phone)?;

    // Rate limiting (max 10 requests/hour/phone)
    let rate_key = format!("payment:rate:{}", phone);
    let mut conn = state
        .redis_pool
        .get()
        .await
        .map_err(|e| AppError::Cache(e.to_string()))?;

    let rate_count: i64 = redis::cmd("INCR")
        .arg(&rate_key)
        .query_async(&mut *conn)
        .await
        .map_err(|e| AppError::Cache(e.to_string()))?;

    if rate_count == 1 {
        let _: () = redis::cmd("EXPIRE")
            .arg(&rate_key)
            .arg(3600i64)
            .query_async(&mut *conn)
            .await
            .map_err(|e| AppError::Cache(e.to_string()))?;
    }

    if rate_count > 10 {
        return Err(AppError::RateLimited(
            "Too many payment requests. Max 10 per hour.".to_string(),
        ));
    }

    let razorpay = RazorpayService::new()
        .map_err(|e| AppError::Config(format!("Razorpay not configured: {}", e)))?;

    let kiosk_request = KioskPaymentRequest {
        phone: phone.clone(),
        amount: req.amount,
        service_type: req.service_type.clone(),
        kiosk_id: req.kiosk_id.clone().unwrap_or_else(|| "DEFAULT".to_string()),
    };

    let order_response = razorpay
        .create_kiosk_payment(&kiosk_request)
        .await
        .map_err(|e| AppError::External(format!("Razorpay error: {}", e)))?;

    // Persist payment
    let payment_id = Uuid::new_v4();
    let amount_decimal = paise_to_decimal(req.amount);
    let expires_at = chrono::Utc::now() + chrono::Duration::minutes(15);

    sqlx::query!(
        r#"INSERT INTO payments
           (payment_id, user_id, amount, tx_ref, status, method, razorpay_order_id, phone, service_type, kiosk_id, expires_at)
           VALUES ($1, $2, $3, $4, 'Pending', 'UPI', $5, $6, $7, $8, $9)"#,
        payment_id,
        Uuid::nil(),
        amount_decimal,
        order_response.receipt,
        order_response.order_id,
        phone,
        req.service_type,
        req.kiosk_id.unwrap_or_else(|| "DEFAULT".to_string()),
        expires_at
    )
    .execute(&state.db_pool)
    .await?;

    sqlx::query!(
        "INSERT INTO payment_events (payment_id, event_type, event_data) VALUES ($1, 'created', $2)",
        payment_id,
        serde_json::json!({
            "razorpay_order_id": order_response.order_id,
            "amount_paise": req.amount,
            "phone": phone,
            "service_type": req.service_type
        })
    )
    .execute(&state.db_pool)
    .await
    .ok();

    Ok(ok(order_response))
}

pub async fn verify_kiosk_payment(
    State(state): State<AppState>,
    Json(req): Json<VerifyKioskPaymentRequest>,
) -> Result<impl IntoResponse, AppError> {
    let razorpay = RazorpayService::new()
        .map_err(|e| AppError::Config(format!("Razorpay not configured: {}", e)))?;

    let mut conn = state
        .redis_pool
        .get()
        .await
        .map_err(|e| AppError::Cache(e.to_string()))?;

    let idempotency_key = format!("verify:{}:{}", req.razorpay_order_id, req.razorpay_payment_id);
    let acquired: bool = redis::cmd("SETNX")
        .arg(&idempotency_key)
        .query_async(&mut *conn)
        .await
        .map_err(|e| AppError::Cache(e.to_string()))?;

    if !acquired {
        let cached: Option<String> = redis::cmd("GET")
            .arg(format!("{}:result", idempotency_key))
            .query_async(&mut *conn)
            .await
            .map_err(|e| AppError::Cache(e.to_string()))?;

        if let Some(result) = cached {
            let parsed: serde_json::Value = serde_json::from_str(&result)
                .unwrap_or_else(|_| serde_json::json!({"success": true}));
            return Ok(ok(parsed));
        }
    }

    let _: () = redis::cmd("EXPIRE")
        .arg(&idempotency_key)
        .arg(300i64)
        .query_async(&mut *conn)
        .await
        .map_err(|e| AppError::Cache(e.to_string()))?;

    if razorpay
        .verify_payment_signature(
            &req.razorpay_order_id,
            &req.razorpay_payment_id,
            &req.razorpay_signature,
        )
        .is_err()
    {
        let _: Result<i64, _> = redis::cmd("DEL")
            .arg(&idempotency_key)
            .query_async(&mut *conn)
            .await;
        return Err(AppError::Payment(PaymentError::Unauthorized));
    }

    let result = sqlx::query!(
        r#"UPDATE payments
           SET status = 'Success',
               razorpay_payment_id = $1,
               razorpay_signature = $2,
               captured = true,
               paid_at = NOW(),
               updated_at = NOW()
           WHERE razorpay_order_id = $3
             AND status IN ('Pending', 'pending')
             AND razorpay_payment_id IS NULL
           RETURNING payment_id, amount, phone, service_type, kiosk_id"#,
        req.razorpay_payment_id,
        req.razorpay_signature,
        req.razorpay_order_id
    )
    .fetch_optional(&state.db_pool)
    .await?;

    match result {
        Some(row) => {
            let payment_id = row.payment_id;
            let amount: Decimal = row.amount;
            let kiosk_id = row.kiosk_id.unwrap_or_default();
            let service_type = row.service_type.unwrap_or_default();

            sqlx::query!(
                "INSERT INTO payment_events (payment_id, event_type, event_data) VALUES ($1, 'captured', $2)",
                payment_id,
                serde_json::json!({
                    "razorpay_payment_id": req.razorpay_payment_id,
                    "verified": true,
                    "source": "utility_service"
                })
            )
            .execute(&state.db_pool)
            .await
            .ok();

            sqlx::query!(
                r#"INSERT INTO daily_revenue (revenue_date, kiosk_id, service_type, total_amount, transaction_count)
                   VALUES (CURRENT_DATE, $1, $2, $3, 1)
                   ON CONFLICT (revenue_date, kiosk_id, service_type)
                   DO UPDATE SET
                       total_amount = daily_revenue.total_amount + $3,
                       transaction_count = daily_revenue.transaction_count + 1,
                       updated_at = NOW()"#,
                kiosk_id,
                service_type,
                amount
            )
            .execute(&state.db_pool)
            .await
            .ok();

            let response = serde_json::json!({
                "success": true,
                "payment_id": payment_id,
                "amount": amount,
                "status": "Success",
                "receipt": format!("RCPT-{}", payment_id.to_string()[..8].to_uppercase())
            });

            let _: () = redis::cmd("SETEX")
                .arg(format!("{}:result", idempotency_key))
                .arg(86400i64)
                .arg(serde_json::to_string(&response).unwrap())
                .query_async(&mut *conn)
                .await
                .map_err(|e| AppError::Cache(e.to_string()))?;

            let _: Result<i64, _> = redis::cmd("DEL")
                .arg(&idempotency_key)
                .query_async(&mut *conn)
                .await;

            Ok(ok(response))
        }
        None => Err(AppError::NotFound(
            "Payment not found or already processed".to_string(),
        )),
    }
}
