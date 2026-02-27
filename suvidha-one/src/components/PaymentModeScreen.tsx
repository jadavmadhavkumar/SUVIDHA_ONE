"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { Header } from "./Header";
import { Smartphone, CreditCard, Building, Banknote, Check } from "lucide-react";

export function PaymentModeScreen() {
  const { bills, selectedBills, setPaymentMode, setCurrentScreen, fontScale } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);
  const [selected, setSelected] = useState<string | null>(null);
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const cardBg = highContrast ? "bg-gray-800" : "bg-background-light";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  
  const selectedTotal = bills
    .filter(b => selectedBills.includes(b.id))
    .reduce((sum, b) => sum + b.amount, 0);
  
  const paymentMethods = [
    { id: "upi", icon: Smartphone, label: t("upiQrCode"), sublabel: "Scan & Pay instantly", sublabelHindi: "स्कैन करें और तुरंत भुगतान करें" },
    { id: "card", icon: CreditCard, label: t("debitCreditCard"), sublabel: "Visa, Mastercard, RuPay", sublabelHindi: "वीज़ा, मास्टरकार्ड, रुपे" },
    { id: "netbanking", icon: Building, label: t("netBanking"), sublabel: "All major banks supported", sublabelHindi: "सभी प्रमुख बैंक समर्थित" },
    { id: "cash", icon: Banknote, label: t("cash"), sublabel: "Pay at counter", sublabelHindi: "काउंटर पर भुगतान करें" },
  ];
  
  const handleSelect = (id: string) => {
    setSelected(id);
  };
  
  const handleProceed = () => {
    if (selected) {
      setPaymentMode(selected as "upi" | "card" | "cash");
      setCurrentScreen("payment-processing");
    }
  };
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col`}>
      <Header showBack onBack={() => setCurrentScreen("bills")} />
      
      <main className="flex-1 p-6 overflow-auto">
        <h1 className={`${textColor} font-bold mb-2`} style={{ fontSize: 40 * fontScale }}>
          {t("selectPaymentMethod")}
        </h1>
        <p className={`${subTextColor} mb-6`} style={{ fontSize: 28 * fontScale }}>
          भुगतान का तरीका चुनें
        </p>
        
        <p className={`${textColor} text-right mb-8`} style={{ fontSize: 32 * fontScale }}>
          {t("total")}: <span className="font-bold">₹{selectedTotal.toLocaleString()}</span>
        </p>
        
        <div className="grid grid-cols-2 gap-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleSelect(method.id)}
              className={`${cardBg} p-6 rounded-xl flex flex-col items-center gap-4 border-4 ${
                selected === method.id 
                  ? (highContrast ? "border-yellow-400" : "border-accent")
                  : "border-transparent"
              }`}
              style={{ minHeight: 200 }}
            >
              <method.icon size={60} className={textColor} />
              <div className="text-center">
                <p className={textColor} style={{ fontSize: 24 * fontScale, fontWeight: 600 }}>
                  {method.label}
                </p>
                <p className={subTextColor} style={{ fontSize: 18 * fontScale }}>
                  {method.sublabel}
                </p>
                <p className={subTextColor} style={{ fontSize: 16 * fontScale }}>
                  {method.sublabelHindi}
                </p>
              </div>
            </button>
          ))}
        </div>
        
        <button
          onClick={handleProceed}
          disabled={!selected}
          className={`w-full mt-8 py-6 rounded-xl font-bold text-white ${
            selected 
              ? (highContrast ? "bg-yellow-600" : "bg-accent") 
              : "bg-gray-500"
          }`}
          style={{ fontSize: 28 * fontScale }}
        >
          {t("proceed")}
        </button>
      </main>
    </div>
  );
}
