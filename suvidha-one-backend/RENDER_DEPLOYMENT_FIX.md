# 🚀 SUVIDHA ONE - Render Deployment Fix Guide

**Date:** March 2026  
**Status:** Fix Redis 503, Payment 404, JWT failures

---

## 📋 Pre-flight Checklist

| Component | Current State | Required Action |
|-----------|---------------|-----------------|
| Redis | ❌ Not configured | Deploy managed Redis |
| PostgreSQL | ❓ Check connection | Verify DATABASE_URL |
| JWT Keys | ❌ Missing PEM keys | Generate & set RS256 keys |
| OTP Secret | ⚠️ Using default | Set secure HMAC secret |
| Payment Service | ❌ 404 errors | Deploy with Razorpay vars |
| Utility Service | ✅ Partially working | Fix Redis connection |

---

## Step 1: Deploy Managed Redis on Render

### 1.1 Create Redis Instance

1. Go to **Render Dashboard** → **New** → **Redis**
2. Configure:
   ```
   Name: suvidha-redis
   Region: Oregon (US West) - same as your services
   Plan: Free (25MB) or Starter ($7/mo for 100MB)
   ```
3. Click **Create Redis**
4. Wait for deployment (~1-2 minutes)

### 1.2 Copy Internal Connection URL

After deployment, go to Redis dashboard:
- **Internal URL**: `redis://red-xxxxx:6379` (use this!)
- **External URL**: `rediss://red-xxxxx:6379` (for local testing only)

> ⚠️ **Important**: Use the **Internal URL** for services on Render (no TLS overhead, faster)

---

## Step 2: Generate JWT RS256 Keys

### 2.1 Generate Keys Locally

```bash
# Generate 2048-bit RSA private key
openssl genrsa -out private.pem 2048

# Extract public key
openssl rsa -in private.pem -pubout -out public.pem

# Convert to single-line format for Render
echo "Private key (single line):"
cat private.pem | tr '\n' '\\' | sed 's/\\/\\n/g'

echo ""
echo "Public key (single line):"
cat public.pem | tr '\n' '\\' | sed 's/\\/\\n/g'
```

### 2.2 Example Output Format

```
-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----\n
```

> Render will interpret `\n` as newlines when the service reads them.

---

## Step 3: Set Environment Variables on Render

### 3.1 Utility Service Environment Variables

Go to **utility-service** → **Environment** → Add these:

| Variable | Value | Sync |
|----------|-------|------|
| `REDIS_URL` | `redis://red-xxxxx:6379` | No |
| `DATABASE_URL` | `postgresql://user:pass@host/db` | No |
| `JWT_PRIVATE_KEY_PEM` | (your private key single-line) | No |
| `JWT_PUBLIC_KEY_PEM` | (your public key single-line) | No |
| `OTP_HMAC_SECRET` | (32-char random string) | No |
| `BHASHINI_USER_ID` | `4be40b6fb09f4f3180cc2d3a46dd5587` | No |
| `BHASHINI_API_KEY` | `07428236a4-068b-40dd-9829-bf5e21df9a73` | No |
| `BHASHINI_PIPELINE_ID` | `64392f96daac500b55c543cd` | No |
| `RUST_LOG` | `info,tower_http=debug` | Yes |
| `PORT` | `3003` | Yes |

Generate OTP_HMAC_SECRET:
```bash
openssl rand -base64 32
```

### 3.2 Payment Service Environment Variables

Go to **payment-service** → **Environment** → Add these:

| Variable | Value | Sync |
|----------|-------|------|
| `REDIS_URL` | `redis://red-xxxxx:6379` | No |
| `DATABASE_URL` | (same as utility-service) | No |
| `JWT_PRIVATE_KEY_PEM` | (same keys as utility-service) | No |
| `JWT_PUBLIC_KEY_PEM` | (same keys) | No |
| `JWT_SECRET` | (fallback HMAC key, 32 chars) | No |
| `RAZORPAY_KEY_ID` | `rzp_live_xxxxx` or `rzp_test_xxxxx` | No |
| `RAZORPAY_KEY_SECRET` | (from Razorpay dashboard) | No |
| `RAZORPAY_WEBHOOK_SECRET` | (from Razorpay webhooks) | No |
| `RAZORPAY_BASE_URL` | `https://api.razorpay.com/v1` | Yes |
| `RUST_LOG` | `info,tower_http=debug` | Yes |
| `PORT` | `3002` | Yes |

