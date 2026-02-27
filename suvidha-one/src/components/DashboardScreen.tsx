"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { Header, BottomNav, UserGreeting } from "./Header";
import { Zap, Waves, Flame, Building2, FileText, CreditCard, Megaphone, Info, TrendingUp, Clock, IndianRupee } from "lucide-react";

const services = [
  { id: "electricity", icon: Zap, color: "from-yellow-400 to-orange-500", name: "Electricity", nameHindi: "बिजली", bgLight: "bg-yellow-50" },
  { id: "water", icon: Waves, color: "from-blue-400 to-cyan-500", name: "Water Supply", nameHindi: "पानी", bgLight: "bg-blue-50" },
  { id: "gas", icon: Flame, color: "from-red-400 to-orange-500", name: "Gas / LPG", nameHindi: "गैस / एलपीजी", bgLight: "bg-red-50" },
  { id: "municipal", icon: Building2, color: "from-green-400 to-emerald-500", name: "Municipal", nameHindi: "नगरपालिका", bgLight: "bg-green-50" },
  { id: "certificates", icon: FileText, color: "from-purple-400 to-pink-500", name: "Certificates", nameHindi: "प्रमाण पत्र", bgLight: "bg-purple-50" },
  { id: "billPayment", icon: CreditCard, color: "from-success to-success-light", name: "Bill Payment", nameHindi: "बिल भुगतान", bgLight: "bg-green-50" },
  { id: "grievance", icon: Megaphone, color: "from-error to-error-light", name: "Grievance", nameHindi: "शिकायत", bgLight: "bg-red-50" },
  { id: "more", icon: Info, color: "from-primary to-primary-light", name: "More Services", nameHindi: "अधिक सेवाएं", bgLight: "bg-blue-50" },
];

export function DashboardScreen() {
  const [error, setError] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const { setCurrentScreen, bills, fontScale } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);

  const bgColor = highContrast ? "bg-black" : "bg-gradient-to-br from-slate-50 via-white to-blue-50";
  const cardBg = highContrast ? "bg-gray-800" : "bg-white";
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

  const totalPending = bills.filter(b => b.status === "pending").reduce((sum, b) => sum + b.amount, 0);
  const pendingCount = bills.filter(b => b.status === "pending").length;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-4xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-xl text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => setError(null)}
            className="bg-gradient-accent text-white px-10 py-5 rounded-xl font-bold text-xl hover:shadow-lg transition-all"
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
        {/* Enhanced User Greeting */}
        <UserGreeting />

        {/* Quick Stats */}
        {!highContrast && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-card">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Clock size={28} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">{pendingCount}</p>
                  <p className="text-sm text-text-secondary">Pending</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-card">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <IndianRupee size={28} className="text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">₹{totalPending.toLocaleString()}</p>
                  <p className="text-sm text-text-secondary">Total Due</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-card">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <TrendingUp size={28} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">8</p>
                  <p className="text-sm text-text-secondary">Services</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => {
            const pendingAmount = getPendingAmount(service.id);
            const isHovered = hoveredService === service.id;
            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className={`${cardBg} p-5 rounded-2xl flex flex-col items-center gap-4 shadow-card shadow-card-hover transition-all duration-300 ${
                  isHovered ? 'transform scale-105' : ''
                }`}
                style={{ minHeight: 240 }}
              >
                {/* Icon with gradient background */}
                <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg ${isHovered ? 'animate-bounce-slow' : ''}`}>
                  <service.icon size={52} className="text-white" />
                </div>
                
                {/* Service Info */}
                <div className="text-center w-full">
                  <p className={textColor} style={{ fontSize: 24 * fontScale, fontWeight: 700 }}>
                    {service.nameHindi}
                  </p>
                  <p className={subTextColor} style={{ fontSize: 18 * fontScale }}>
                    {service.name}
                  </p>
                  {pendingAmount !== undefined && pendingAmount > 0 && (
                    <div className="mt-2 bg-red-100 rounded-lg px-3 py-1">
                      <p className="text-error font-bold" style={{ fontSize: 20 * fontScale }}>
                        ₹{pendingAmount.toLocaleString()} {t("due")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Hover indicator */}
                {!highContrast && isHovered && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Actions Banner */}
        {!highContrast && (
          <div className="mt-6 bg-gradient-primary rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
                <p className="text-lg opacity-90">Our support team is available 24/7</p>
              </div>
              <button
                onClick={() => setCurrentScreen("help")}
                className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all"
              >
                Contact Support →
              </button>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
