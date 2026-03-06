# SUVIDHA ONE - Wireframe & Design Specification

> Complete UI/UX wireframe guide for Figma implementation
> Based on PRD, Typography Spec, and System Architecture

---

## 1. Screen Overview

### 1.1 Complete Screen List

| # | Screen | Purpose | Priority |
|---|--------|---------|----------|
| 1 | Welcome Screen | Initial kiosk display | P0 |
| 2 | Language Selection | Choose preferred language | P0 |
| 3 | Authentication | OTP/Aadhaar/QR login | P0 |
| 4 | Dashboard | Main service grid | P0 |
| 5 | Service Category | Sub-services menu | P0 |
| 6 | Bill Payment | View & pay bills | P0 |
| 7 | Payment Mode | Select payment method | P0 |
| 8 | Payment Processing | Loading state | P0 |
| 9 | Payment Success | Confirmation | P0 |
| 10 | Receipt Options | Print/SMS/WhatsApp | P0 |
| 11 | Grievance Filing | File complaint | P1 |
| 12 | Grievance Tracking | View status | P1 |
| 13 | Certificate Apply | Apply for certificate | P1 |
| 14 | Certificate Status | Track application | P1 |
| 15 | Utility Status | Check connection | P2 |
| 16 | Settings | Accessibility options | P1 |
| 17 | Help/Assistance | Guided help | P2 |
| 18 | Error Screen | Error states | P0 |
| 19 | Timeout Screen | Session timeout | P0 |
| 20 | Logout Confirmation | End session | P1 |

---

## 2. Wireframe Specifications

---

### 2.1 Welcome Screen (SCREEN-01)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                                                                                 │
│                         🇮🇳  SUVIDHA ONE  🇮🇳                                 │
│                                                                                 │
│                    "One Kiosk, All Services"                                   │
│                    "सुविधा सबके लिए"                                           │
│                                                                                 │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────┐    │
│    │                                                                      │    │
│    │                  [TOUCH TO START]                                   │    │
│    │                                                                      │    │
│    │                    👆 Tap anywhere                                   │    │
│    │                                                                      │    │
│    └─────────────────────────────────────────────────────────────────────┘    │
│                                                                                 │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│  Digital India  |  Smart City Mission  |  Ek Bharat Shreshtha Bharat           │
│                                                                                 │
│  ┌──────────┐                                              ┌────────────────┐  │
│  │ 🌐 EN    │                                              │ 🔊 Voice On   │  │
│  └──────────┘                                              └────────────────┘  │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background**: #FFFFFF (White)
- **Primary Logo**: Digital India logo + SUVIDHA ONE text
- **Tagline**: Noto Sans 700, 48px, #1A3C8F (Blue)
- **Hindi Tagline**: Noto Sans Devanagari 700, 48px, #666666
- **Touch Prompt**: Noto Sans 500, 36px, #1A3C8F with subtle pulse animation
- **Footer**: Noto Sans 400, 24px, #666666
- **Language Toggle**: Top-left, 80x80px icon button
- **Voice Toggle**: Top-right, 80x80px icon button
- **Animation**: Subtle fade-in, 1.5s duration

---

### 2.2 Language Selection Screen (SCREEN-02)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│   ← Back                                          Language / भाषा             │
│                                                                                 │
│                                                                                 │
│                         Select Your Language                                    │
│                         अपनी भाषा चुनें                                       │
│                                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │   🇮🇳    │  │   🇬🇧    │  │   🇮🇳    │  │   🇮🇳    │                      │
│  │          │  │          │  │          │  │          │                      │
│  │  हिंदी   │  │ English  │  │  தமிழ்   │  │  বাংলা   │                      │
│  │  Hindi   │  │          │  │  Tamil   │  │ Bengali  │                      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘                      │
│                                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │   🇮🇳    │  │   🇮🇳    │  │   🇮🇳    │  │   🇮🇳    │                      │
│  │          │  │          │  │          │  │          │                      │
│  │  मराठी   │  │  ગુજરાતી  │  │  ಕನ್ನಡ   │  │  മലയാളം  │                      │
│  │ Marathi  │  │ Gujarati  │  │ Kannada  │  │Malayalam │                      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘                      │
│                                                                                 │
│                                                                                 │
│                    [HINDI हिंदी]  ← Default                                     │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Layout**: 4x2 grid of language cards
- **Card Size**: 280x200px minimum
- **Icon**: Flag emoji, 80px
- **Language Name (Native)**: Noto Sans 700, 40px, #333333
- **Language Name (English)**: Noto Sans 400, 28px, #666666
- **Selected State**: Border 4px #FF6600 (Saffron), subtle glow
- **Default Indicator**: Green checkmark badge
- **Tap Feedback**: Scale 0.95 on touch, haptic