### 3.3 Auth Service Environment Variables

| Variable | Value | Sync |
|----------|-------|------|
| `REDIS_URL` | `redis://red-xxxxx:6379` | No |
| `DATABASE_URL` | (same) | No |
| `JWT_PRIVATE_KEY_PEM` | (same keys) | No |
| `JWT_PUBLIC_KEY_PEM` | (same keys) | No |
| `OTP_HMAC_SECRET` | (same as utility-service) | No |
| `FAST2SMS_API_KEY` | (your Fast2SMS key) | No |
| `PORT` | `3001` | Yes |

---

## Step 4: Code Fixes Required

### 4.1 Fix PEM Newline Handling in Auth Service

**File:** `auth-service/src/main.rs`

Add this function after imports:

```rust
/// Fix PEM keys with escaped newlines from Render environment
fn fix_pem_newlines(pem: &str) -> String {
    pem.replace("\\n", "\n").replace("\\r", "")
}
```

Update the JWT initialization:

```rust
// Before
let private_key_pem = std::env::var("JWT_PRIVATE_KEY_PEM")
    .unwrap_or_else(|_| include_str!("../../keys/private.pem").to_string());
let public_key_pem = std::env::var("JWT_PUBLIC_KEY_PEM")
    .unwrap_or_else(|_| include_str!("../../keys/public.pem").to_string());

// After
let private_key_pem = std::env::var("JWT_PRIVATE_KEY_PEM")
    .map(|k| fix_pem_newlines(&k))
    .unwrap_or_else(|_| include_str!("../../keys/private.pem").to_string());
let public_key_pem = std::env::var("JWT_PUBLIC_KEY_PEM")
    .map(|k| fix_pem_newlines(&k))
    .unwrap_or_else(|_| include_str!("../../keys/public.pem").to_string());
```

### 4.2 Fix OTP HMAC Secret Default

**File:** `auth-service/src/handlers/otp.rs`

```rust
// Before (INSECURE)
let hmac_secret = std::env::var("OTP_HMAC_SECRET")
    .unwrap_or_else(|_| "default-secret".to_string());

// After (fail-fast in production)
let hmac_secret = std::env::var("OTP_HMAC_SECRET")
    .expect("OTP_HMAC_SECRET must be set in production");
```

### 4.3 Add Redis Connection Retry Logic

**File:** `shared/src/redis.rs` (create if not exists)

```rust
use deadpool_redis::{Config, Pool, Runtime};
use std::time::Duration;
use tokio::time::sleep;
use tracing::{info, warn, error};

pub async fn create_redis_pool_with_retry(max_retries: u32) -> Result<Pool, String> {
    let redis_url = std::env::var("REDIS_URL")
        .unwrap_or_else(|_| "redis://localhost:6379".to_string());
    
    info!("Connecting to Redis at: {}", redis_url.split('@').last().unwrap_or(&redis_url));
    
    let cfg = Config::from_url(&redis_url);
    
    for attempt in 1..=max_retries {
        match cfg.create_pool(Some(Runtime::Tokio1)) {
            Ok(pool) => {
                // Test connection
                match pool.get().await {
                    Ok(mut conn) => {
                        let _: Result<String, _> = redis::cmd("PING")
                            .query_async(&mut *conn)
                            .await;
                        info!("✓ Redis connected successfully");
                        return Ok(pool);
                    }
                    Err(e) => {
                        warn!("Redis connection test failed (attempt {}/{}): {}", 
                              attempt, max_retries, e);
                    }
                }
            }
            Err(e) => {
                warn!("Redis pool creation failed (attempt {}/{}): {}", 
                      attempt, max_retries, e);
            }
        }
        
        if attempt < max_retries {
            let backoff = Duration::from_secs(2_u64.pow(attempt));
            info!("Retrying in {:?}...", backoff);
            sleep(backoff).await;
        }
    }
    
    error!("Failed to connect to Redis after {} attempts", max_retries);
    Err(format!("Redis connection failed after {} retries", max_retries))
}
```

