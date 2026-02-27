"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { Loader2 } from "lucide-react";

export function PaymentProcessingScreen() {
  const { bills, selectedBills, setCurrentScreen, setCurrentTransaction, fontScale } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);
  const [status, setStatus] = useState<"processing" | "success" | "failed">("processing");
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  
  const selectedTotal = bills
    .filter(b => selectedBills.includes(b.id))
    .reduce((sum, b) => sum + b.amount, 0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("success");
      setCurrentTransaction({
        id: `TXN${Date.now()}`,
        amount: selectedTotal,
        status: "success"
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [selectedTotal, setCurrentTransaction]);
  
  if (status === "success") {
    return (
      <PaymentSuccessScreen />
    );
  }
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col items-center justify-center p-8`}>
      <Loader2 size={120} className={`${highContrast ? "text-yellow-400" : "text-accent"} animate-spin mb-8`} />
      
      <h1 className={`${textColor} font-bold mb-4`} style={{ fontSize: 40 * fontScale }}>
        {t("processingPayment")}
      </h1>
      <p className={subTextColor} style={{ fontSize: 28 * fontScale }}>
        {t("pleaseWait")}
      </p>
      
      <p className={`${highContrast ? "text-yellow-400" : "text-primary"} font-bold mt-8`} style={{ fontSize: 48 * fontScale }}>
        ₹{selectedTotal.toLocaleString()}
      </p>
      
      <button
        onClick={() => setCurrentScreen("bills")}
        className={`mt-12 ${subTextColor} underline`}
        style={{ fontSize: 24 * fontScale }}
      >
        {t("cancel")}
      </button>
    </div>
  );
}

export function PaymentSuccessScreen() {
  const { bills, selectedBills, setCurrentScreen, currentTransaction, fontScale, logout } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  
  const selectedTotal = bills
    .filter(b => selectedBills.includes(b.id))
    .reduce((sum, b) => sum + b.amount, 0);
  
  const handleDone = () => {
    logout();
  };
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col items-center justify-center p-8`}>
      <div className={`w-32 h-32 rounded-full bg-success flex items-center justify-center mb-6`}>
        <span className="text-white text-6xl">✓</span>
      </div>
      
      <h1 className="text-success font-bold mb-2" style={{ fontSize: 42 * fontScale }}>
        {t("paymentSuccessful")}
      </h1>
      <p className={subTextColor} style={{ fontSize: 28 * fontScale }}>
        भुगतान सफल!
      </p>
      
      <p className={`${highContrast ? "text-yellow-400" : "text-primary"} font-bold mt-8`} style={{ fontSize: 56 * fontScale }}>
        ₹{selectedTotal.toLocaleString()}
      </p>
      
      <div className={`${highContrast ? "bg-gray-800" : "bg-background-light"} p-4 rounded-lg mt-4`}>
        <p className={subTextColor} style={{ fontSize: 20 * fontScale }}>
          {t("transactionId")}: {currentTransaction?.id || `TXN${Date.now()}`}
        </p>
        <p className={subTextColor} style={{ fontSize: 20 * fontScale }}>
          {new Date().toLocaleDateString("en-IN", { 
            day: "numeric", 
            month: "long", 
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </p>
      </div>
      
      <div className="flex gap-4 mt-8">
        <button
          className={`flex flex-col items-center gap-2 p-4 rounded-xl ${
            highContrast ? "bg-gray-800" : "bg-background-light"
          }`}
        >
          <span className="text-4xl">🖨️</span>
          <span className={textColor} style={{ fontSize: 18 * fontScale }}>{t("printReceipt")}</span>
        </button>
        <button
          className={`flex flex-col items-center gap-2 p-4 rounded-xl ${
            highContrast ? "bg-gray-800" : "bg-background-light"
          }`}
        >
          <span className="text-4xl">📱</span>
          <span className={textColor} style={{ fontSize: 18 * fontScale }}>{t("sendSms")}</span>
        </button>
        <button
          className={`flex flex-col items-center gap-2 p-4 rounded-xl ${
            highContrast ? "bg-gray-800" : "bg-background-light"
          }`}
        >
          <span className="text-4xl">💬</span>
          <span className={textColor} style={{ fontSize: 18 * fontScale }}>{t("sendWhatsapp")}</span>
        </button>
      </div>
      
      <button
        onClick={handleDone}
        className={`w-full mt-8 py-6 rounded-xl font-bold text-white ${
          highContrast ? "bg-yellow-600" : "bg-accent"
        }`}
        style={{ fontSize: 28 * fontScale }}
      >
        {t("done")}
      </button>
    </div>
  );
}