---

### 2.3 Authentication Screen (SCREEN-03)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│   ← Back                                                      👤 Guest         │
│                                                                                 │
│                                                                                 │
│                         Authenticate / पहचान                                    │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐       │
│  │                                                                      │       │
│  │                  How would you like to verify?                     │       │
│  │                  आप कैसे सत्यापित करना चाहेंगे?                     │       │
│  │                                                                      │       │
│  └─────────────────────────────────────────────────────────────────────┘       │
│                                                                                 │
│    ┌────────────────────────────────────────────────────────────────┐          │
│    │  📱                                                            │          │
│    │                                                                 │          │
│    │        Mobile OTP                                              │          │
│    │        मोबाइल ओटीपी                                           │          │
│    │                                                                 │          │
│    └────────────────────────────────────────────────────────────────┘          │
│                                                                                 │
│    ┌────────────────────────────────────────────────────────────────┐          │
│  🖐️│                                                                 │          │
│    │        Aadhaar Biometric                                       │          │
│    │        आधार बायोमेट्रिक                                         │          │
│    │                                                                 │          │
│    └────────────────────────────────────────────────────────────────┘          │
│                                                                                 │
│    ┌────────────────────────────────────────────────────────────────┐          │
│    │  📷                                                            │          │
│    │                                                                 │          │
│    │        Scan QR Code                                             │          │
│    │        क्यूआर कोड स्कैन करें                                    │          │
│    │                                                                 │          │
│    └────────────────────────────────────────────────────────────────┘          │
│                                                                                 │
│    ┌────────────────────────────────────────────────────────────────┐          │
│    │  👤                                                            │          │
│    │                                                                 │          │
│    │        Continue as Guest                                        │          │
│    │        अतिथि के रूप में जारी रखें                               │          │
│    │                                                                 │          │
│    └────────────────────────────────────────────────────────────────┘          │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Auth Options**: 4 large cards in vertical list
- **Card Size**: Full width - 80px margins, 180px height
- **Icon Size**: 80px, left-aligned, 60px from left edge
- **Title**: Noto Sans 600, 36px, #333333
- **Subtitle**: Noto Sans 400, 28px, #666666
- **Background Colors**: Alternating #F5F5F5 / #FFFFFF
- **Guest Mode**: Last option, muted styling

---

### 2.3.1 OTP Input Screen