### 4.4 Graceful Degradation for Payment Service

**File:** `payment-service/src/main.rs`

Update RazorpayService initialization:

```rust
// Create RazorpayService with graceful fallback
let razorpay = match (
    std::env::var("RAZORPAY_KEY_ID").ok(),
    std::env::var("RAZORPAY_KEY_SECRET").ok(),
) {
    (Some(key_id), Some(key_secret)) => {
        info!("✓ Razorpay configured with key: {}...", &key_id[..12.min(key_id.len())]);
        Some(RazorpayService::new(
            key_id,
            key_secret,
            std::env::var("RAZORPAY_WEBHOOK_SECRET").ok(),
        ))
    }
    _ => {
        warn!("⚠ Razorpay not configured - payment endpoints will return 503");
        None
    }
};

// In AppState
pub struct AppState {
    pub db: PgPool,
    pub redis_pool: Pool,
    pub jwt: Arc<JwtService>,
    pub razorpay: Option<RazorpayService>,  // Optional!
}
```

---

## Step 5: Update render.yaml Blueprint

**File:** `render.yaml`

```yaml
services:
  # ─────────────────────────────────────────────────────────────
  # Utility Service (Main API)
  # ─────────────────────────────────────────────────────────────
  - type: web
    name: suvidha-one-utility-service
    runtime: rust
    plan: free
    region: oregon
    buildCommand: |
      pip install edge-tts
      SQLX_OFFLINE=true cargo build --release --bin utility-service
    startCommand: ./target/release/utility-service
    healthCheckPath: /health
    envVars:
      - key: PORT
        value: "3003"
      - key: RUST_LOG
        value: info,tower_http=debug
      - key: SQLX_OFFLINE
        value: "true"
      - key: RENDER
        value: "true"
      # Secrets (set manually in dashboard)
      - key: DATABASE_URL
        sync: false
      - key: REDIS_URL
        sync: false
      - key: JWT_PRIVATE_KEY_PEM
        sync: false
      - key: JWT_PUBLIC_KEY_PEM
        sync: false
      - key: OTP_HMAC_SECRET
        sync: false
      - key: BHASHINI_USER_ID
        sync: false
      - key: BHASHINI_API_KEY
        sync: false
      - key: BHASHINI_PIPELINE_ID
        value: "64392f96daac500b55c543cd"

  # ─────────────────────────────────────────────────────────────
  # Payment Service
  # ─────────────────────────────────────────────────────────────
  - type: web
    name: suvidha-one-payment-service
    runtime: rust
    plan: free
    region: oregon
    buildCommand: SQLX_OFFLINE=true cargo build --release --bin payment-service
    startCommand: ./target/release/payment-service
    healthCheckPath: /health
    envVars:
      - key: PORT
        value: "3002"
      - key: RUST_LOG
        value: info,tower_http=debug
      - key: SQLX_OFFLINE
        value: "true"
      - key: RAZORPAY_BASE_URL
        value: "https://api.razorpay.com/v1"
      # Secrets
      - key: DATABASE_URL
        sync: false
      - key: REDIS_URL
        sync: false
      - key: JWT_PRIVATE_KEY_PEM
        sync: false
      - key: JWT_PUBLIC_KEY_PEM
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: RAZORPAY_KEY_ID
        sync: false
      - key: RAZORPAY_KEY_SECRET
        sync: false
      - key: RAZORPAY_WEBHOOK_SECRET
        sync: false

  # ─────────────────────────────────────────────────────────────
  # Auth Service
  # ─────────────────────────────────────────────────────────────
  - type: web
    name: suvidha-one-auth-service
    runtime: rust
    plan: free
    region: oregon
    buildCommand: SQLX_OFFLINE=true cargo build --release --bin auth-service
    startCommand: ./target/release/auth-service
    healthCheckPath: /health
    envVars:
      - key: PORT
        value: "3001"
      - key: RUST_LOG
        value: info,tower_http=debug
      - key: SQLX_OFFLINE
        value: "true"
      # Secrets
      - key: DATABASE_URL
        sync: false
      - key: REDIS_URL
        sync: false
      - key: JWT_PRIVATE_KEY_PEM
        sync: false
      - key: JWT_PUBLIC_KEY_PEM
        sync: false
      - key: OTP_HMAC_SECRET
        sync: false
      - key: FAST2SMS_API_KEY
        sync: false

# ─────────────────────────────────────────────────────────────
# Databases (must be created separately on Render dashboard)
# ─────────────────────────────────────────────────────────────
databases:
  - name: suvidha-postgres
    plan: free  # 256MB, 1GB storage
    region: oregon
    postgresMajorVersion: 16
```

