# SUVIDHA ONE - API Status

## Backend Health Check

### Current Status (Auto-detected)

```bash
# Test backend health
curl https://suvidha-one.onrender.com/health

# Expected response:
{"status":"healthy","service":"utility-service","version":"1.0.0"}
```

### Service Status

| Service | Port | Status | Endpoint |
|---------|------|--------|----------|
| Auth Service | 3001 | ⚠️ Redis Required | `/auth/health` |
| Payment Service | 3002 | ✅ Available | `/payments/health` |
| Utility Service | 3003 | ✅ Available | `/bills/health` |
| Grievance Service | 3004 | ⚠️ Redis Required | `/grievances/health` |
| Document Service | 3005 | ⚠️ Redis Required | `/documents/health` |
| Notification Service | 3006 | ⚠️ Redis Required | `/notifications/health` |
| Session Service | 3007 | ⚠️ Redis Required | `/sessions/health` |
| Kiosk Service | 3008 | ⚠️ Redis Required | `/kiosks/health` |

---

## Common Issues

### 1. "Cache service unavailable" (Error 9006)

**Cause:** Redis cache service is down or not connected

**Impact:**
- OTP sending/verification won't work
- Session management won't work
- Some services may be unavailable

**Fix (Backend on Render):**
1. Check Render dashboard for Redis service
2. Ensure Redis is connected to the backend
3. Restart the backend service

**Fix (Local Development):**
```bash
# Start Redis
docker run -d -p 6379:6379 redis:alpine

# Or start all backend services
cd suvidha-one-backend
docker-compose up -d
```

---

### 2. "Network error: Unable to connect to API server"

**Cause:** Backend is unreachable

**Solutions:**

#### A. Check Backend URL
```bash
# In .env.local, verify:
NEXT_PUBLIC_API_URL=https://suvidha-one.onrender.com

# Or for local:
NEXT_PUBLIC_API_URL=http://localhost:8080
```

#### B. Test Connectivity
```bash
# Test health endpoint
curl https://suvidha-one.onrender.com/health

# Should return: {"status":"healthy",...}
```

#### C. Check Render Service
1. Visit: https://dashboard.render.com
2. Check if service is "Live"
3. Check logs for errors
4. Restart if needed

---

### 3. OTP Not Working

**Requirements:**
- ✅ Backend running
- ✅ Redis connected
- ✅ SMS service configured (Twilio/MSG91)

**Test:**
```bash
# Send OTP
curl -X POST https://suvidha-one.onrender.com/auth/otp/send \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210","kiosk_id":"KIOSK001"}'

# Expected: {"data":{"message":"OTP sent successfully","expires_in":300},...}
```

**If SMS not configured:**
- OTP will be logged to backend console
- Check backend logs for OTP code
- Use that OTP for testing

---

## Development Mode (Local)

### Quick Start

```bash
# 1. Start Redis
docker run -d -p 6379:6379 redis:alpine

# 2. Start backend
cd suvidha-one-backend
docker-compose up -d

# 3. Update .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080

# 4. Start frontend
cd suvidha-one
npm run dev
```

### Test Everything

```bash
# Backend health
curl http://localhost:8080/health

# Auth service
curl http://localhost:8080/auth/health

# Frontend
curl http://localhost:3000
```

---

## Production Deployment (Render)

### Environment Variables Required

```env
# Backend (Render)
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your_secret_here
SMS_SERVICE_ID=your_sms_id
SMS_API_KEY=your_sms_key
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://suvidha-one.onrender.com
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

---

## Monitoring

### Backend Logs (Render)
```bash
# View in Render Dashboard
https://dashboard.render.com -> Select Service -> Logs
```

### Frontend Logs (Browser)
```javascript
// Open DevTools Console
// API requests are logged automatically
```

### Health Check Script
```bash
#!/bin/bash
echo "Checking SUVIDHA ONE services..."
echo ""
echo "Backend Health:"
curl -s https://suvidha-one.onrender.com/health | jq .
echo ""
echo "Auth Service:"
curl -s https://suvidha-one.onrender.com/auth/health | jq .
```

---

## Contact Support

For issues:
1. Check this status page
2. Review TROUBLESHOOTING.md
3. Check backend logs
4. Verify environment variables

---

**Last Updated:** $(date)
**Backend:** https://suvidha-one.onrender.com
**Frontend:** http://localhost:3000