```
┌────────────────────────────────────────────────────────────────────────────────┐
│   ← Back                                                      [Skip →]        │
│                                                                                 │
│                                                                                 │
│                         📱 Mobile Verification                                  │
│                                                                                 │
│                    Enter your mobile number                                    │
│                    अपना मोबाइल नंबर दर्ज करें                                 │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────┐    │
│    │                                                                      │    │
│    │      +91  │  9  │  8  │  7  │  6  │  5  │  4  │  3  │  2  │  1  │    │
│    │           │      │      │      │      │      │      │      │      │    │
│    │           │   0  │      │      │      │      │      │      │      │    │
│    │                                                                      │    │
│    └─────────────────────────────────────────────────────────────────────┘    │
│                                                                                 │
│                              [SEND OTP]                                        │
│                                                                                 │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────┐    │
│    │  Enter 6-digit OTP sent to +91 ******76                           │    │
│    │                                                                      │    │
│    │    [ 1 ]  [ 2 ]  [ 3 ]    │  [ 4 ]  [ 5 ]  [ 6 ]                  │    │
│    │                                                                      │    │
│    │               Didn't receive? [Resend OTP] (58s)                   │    │
│    └─────────────────────────────────────────────────────────────────────┘    │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Number Input**: Custom numeric keypad, 100px buttons
- **OTP Boxes**: 6 individual boxes, 80x80px each
- **Spacing**: 16px between boxes
- **Auto-focus**: Move to next box on input
- **Timer**: Countdown 60s, show resend after expiry

---

### 2.4 Dashboard Screen (SCREEN-04)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │  👋 Welcome, राम सिंह                                    [👤 Profile]   │  │
│  │     Pending Bills: 2  |  Due: ₹2,450                                   │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐               │
│  │       ⚡        │  │       💧        │  │       🔥        │               │
│  │                 │  │                 │  │                 │               │
│  │  बिजली         │  │  पानी          │  │  गैस           │               │
│  │  Electricity    │  │  Water Supply   │  │  Gas / LPG     │               │
│  │                 │  │                 │  │                 │               │
│  │  ₹1,200 Due    │  │  ₹450 Due      │  │  ₹800 Due      │               │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘               │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐               │
│  │       🏛️        │  │       📄        │  │       💳        │               │
│  │                 │  │                 │  │                 │               │
│  │  नगरपालिका     │  │  प्रमाण पत्र    │  │  बिल भुगतान    │               │
│  │  Municipal     │  │  Certificates  │  │  Bill Payment  │               │
│  │  Services      │  │                 │  │                 │               │
│  │                 │  │                 │  │                 │               │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘               │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐                                   │
│  │       📢        │  │       ℹ️        │                                   │
│  │                 │  │                 │                                   │
│  │  शिकायत /      │  │  अधिक जानकारी  │                                   │
│  │  Grievance     │  │  More Services  │                                   │
│  │                 │  │                 │                                   │
│  └─────────────────┘  └─────────────────┘                                   │
│                                                                                 │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│  [🏠 Home]     [📄 History]     [📞 Help]      [⚙️ Settings]                │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Header**: User greeting + pending bills summary
- **Service Grid**: 3 columns, scrollable rows
- **Tile Size**: Equal width, 280px height minimum
- **Icon**: 120px, centered, colored background circle
- **Service Name (Hindi)**: Noto Sans Devanagari 600, 32px
- **Service Name (English)**: Noto Sans 400, 24px, #666666
- **Badge**: Due amount in red if pending, green if paid
- **Bottom Nav**: 4 icons, 100px width each, 80px height

---

### 2.5 Bill Payment Screen (SCREEN-05)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│   ← Back                                        🛒 Cart (3)    [Pay All]     │
│                                                                                 │
│                    Electricity Bill / बिजली बिल                               │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │  ☐  │  Tata Power                                    ₹1,200.00      │      │
│  │     │  Consumer: 1234567890                          Due: 15 Mar   │      │
│  │     │  Period: Feb 2026                                             │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │  ☐  │  BSES Yamuna                                  ₹850.00        │      │
│  │     │  Consumer: 9876543210                          Due: 20 Mar   │      │
│  │     │  Period: Jan-Feb 2026                                          │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│                                                                                 │
│  Summary / सारांश                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │  Selected Bills: 2                                                  │      │
│  │  Total Amount: ₹2,050.00                                          │      │
│  │                                                                      │      │
│  │                    [SELECT ALL]     [PROCEED TO PAY]               │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│  [🏠 Home]     [📄 History]     [📞 Help]      [⚙️ Settings]                │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Bill Cards**: Checkbox + provider info + amount
- **Checkbox**: 60x60px touch target
- **Provider Name**: Noto Sans 600, 32px
- **Consumer Number**: Noto Sans 400, 24px, #666666
- **Amount**: Noto Sans 700, 36px, aligned right
- **Due Date**: Red if overdue, orange if due soon
- **Cart Button**: Shows count badge
- **Proceed Button**: Full width, 100px height, #FF6600 background

---

### 2.6 Payment Mode Selection (SCREEN-06)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│   ← Back                                                                      │
│                                                                                 │
│                    Select Payment Method                                       │
│                    भुगतान का तरीका चुनें                                      │
│                                                                                 │
│                    Total: ₹2,050.00                                           │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │   📱                                                                 │      │
│  │                                                                      │      │
│  │   UPI / QR Code                                                     │      │
│  │   यूपीआई / क्यूआर कोड                                              │      │
│  │   Scan & Pay instantly                                               │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │   💳                                                                 │      │
│  │                                                                      │      │
│  │   Debit / Credit Card                                               │      │
│  │   डेबिट / क्रेडिट कार्ड                                             │      │
│  │   Visa, Mastercard, RuPay                                           │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │   🏦                                                                │      │
│  │                                                                      │      │
│  │   Net Banking                                                       │      │
│  │   नेट बैंकिंग                                                       │      │
│  │   All major banks supported                                         │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │   💵                                                                │      │
│  │                                                                      │      │
│  │   Cash                                                              │      │
│  │   नकद                                                               │      │
│  │   Pay at counter                                                    │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Payment Options**: 4 large cards, 2x2 grid
- **Card Size**: ~350px x 200px
- **Icon**: 80px, centered
- **Title**: Noto Sans 600, 32px
- **Subtitle**: Noto Sans 400, 24px, #666666
- **Supported Methods**: Smaller text below

---

### 2.7 Payment Processing (SCREEN-07)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                                                                                 │
│                                                                                 │
│                         ⏳                                                    │
│                                                                                 │
│                    Processing Payment...                                       │
│                    भुगतान प्रोसेस हो रहा है...                                │
│                                                                                 │
│                                                                                 │
│                    ₹2,050.00                                                  │
│                                                                                 │
│                                                                                 │
│              Please wait while we process your payment                         │
│              कृपया प्रतीक्षा करें                                             │
│                                                                                 │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│                                                                                 │
│  [Cancel Payment]                                                             │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Spinner**: 120px animated icon
- **Title**: Noto Sans 600, 36px
- **Amount**: Noto Sans 700, 48px, #1A3C8F
- **Message**: Noto Sans 400, 28px, #666666
- **Cancel**: Text button, 28px

---

### 2.8 Payment Success (SCREEN-08)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                                                                                 │
│                                                                                 │
│                         ✅                                                    │
│                                                                                 │
│                    Payment Successful!                                          │
│                    भुगतान सफल!                                               │
│                                                                                 │
│                                                                                 │
│                    ₹2,050.00                                                  │
│                    Transaction ID: TXN9876543210                               │
│                    Ref: Tata Power - 1234567890                                │
│                                                                                 │
│                    Feb 27, 2026 | 10:30 AM                                    │
│                                                                                 │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │   🖨️ Print Receipt    📱 Send SMS    📱 Send WhatsApp              │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│                                                                                 │
│                    [DONE - Return Home]                                       │
│                                                                                 │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Success Icon**: 150px, #217346 (Green)
- **Title**: Noto Sans 700, 42px, #217346
- **Amount**: Noto Sans 700, 56px, #1A3C8F
- **Transaction ID**: Noto Sans 400, 24px, #666666
- **Date/Time**: Noto Sans 400, 24px, #666666
- **Action Buttons**: 3 icons in a row, 100px each
- **Done Button**: Full width, #FF6600 background

---

### 2.9 Grievance Filing (SCREEN-09)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│   ← Back                                        📋 My Complaints (2)          │
│                                                                                 │
│                    File a Complaint / शिकायत दर्ज करें                        │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │  ⚡  Electricity        💧  Water           🔥  Gas                │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │  🏛️  Municipal          📄  Other                                     │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│                                                                                 │
│  Select Category above, then describe your issue                              │
│  ऊपर श्रेणी चुनें, फिर अपनी समस्या का वर्णन करें                             │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │  Subject / विषय                                                      │      │
│  │  ┌────────────────────────────────────────────────────────────────┐ │    │
│  │  │                                                                │ │    │
│  │  └────────────────────────────────────────────────────────────────┘ │    │
│  │                                                                      │    │
│  │  Description / विवरण                                               │    │
│  │  ┌────────────────────────────────────────────────────────────────┐ │    │
│  │  │                                                                │ │    │
│  │  │                                                                │ │    │
│  │  │                                                                │ │    │
│  │  └────────────────────────────────────────────────────────────────┘ │    │
│  │                                                                      │    │
│  │  📷 Attach Photo/Video                                             │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│                              [SUBMIT COMPLAINT]                                │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Category Selection**: Horizontal scrollable chips or 4 large buttons
- **Input Fields**: Full width, 60px height for subject, 200px for description
- **Textarea**: Noto Sans 400, 28px
- **Attach Button**: Icon button, opens camera
- **Submit Button**: Full width, #FF6600

---

### 2.10 Settings / Accessibility (SCREEN-10)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│   ← Back                                        ⚙️ Settings / सेटिंग्स        │
│                                                                                 │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │  🔊 Voice Guidance                                                 │      │
│  │      [On / Off]                                                    │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │  🔤 Font Size / फ़ॉन्ट आकार                                         │      │
│  │                                                                      │      │
│  │      [A] ----[A+] ----[A++]                                        │      │
│  │       100%    130%    150%                                         │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │  ◐ High Contrast Mode                                              │      │
│  │      [Off]                                                         │      │
│  │      Black background, white text                                  │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │  🗣️ Language / भाषा                                                │      │
│  │      हिंदी (Hindi)  ▼                                               │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │  👤 Profile Settings                                                │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐      │
│  │                                                                      │      │
│  │  🚪 Logout / लॉगआउट                                               │      │
│  │                                                                      │      │
│  └─────────────────────────────────────────────────────────────────────┘      │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Settings List**: Vertical scrollable
- **Row Height**: 120px minimum
- **Toggle Switch**: 100px x 50px, #FF6600 when on
- **Font Size Options**: 3 large buttons with preview text
- **High Contrast Preview**: Show example
- **Logout**: Red text, confirmation dialog

---

## 3. Component Library

### 3.1 Buttons

| Type | Size | Background | Text Color | Border |
|------|------|------------|------------|--------|
| Primary CTA | 100% width, 100px h | #FF6600 | #FFFFFF | None |
| Secondary | 100% width, 100px h | Transparent | #1A3C8F | 2px #1A3C8F |
| Icon Button | 80x80px | #F5F5F5 | #333333 | None |
| Toggle On | 100x50px | #FF6600 | #FFFFFF | None |
| Toggle Off | 100x50px | #E0E0E0 | #666666 | None |

### 3.2 Input Fields

| Type | Height | Background | Border | Text Size |
|------|--------|------------|--------|-----------|
| Text Input | 80px | #FFFFFF | 2px #E0E0E0 | 32px |
| Textarea | 200px min | #FFFFFF | 2px #E0E0E0 | 28px |
| OTP Box | 80x80px | #FFFFFF | 2px #1A3C8F | None |
| Search | 70px | #F5F5F5 | None | 28px |

### 3.3 Cards

| Type | Background | Border Radius | Shadow | Padding |
|------|------------|---------------|--------|---------|
| Service Tile | #FFFFFF | 16px | 0 4px 12px rgba(0,0,0,0.1) | 24px |
| Bill Card | #FFFFFF | 12px | 0 2px 8px rgba(0,0,0,0.08) | 20px |
| Payment Option | #FFFFFF | 16px | 0 4px 12px rgba(0,0,0,0.1) | 32px |
| Alert Banner | #FFF3CD | 8px | None | 16px |

### 3.4 Icons (Material Symbols)

| Icon Name | Unicode | Size (Grid) | Color |
|-----------|---------|-------------|-------|
| Electricity | E9E1 | 150px | #FF6600 |
| Water | E5D3 | 150px | #1A6FBF |
| Gas | E80A | 150px | #E74C3C |
| Municipal | E5F1 | 150px | #217346 |
| Certificates | E873 | 150px | #5C2D91 |
| Bill Payment | E873 | 150px | #217346 |
| Grievance | E8F4 | 150px | #C0392B |
| Home | E88A | 40px | #1A3C8F |
| Back | E5C4 | 40px | #666666 |
| Settings | E8B8 | 40px | #666666 |
| Help | E887 | 40px | #666666 |

### 3.5 Color Palette Usage

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #1A3C8F | Headers, primary buttons, icons |
| Accent Saffron | #FF6600 | CTAs, highlights, badges |
| Success Green | #217346 | Success states, paid badges |
| Error Red | #C0392B | Errors, overdue, logout |
| Warning Orange | #F5A623 | Warnings, due soon |
| Background White | #FFFFFF | Main background |
| Background Light | #F5F5F5 | Alternating rows, cards |
| Text Primary | #333333 | Main text |
| Text Secondary | #666666 | Subtitles, hints |
| Border | #E0E0E0 | Input borders, dividers |

---

## 4. Responsive Breakpoints

### 4.1 Kiosk Screen Sizes

| Screen Size | Columns | Grid Layout | Icon Size |
|-------------|---------|-------------|-----------|
| 32" (1366x768) | 3 | 3x2 visible | 120px |
| 43" (1920x1080) | 4 | 4x2 visible | 150px |
| 55" (3840x2160) | 4 | 4x3 visible | 180px |

### 4.2 Typography Scaling

| Element | 32" | 43" | 55" |
|---------|-----|-----|-----|
| Hero Title | 72px | 84px | 96px |
| Page Heading | 60px | 68px | 72px |
| Subheading | 48px | 52px | 56px |
| Body | 48px | 52px | 56px |
| Button | 56px | 64px | 72px |
| Input | 48px | 52px | 56px |

---

## 5. User Flows

### 5.1 Bill Payment Flow

```
[Welcome] → [Language] → [Auth: OTP] → [Dashboard]
                                              ↓
                                    [Select: Electricity]
                                              ↓
                                    [View Bills]
                                              ↓
                              [Select Bills] → [Add to Cart]
                                              ↓
                              [Proceed to Pay]
                                              ↓
                            [Select Payment: UPI]
                                              ↓
                            [Payment Processing]
                                    ↙         ↘
                        [Success]         [Failed]
                            ↘               ↘
                      [Receipt Options]  [Retry]
                            ↘               
                    [Print/SMS/WhatsApp]  
                            ↓               
                         [Dashboard]
