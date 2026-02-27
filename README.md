# SUVIDHA ONE - Unified Citizen Service Kiosk

A Next.js 14 kiosk application for unified citizen services in India. "One Kiosk, All Services - Suvidha Sabke Liye"

![SUVIDHA ONE Screenshot](./image.png)

## Features

- **Multi-language Support**: Hindi, English, and 8 more Indian languages
- **Voice Assistance**: Text-to-speech for accessibility
- **Bill Payments**: Electricity, water, gas bill viewing and payment
- **Certificate Tracking**: Birth, residence, and other certificates
- **Grievance Management**: Submit and track citizen grievances
- **Accessibility**: High contrast mode, adjustable font size

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Zustand (State Management)
- Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
└── styles/             # Global styles
```

## Screens

1. **Welcome** - Initial kiosk welcome screen
2. **Language Selection** - Choose preferred language
3. **Authentication** - Aadhaar/Phone/QR login options
4. **Dashboard** - Main service menu
5. **Bills** - View and pay utility bills
6. **Payment** - UPI/Card/Cash payment modes
7. **Certificates** - Track certificate applications
8. **Grievance** - Submit citizen complaints
9. **Settings** - Accessibility options

## License

MIT