---

## Step 6: Test Commands

### 6.1 Health Checks

```bash
# Base URLs
UTILITY_URL="https://suvidha-one-utility-service.onrender.com"
PAYMENT_URL="https://suvidha-one-payment-service.onrender.com"
AUTH_URL="https://suvidha-one-auth-service.onrender.com"

# Health checks
curl -s "$UTILITY_URL/health" | jq
curl -s "$PAYMENT_URL/health" | jq
curl -s "$AUTH_URL/health" | jq
```

### 6.2 Test OTP Flow

```bash
# 1. Request OTP
curl -X POST "$AUTH_URL/auth/otp/send" \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210"}' | jq

# 2. Verify OTP (use code from SMS or logs in test mode)
curl -X POST "$AUTH_URL/auth/otp/verify" \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210", "otp": "123456"}' | jq
```

### 6.3 Test Payment Flow

```bash
# 1. Create payment order
curl -X POST "$PAYMENT_URL/payment/create" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9876543210",
    "amount": 10000,
    "service_type": "electricity_bill",
    "kiosk_id": "KIOSK_001"
  }' | jq

# Response should include:
# - order_id: "order_xxxxx"
# - razorpay_key_id: "rzp_xxxxx"
# - amount: 10000
# - currency: "INR"
```

### 6.4 Test Voice/Bhashini

```bash
# Get supported languages
curl -s "$UTILITY_URL/api/tts/languages" | jq

# Test TTS (if endpoint exists)
curl -X POST "$UTILITY_URL/api/voice/tts" \
  -H "Content-Type: application/json" \
  -d '{"text": "नमस्ते", "lang": "hi"}' | jq
```

### 6.5 Check Render Logs

```bash
# Install Render CLI
curl -sSL https://render.com/install.sh | sh

# Login
render login

# Stream logs
render logs suvidha-one-utility-service --tail
render logs suvidha-one-payment-service --tail

# Or use dashboard: Services → Logs tab
```

---

## Step 7: Verify Redis Connection

### 7.1 Check Redis from Service Logs

After deploying with REDIS_URL set, logs should show:
```
INFO  utility_service > Connecting to Redis at: red-xxxxx:6379
INFO  utility_service > ✓ Redis connected successfully
```

### 7.2 Test Redis Manually (Local)

```bash
# If you have external Redis URL
redis-cli -u "rediss://red-xxxxx:6379" --tls PING
# Should return: PONG
```

---

## Step 8: Security & Production Best Practices

### 8.1 Secret Rotation Schedule

| Secret | Rotation Frequency | How to Rotate |
|--------|-------------------|---------------|
| JWT Keys | Every 90 days | Generate new pair, deploy, invalidate old tokens |
| OTP_HMAC_SECRET | Every 90 days | Update env, redeploy (existing OTPs invalidated) |
| RAZORPAY_KEY_SECRET | As needed | Regenerate in Razorpay dashboard |
| DATABASE_URL password | Every 180 days | Update in Render PostgreSQL settings |

