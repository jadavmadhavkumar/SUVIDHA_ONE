export type Language = "hi" | "en" | "ta" | "bn" | "te" | "kn" | "ml" | "mr" | "gu" | "pa";

export interface LanguageOption {
  code: Language;
  name: string;
  nameNative: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: "hi", name: "Hindi", nameNative: "हिंदी", flag: "🇮🇳" },
  { code: "en", name: "English", nameNative: "English", flag: "🇬🇧" },
  { code: "ta", name: "Tamil", nameNative: "தமிழ்", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nameNative: "বাংলা", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nameNative: "తెలుగు", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nameNative: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nameNative: "മലയാളം", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nameNative: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nameNative: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nameNative: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
];

export type AuthMethod = "otp" | "aadhaar" | "qr" | "guest";

export interface User {
  id: string;
  name: string;
  mobile?: string;
  aadhaarId?: string;
}

export interface Service {
  id: string;
  name: string;
  nameHindi: string;
  icon: string;
  color: string;
  hasPending?: boolean;
  pendingAmount?: number;
}

export interface Bill {
  id: string;
  provider: string;
  consumerNumber: string;
  amount: number;
  dueDate: string;
  period: string;
  status: "pending" | "paid" | "overdue";
  utilityType: "electricity" | "water" | "gas";
}

export interface Grievance {
  id: string;
  category: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
}

export interface Certificate {
  id: string;
  type: string;
  typeHindi: string;
  status: "pending" | "processing" | "approved" | "issued";
  applicationNumber: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  status: "pending" | "success" | "failed";
  type: string;
  date: string;
}