```

### 5.2 Grievance Flow

```
[Dashboard] → [Select: Grievance]
                      ↓
           [Select Category]
                      ↓
        [Enter Subject + Description]
                      ↓
    [Optionally: Attach Photo/Video]
                      ↓
           [Submit Complaint]
                      ↓
       [Get Complaint ID + SMS]
                      ↓
    [View in My Complaints]
                      ↓
[Track Status] → [Escalate if needed]
                      ↓
         [Provide Feedback]
```

---

## 6. Accessibility Features

### 6.1 Voice Guidance

- Auto-play on every screen
- Language matches user selection
- Can be toggled on/off
- Skip button available

### 6.2 Font Scaling

- **Normal (100%)**: Default
- **Large (130%)**: +30% from base
- **Extra Large (150%)**: +50% from base

### 6.3 High Contrast Mode

- Background: #000000
- Text: #FFFFFF
- Icons: #FFD700 (Gold)
- Borders: #FFFFFF

### 6.4 Touch Targets

- Minimum: 60x60mm
- Recommended: 80x80mm
- Spacing: 16px between targets

---

## 7. Animation Specifications

### 7.1 Transitions

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Screen Transition | 300ms | ease-in-out | Navigation |
| Button Press | 150ms | ease-out | Touch |
| Card Appear | 400ms | ease-out | Load |
| Success Pulse | 1000ms | ease-in-out | Success |
| Loading Spinner | 1500ms | linear | Infinite |
| Fade In | 500ms | ease-in | Load |

### 7.2 Feedback

- **Button Touch**: Scale to 0.95
- **Success**: Checkmark draw animation
- **Error**: Shake animation (3 cycles)
- **Loading**: Pulse animation on spinner

---

## 8. Figma Implementation Guide

### 8.1 Recommended Plugins

1. **Unsplash** - Stock images
2. **Iconify** - Material icons
3. **Fontify** - Font preview
4. **Stark - Accessibility** - Contrast checker

### 8.2 Component Naming Convention

```
Components/
├── Buttons/
│   ├── PrimaryCTA
│   ├── SecondaryCTA
│   └── IconButton
├── Cards/
│   ├── ServiceTile
│   ├── BillCard
│   └── PaymentOption
├── Inputs/
│   ├── TextInput
│   ├── Textarea
│   └── OTPBox
├── Navigation/
│   ├── BottomNav
│   ├── Header
│   └── BackButton
└── Modals/
    ├── ConfirmDialog
    └── AlertBanner
```

### 8.3 Auto-Layout Settings

- **Horizontal padding**: 40px
- **Vertical spacing**: 24px
- **Card padding**: 24px
- **Button height**: 100px
- **Icon size (nav)**: 40px

---

## 9. Assets Required

### 9.1 Icons (SVG Format)

All Material Symbols outlined variants:
- electricity, water_drop, local_fire_dept
- account_balance, description, receipt_long
- campaign, home, settings, help, arrow_back
- fingerprint, qr_code_scanner, smartphone
- print, check_circle, error, sync

### 9.2 Images

- Digital India logo (SVG)
- State government logos (configurable)
- Payment method logos (UPI, Visa, Mastercard, RuPay)

### 9.3 Fonts

- Noto Sans (Google Fonts)
- Noto Sans Devanagari
- Noto Sans [Regional languages as needed]

---

*Document Version: 1.0*
*Last Updated: February 2026*
*For Figma Implementation*
