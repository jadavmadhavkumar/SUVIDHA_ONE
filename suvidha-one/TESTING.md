# Testing Guide - SUVIDHA ONE Frontend

## 🚀 Quick Testing with OTP Skip

### Skip OTP Authentication

Since the backend Redis service may not be available, you can **skip OTP** to test other features:

#### Steps:

1. **Open the application**
   ```
   http://localhost:3000
   ```

2. **On the login screen, you'll see:**
   - Phone number input field
   - "Send OTP" button
   - **"Skip OTP (Test Mode) →"** link (NEW!)

3. **Click "Skip OTP (Test Mode)"**
   - You'll be logged in automatically
   - Uses mock credentials
   - No SMS required
   - No Redis needed

4. **Test all features:**
   - ✅ Dashboard
   - ✅ Bill Payments
   - ✅ Grievances
   - ✅ Documents
   - ✅ Settings
   - ✅ Dark Mode

---

## 📋 Features to Test

### 1. Dashboard
- View all services
- Search functionality
- Service cards
- Quick stats

### 2. Bill Payments
- Select department (Electricity, Water, Gas, Municipal)
- Enter consumer number
- Fetch bills (mock data if backend unavailable)
- Select and pay bills

### 3. Grievances
- File new grievance
- View existing grievances
- Track status
- Update grievances

### 4. Documents
- Apply for certificates
- View applications
- Track document status
- Download issued documents

### 5. Settings
- Toggle dark/light mode
- Language preferences
- Accessibility options

---

## 🧪 Testing Checklist

#### Authentication
- [ ] Skip OTP works
- [ ] Mock token is stored in localStorage
- [ ] Redirects to dashboard
- [ ] Logout works

#### Dashboard
- [ ] All service cards visible
- [ ] Search filters services
- [ ] Click on services navigates correctly
- [ ] Stats cards display

#### Bills
- [ ] Department selection works
- [ ] Consumer number input accepts values
- [ ] Fetch bills button clickable
- [ ] Bill selection works
- [ ] Payment initiation (mock)

#### Grievances
- [ ] Create grievance form works
- [ ] Submit grievance
- [ ] View list of grievances
- [ ] Expand grievance details

#### Documents
- [ ] Select document type
- [ ] Enter applicant name
- [ ] Submit application
- [ ] View document list

#### UI/UX
- [ ] Dark mode toggle works
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Icons display correctly
- [ ] No console errors
- [ ] Smooth animations

---

## 🔧 Developer Tools

### Check localStorage
```javascript
// Open browser console and run:
localStorage.getItem('access_token')
// Should show: "mock_jwt_token_xxxxx"

localStorage.getItem('user_mobile')
// Should show: "+919999999999"
```

### Clear Test Data
```javascript
// Clear all and restart
localStorage.clear()
location.reload()
```

### View Network Requests
```
DevTools > Network tab
- Filter by: Fetch/XHR
- Check API calls
- Verify request/response format
```

---

## 🐛 Known Limitations (Test Mode)

### What Works:
- ✅ UI navigation
- ✅ Form submissions
- ✅ State management
- ✅ Dark mode
- ✅ All screens

### What Needs Backend:
- ❌ Real OTP (requires Redis + SMS)
- ❌ Real bill fetch (requires backend DB)
- ❌ Real payment processing (requires Razorpay)
- ❌ Real document generation

### Mock Data:
When backend is unavailable, the app uses:
- Mock authentication token
- Mock service list (fallback)
- Empty states for data-dependent features

---

## 📊 Backend Health Check

To verify if backend services are available:

```bash
# Test health endpoint
curl https://suvidha-one.onrender.com/health

# Test OTP (if Redis is available)
curl -X POST https://suvidha-one.onrender.com/auth/otp/send \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210","kiosk_id":"KIOSK001"}'
```

**If backend is healthy:**
- OTP will work without skip
- Real data will be fetched
- Full functionality available

**If backend shows errors:**
- Use "Skip OTP" mode
- Test UI features
- Mock data will be used

---

## 🎯 Testing Workflow

### Option 1: Quick UI Testing (Recommended)
```
1. Click "Skip OTP"
2. Test all screens
3. Verify UI/UX
4. Check responsive design
5. Test dark mode
```

### Option 2: Full Integration Testing
```
1. Ensure backend Redis is running
2. Enter real phone number
3. Get OTP (from backend logs if SMS not configured)
4. Complete full auth flow
5. Test with real data
```

---

## 💡 Tips

1. **Use Skip Mode for:**
   - UI testing
   - Feature demos
   - Development when backend is down
   - Quick iteration

2. **Use Real OTP for:**
   - End-to-end testing
   - Production deployment
   - Integration testing
   - User acceptance testing

3. **Switch Between Modes:**
   - Clear localStorage to see login again
   - Or add `?login=true` to URL

---

## 📝 Reporting Issues

When reporting bugs, include:
- [ ] Test mode used (Skip OTP or Real OTP)
- [ ] Browser and version
- [ ] Console errors (screenshot)
- [ ] Network tab (failed requests)
- [ ] Steps to reproduce

---

**Happy Testing! 🎉**

For issues, check `TROUBLESHOOTING.md` or `API_STATUS.md`
