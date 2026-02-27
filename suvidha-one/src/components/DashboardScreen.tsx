"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { Header, BottomNav, UserGreeting } from "./Header";
import { Zap, Waves, Flame, Building2, FileText, CreditCard, Megaphone, Info } from "lucide-react";

const services = [
  { id: "electricity", icon: Zap, color: "bg-accent", name: "Electricity", nameHindi: "बिजली" },
  { id: "water", icon: Waves, color: "bg-blue-500", name: "Water Supply", nameHindi: "पानी" },
  { id: "gas", icon: Flame, color: "bg-red-500", name: "Gas / LPG", nameHindi: "गैस / एलपीजी" },
  { id: "municipal", icon: Building2, color: "bg-success", name: "Municipal", nameHindi: "नगरपालिका" },
  { id: "certificates", icon: FileText, color: "bg-purple-600", name: "Certificates", nameHindi: "प्रमाण पत्र" },
  { id: "billPayment", icon: CreditCard, color: "bg-success", name: "Bill Payment", nameHindi: "बिल भुगतान" },
  { id: "grievance", icon: Megaphone, color: "bg-error", name: "Grievance", nameHindi: "शिकायत" },
  { id: "more", icon: Info, color: "bg-primary", name: "More Services", nameHindi: "अधिक सेवाएं" },
];

export function DashboardScreen() {
  const [error, setError] = useState<string | null>(null);
  
  const { setCurrentScreen, bills, fontScale } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const cardBg = highContrast ? "bg-gray-800" : "bg-background-light";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  
  const getPendingAmount = (serviceId: string): number | undefined => {
    try {
      if (serviceId === "electricity") {
        return bills.filter(b => b.utilityType === "electricity" && b.status === "pending")
          .reduce((sum, b) => sum + b.amount, 0);
      }
      if (serviceId === "water") {
        return bills.filter(b => b.utilityType === "water" && b.status === "pending")
          .reduce((sum, b) => sum + b.amount, 0);
      }
      if (serviceId === "gas") {
        return bills.filter(b => b.utilityType === "gas" && b.status === "pending")
          .reduce((sum, b) => sum + b.amount, 0);
      }
      return undefined;
    } catch (err) {
      console.error("getPendingAmount error:", err);
      return undefined;
    }
  };
  
  const handleServiceClick = (serviceId: string) => {
    try {
      switch (serviceId) {
        case "electricity":
        case "water":
        case "gas":
        case "billPayment":
          setCurrentScreen("bills");
          break;
        case "municipal":
          setCurrentScreen("municipal");
          break;
        case "certificates":
          setCurrentScreen("certificates");
          break;
        case "grievance":
          setCurrentScreen("grievance");
          break;
        case "more":
          setCurrentScreen("more");
          break;
      }
    } catch (err) {
      console.error("handleServiceClick error:", err);
    }
  };
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-xl text-gray-600">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-4 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col`}>
      <Header showBack={false} />
      
      <main className="flex-1 p-6 overflow-auto">
        <UserGreeting />
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const pendingAmount = getPendingAmount(service.id);
            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`${cardBg} p-6 rounded-2xl flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95`}
                style={{ minHeight: 220 }}
              >
                <div className={`${service.color} w-24 h-24 rounded-full flex items-center justify-center`}>
                  <service.icon size={48} className="text-white" />
                </div>
                <div className="text-center">
                  <p className={textColor} style={{ fontSize: 24 * fontScale, fontWeight: 600 }}>
                    {service.nameHindi}
                  </p>
                  <p className={subTextColor} style={{ fontSize: 18 * fontScale }}>
                    {service.name}
                  </p>
                  {pendingAmount !== undefined && pendingAmount > 0 && (
                    <p className="text-error font-bold mt-2" style={{ fontSize: 20 * fontScale }}>
                      ₹{pendingAmount} {t("due")}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
