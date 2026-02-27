"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { Smartphone, Fingerprint, QrCode, User } from "lucide-react";
import type { AuthMethod } from "@/types";

export function AuthScreen() {
  const { login, setCurrentScreen, fontScale } = useAppStore();
  const { t, speak } = useTranslation();
  const [step, setStep] = useState<"method" | "otp">("method");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const highContrast = useAppStore((state) => state.highContrast);
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const cardBg = highContrast ? "bg-gray-800" : "bg-background-light";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  
  const authMethods: { id: AuthMethod; icon: any; label: string; sublabel: string }[] = [
    { id: "otp", icon: Smartphone, label: t("mobileOtp"), sublabel: "मोबाइल ओटीपी" },
    { id: "aadhaar", icon: Fingerprint, label: t("aadhaarBiometric"), sublabel: "आधार बायोमेट्रिक" },
    { id: "qr", icon: QrCode, label: t("scanQrCode"), sublabel: "क्यूआर कोड स्कैन करें" },
    { id: "guest", icon: User, label: t("continueAsGuest"), sublabel: "अतिथि के रूप में जारी रखें" },
  ];
  
  const handleMethodSelect = (method: AuthMethod) => {
    if (method === "otp") {
      setStep("otp");
    } else if (method === "guest") {
      login("guest", { id: "guest", name: "Guest User" });
    } else {
      // Mock login for other methods
      login(method, { id: "user123", name: "Test User", mobile });
    }
  };
  
  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setStep("otp");
    }
  };
  
  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      login("otp", { id: "user123", name: "Test User", mobile });
    }
  };
  
  const handleNumberClick = (num: string) => {
    if (mobile.length < 10) {
      setMobile(mobile + num);
    }
  };
  
  const handleOtpDigit = (digit: string, index: number) => {
    const newOtp = otp.split("");
    newOtp[index] = digit;
    setOtp(newOtp.join(""));
  };
  
  if (step === "otp" && mobile.length > 0) {
    return (
      <div className={`${bgColor} min-h-screen flex flex-col p-8`}>
        <h1 className={`${textColor} font-bold text-center mb-4`} style={{ fontSize: 48 * fontScale }}>
          📱 {t("mobileOtp")}
        </h1>
        <p className={`${subTextColor} text-center mb-8`} style={{ fontSize: 28 * fontScale }}>
          {t("enterOtp")}
        </p>
        
        <div className="flex justify-center gap-4 mb-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={otp[i] || ""}
              onChange={(e) => handleOtpDigit(e.target.value, i)}
              className={`w-20 h-20 text-center text-3xl font-bold rounded-lg ${
                highContrast ? "bg-gray-800 text-white border-gray-600" : "bg-background-light text-text-primary border-gray-300"
              } border-2`}
              style={{ fontSize: 36 * fontScale }}
            />
          ))}
        </div>
        
        <p className={`${subTextColor} text-center mb-8`} style={{ fontSize: 24 * fontScale }}>
          {t("resendOtp")} (58s)
        </p>
        
        <button
          onClick={handleVerifyOtp}
          disabled={otp.length !== 6}
          className={`w-full py-6 rounded-xl font-bold text-white ${
            otp.length === 6 ? (highContrast ? "bg-yellow-600" : "bg-accent") : "bg-gray-500"
          }`}
          style={{ fontSize: 32 * fontScale }}
        >
          {t("verify")}
        </button>
      </div>
    );
  }
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col p-8`}>
      <h1 className={`${textColor} font-bold text-center mb-4`} style={{ fontSize: 48 * fontScale }}>
        {t("authenticate")}
      </h1>
      <p className={`${subTextColor} text-center mb-8`} style={{ fontSize: 28 * fontScale }}>
        {t("howToVerify")}
      </p>
      
      {step === "method" && mobile.length < 10 && (
        <div className="mb-8">
          <p className={`${textColor} mb-4`} style={{ fontSize: 28 * fontScale }}>{t("enterMobile")}</p>
          <div className={`flex justify-center gap-2 mb-6 ${cardBg} p-4 rounded-xl`}>
            <span className={textColor} style={{ fontSize: 36 * fontScale }}>+91</span>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className={`bg-transparent ${textColor} text-center`}
              style={{ fontSize: 36 * fontScale, width: 200 }}
              placeholder="___ ___ ____"
            />
          </div>
          <button
            onClick={handleSendOtp}
            disabled={mobile.length !== 10}
            className={`w-full py-6 rounded-xl font-bold text-white ${
              mobile.length === 10 ? (highContrast ? "bg-yellow-600" : "bg-accent") : "bg-gray-500"
            }`}
            style={{ fontSize: 32 * fontScale }}
          >
            {t("sendOtp")}
          </button>
        </div>
      )}
      
      <div className="space-y-4">
        {authMethods.slice(0, 3).map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method.id)}
            className={`${cardBg} w-full p-6 rounded-xl flex items-center gap-6`}
            style={{ minHeight: 140 }}
          >
            <method.icon size={60} className={textColor} />
            <div className="text-left">
              <p className={textColor} style={{ fontSize: 28 * fontScale, fontWeight: 600 }}>
                {method.label}
              </p>
              <p className={subTextColor} style={{ fontSize: 22 * fontScale }}>
                {method.sublabel}
              </p>
            </div>
          </button>
        ))}
        
        <button
          onClick={() => handleMethodSelect("guest")}
          className={`${cardBg} w-full p-6 rounded-xl flex items-center gap-6 opacity-70`}
          style={{ minHeight: 140 }}
        >
          <User size={60} className={textColor} />
          <div className="text-left">
            <p className={textColor} style={{ fontSize: 28 * fontScale, fontWeight: 600 }}>
              {t("continueAsGuest")}
            </p>
            <p className={subTextColor} style={{ fontSize: 22 * fontScale }}>
              अतिथि के रूप में जारी रखें
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
