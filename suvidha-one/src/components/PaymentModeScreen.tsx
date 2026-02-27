"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { Header } from "./Header";
import { Smartphone, CreditCard, Building, Banknote, Check, Shield, Zap, IndianRupee } from "lucide-react";

export function PaymentModeScreen() {
  const { bills, selectedBills, setPaymentMode, setCurrentScreen, fontScale } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);
  const [selected, setSelected] = useState<string | null>(null);

  const bgColor = highContrast ? "bg-black" : "bg-gradient-to-br from-slate-50 via-white to-blue-50";
  const cardBg = highContrast ? "bg-gray-800" : "bg-white";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";

  const selectedTotal = bills
    .filter(b => selectedBills.includes(b.id))
    .reduce((sum, b) => sum + b.amount, 0);

  const convenienceFee = Math.round(selectedTotal * 0.02);
  const grandTotal = selectedTotal + convenienceFee;

  const paymentMethods = [
    { 
      id: "upi", 
      icon: Smartphone, 
      label: t("upiQrCode"), 
      sublabel: "Scan & Pay instantly", 
      sublabelHindi: "स्कैन करें और तुरंत भुगतान करें",
      color: "from-blue-500 to-purple-600",
      bgLight: "bg-blue-50",
      features: ["Instant", "24/7", "Zero Fee"]
    },
    { 
      id: "card", 
      icon: CreditCard, 
      label: t("debitCreditCard"), 
      sublabel: "Visa, Mastercard, RuPay", 
      sublabelHindi: "वीज़ा, मास्टरकार्ड, रुपे",
      color: "from-indigo-500 to-blue-600",
      bgLight: "bg-indigo-50",
      features: ["Secure", "All Cards", "EMI Available"]
    },
    { 
      id: "netbanking", 
      icon: Building, 
      label: t("netBanking"), 
      sublabel: "All major banks supported", 
      sublabelHindi: "सभी प्रमुख बैंक समर्थित",
      color: "from-green-500 to-emerald-600",
      bgLight: "bg-green-50",
      features: ["Direct Transfer", "Secure", "Instant"]
    },
    { 
      id: "cash", 
      icon: Banknote, 
      label: t("cash"), 
      sublabel: "Pay at counter", 
      sublabelHindi: "काउंटर पर भुगतान करें",
      color: "from-orange-500 to-red-600",
      bgLight: "bg-orange-50",
      features: ["No Digital", "Get Receipt", "Instant"]
    },
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
        {/* Header Section */}
        <div className="mb-6 animate-slide-in">
          <h1 className={`${textColor} font-bold mb-2`} style={{ fontSize: 40 * fontScale }}>
            {t("selectPaymentMethod")}
          </h1>
          <p className={`${subTextColor}`} style={{ fontSize: 28 * fontScale }}>
            {highContrast ? 'Choose payment method' : 'Choose your preferred payment method'}
          </p>
        </div>

        {/* Order Summary Card */}
        <div className={`${cardBg} rounded-2xl p-6 shadow-lg mb-6 animate-slide-up`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-accent rounded-xl">
              <IndianRupee size={32} className="text-white" />
            </div>
            <h2 className={`${textColor} font-bold`} style={{ fontSize: 28 * fontScale }}>
              {t("paymentSummary")}
            </h2>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className={subTextColor} style={{ fontSize: 20 * fontScale }}>{selectedBills.length} {t("billsSelected")}</span>
              <span className={textColor} style={{ fontSize: 20 * fontScale, fontWeight: 600 }}>₹{selectedTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={subTextColor} style={{ fontSize: 20 * fontScale }}>{t("convenienceFee")} (2%)</span>
              <span className={textColor} style={{ fontSize: 20 * fontScale, fontWeight: 600 }}>₹{convenienceFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
              <span className={textColor} style={{ fontSize: 26 * fontScale, fontWeight: 700 }}>{t("grandTotal")}</span>
              <span className="text-gradient" style={{ fontSize: 32 * fontScale, fontWeight: 800 }}>₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <Shield size={20} className="text-green-600" />
            <span className={subTextColor} style={{ fontSize: 18 * fontScale }}>{t("securePayment")} - 256 bit SSL encrypted</span>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {paymentMethods.map((method, index) => {
            const isSelected = selected === method.id;
            return (
              <button
                key={method.id}
                onClick={() => handleSelect(method.id)}
                className={`${cardBg} p-5 rounded-2xl flex flex-col items-center gap-3 border-4 shadow-card transition-all duration-300 ${
                  isSelected
                    ? (highContrast ? "border-yellow-400 bg-gray-700" : "border-accent bg-blue-50 scale-105")
                    : "border-transparent hover:shadow-lg hover:scale-102"
                }`}
                style={{ 
                  minHeight: 240,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Icon */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg ${isSelected ? 'animate-bounce-slow' : ''}`}>
                  <method.icon size={40} className="text-white" />
                </div>

                {/* Label */}
                <div className="text-center w-full">
                  <p className={textColor} style={{ fontSize: 22 * fontScale, fontWeight: 700 }}>
                    {method.label}
                  </p>
                  <p className={subTextColor} style={{ fontSize: 16 * fontScale }}>
                    {method.sublabel}
                  </p>
                  <p className={subTextColor} style={{ fontSize: 14 * fontScale }}>
                    {method.sublabelHindi}
                  </p>
                </div>

                {/* Features */}
                {!highContrast && (
                  <div className="flex gap-2 flex-wrap justify-center">
                    {method.features.map((feature) => (
                      <span key={feature} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-success rounded-full flex items-center justify-center">
                    <Check size={20} className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!selected}
          className={`w-full py-6 rounded-xl font-bold text-white text-xl transition-all transform ${
            selected
              ? (highContrast ? "bg-yellow-600 hover:bg-yellow-500" : "bg-gradient-accent hover:shadow-2xl hover:scale-105")
              : "bg-gray-400 cursor-not-allowed"
          }`}
          style={{ fontSize: 28 * fontScale }}
        >
          {selected ? (
            <span className="flex items-center justify-center gap-3">
              <Zap size={32} />
              {t("proceed")} with {selected?.toUpperCase()}
            </span>
          ) : (
            t("selectPaymentMethod")
          )}
        </button>

        {/* Help Text */}
        <p className={`text-center mt-6 ${subTextColor}`} style={{ fontSize: 20 * fontScale }}>
          🔒 {highContrast ? 'All payments are secure' : 'All payments are processed securely'}
        </p>
      </main>
    </div>
  );
}