### 8.2 Redis Security (if using external Redis)

```bash
# For Render managed Redis, ACLs are handled automatically
# For self-managed Redis, configure:
# 1. Bind to internal network only
# 2. Set requirepass
# 3. Disable dangerous commands:
redis-cli CONFIG SET rename-command FLUSHALL ""
redis-cli CONFIG SET rename-command DEBUG ""
```

### 8.3 Rate Limiting Already Implemented

| Endpoint | Limit | Window |
|----------|-------|--------|
| OTP Send | 3 requests | 1 hour |
| OTP Verify | 3 attempts | Per OTP |
| Payment Create | 10 requests | 1 hour per phone |

### 8.4 TLS/HTTPS

- ✅ Render provides automatic TLS for all services
- ✅ Internal Redis uses `redis://` (no TLS needed internally)
- ✅ External Redis uses `rediss://` (TLS required)

---

## Step 9: Deployment Order

Execute in this order to minimize downtime:

1. **Deploy Redis** (5 min)
2. **Set environment variables** on all services (don't redeploy yet)
3. **Push code fixes** (PEM newline fix, OTP secret check)
4. **Trigger manual deploy** on each service:
   - utility-service first (main API)
   - auth-service second (OTP endpoints)
   - payment-service last (depends on working auth)
5. **Run health checks** after each service is live
6. **Test OTP flow** end-to-end
7. **Test payment flow** with test Razorpay keys

---

## Step 10: Rollback Plan

If deployment fails:

```bash
# 1. Check which deploy broke things
render deploys suvidha-one-utility-service

# 2. Rollback to previous deploy
render rollback suvidha-one-utility-service --deploy <previous-deploy-id>

# 3. Or via dashboard:
# Services → Deploys → Click "Rollback" on working deploy
```

---

## 🎉 Success Criteria

After completing all steps, verify:

- [ ] `curl /health` returns 200 on all 3 services
- [ ] `curl /auth/otp/send` returns 200 (not 503)
- [ ] `curl /payment/create` returns order_id (not 404)
- [ ] Logs show "Redis connected successfully"
- [ ] No JWT/PEM errors in logs
- [ ] OTP SMS delivered (or logged in test mode)

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `503 Service Unavailable` | Redis/DB not connected | Check REDIS_URL, DATABASE_URL env vars |
| `invalid PEM` in logs | Newlines not escaped | Use `\n` format in Render env vars |
| `JWT validation failed` | Keys mismatch | Ensure same keys on all services |
| `OTP verification failed` | HMAC secret mismatch | Same OTP_HMAC_SECRET everywhere |
| `Razorpay error 401` | Invalid credentials | Verify RAZORPAY_KEY_ID/SECRET |
| Build timeout | Free tier limits | Upgrade to paid or optimize build |

---

## Quick Reference: Environment Variables

```bash
# Copy-paste template for Render dashboard

# Required for all services
DATABASE_URL=postgresql://user:pass@host:5432/suvidha
REDIS_URL=redis://red-xxxxx:6379

# JWT (same on all services)
JWT_PRIVATE_KEY_PEM=-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----\n
JWT_PUBLIC_KEY_PEM=-----BEGIN PUBLIC KEY-----\nMIIB...\n-----END PUBLIC KEY-----\n

# Auth service specific
OTP_HMAC_SECRET=<32-char-random-string>
FAST2SMS_API_KEY=<your-fast2sms-key>

# Payment service specific
JWT_SECRET=<32-char-fallback-hmac-key>
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=<from-razorpay-dashboard>
RAZORPAY_WEBHOOK_SECRET=<from-razorpay-webhooks>

# Utility service specific  
BHASHINI_USER_ID=4be40b6fb09f4f3180cc2d3a46dd5587
BHASHINI_API_KEY=07428236a4-068b-40dd-9829-bf5e21df9a73
BHASHINI_PIPELINE_ID=64392f96daac500b55c543cd
```

---

*Generated: March 2026 | SUVIDHA ONE v1.0*
