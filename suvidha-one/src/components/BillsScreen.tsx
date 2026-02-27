"use client";

import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { Header, BottomNav } from "./Header";
import { Check } from "lucide-react";

export function BillsScreen() {
  const { bills, selectedBills, toggleBillSelection, selectAllBills, setCurrentScreen, fontScale } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const cardBg = highContrast ? "bg-gray-800" : "bg-background-light";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  
  const selectedTotal = bills
    .filter(b => selectedBills.includes(b.id))
    .reduce((sum, b) => sum + b.amount, 0);
  
  const pendingBills = bills.filter(b => b.status === "pending");
  
  const handleProceed = () => {
    if (selectedBills.length > 0) {
      setCurrentScreen("payment-mode");
    }
  };
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col`}>
      <Header showBack onBack={() => setCurrentScreen("dashboard")} showCart />
      
      <main className="flex-1 p-6 overflow-auto">
        <h1 className={`${textColor} font-bold mb-6`} style={{ fontSize: 40 * fontScale }}>
          {t("billPayment")}
        </h1>
        
        {pendingBills.length === 0 ? (
          <div className="text-center py-12">
            <p className={subTextColor} style={{ fontSize: 32 * fontScale }}>{t("noBills")}</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {pendingBills.map((bill) => (
                <button
                  key={bill.id}
                  onClick={() => toggleBillSelection(bill.id)}
                  className={`${cardBg} w-full p-5 rounded-xl flex items-center gap-4 border-4 ${
                    selectedBills.includes(bill.id) 
                      ? (highContrast ? "border-yellow-400" : "border-accent")
                      : "border-transparent"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedBills.includes(bill.id) 
                      ? "bg-success" 
                      : (highContrast ? "bg-gray-700" : "bg-gray-200")
                  }`}>
                    {selectedBills.includes(bill.id) && <Check size={28} className="text-white" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={textColor} style={{ fontSize: 26 * fontScale, fontWeight: 600 }}>
                      {bill.provider}
                    </p>
                    <p className={subTextColor} style={{ fontSize: 20 * fontScale }}>
                      Consumer: {bill.consumerNumber}
                    </p>
                    <p className={subTextColor} style={{ fontSize: 18 * fontScale }}>
                      Period: {bill.period}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={textColor} style={{ fontSize: 28 * fontScale, fontWeight: 700 }}>
                      ₹{bill.amount}
                    </p>
                    <p className="text-error" style={{ fontSize: 18 * fontScale }}>
                      Due: {new Date(bill.dueDate).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className={`${cardBg} p-6 rounded-xl mb-6`}>
              <div className="flex justify-between items-center mb-4">
                <p className={textColor} style={{ fontSize: 24 * fontScale }}>
                  Selected Bills: {selectedBills.length}
                </p>
                <button
                  onClick={selectAllBills}
                  className={`${highContrast ? "text-yellow-400" : "text-primary"} underline`}
                  style={{ fontSize: 20 * fontScale }}
                >
                  {t("selectAll")}
                </button>
              </div>
              <p className={textColor} style={{ fontSize: 32 * fontScale, fontWeight: 700 }}>
                {t("total")}: ₹{selectedTotal.toLocaleString()}
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={selectAllBills}
                className={`flex-1 py-5 rounded-xl font-bold border-2 ${
                  highContrast 
                    ? "border-gray-600 text-white" 
                    : "border-primary text-primary"
                }`}
                style={{ fontSize: 24 * fontScale }}
              >
                {t("selectAll")}
              </button>
              <button
                onClick={handleProceed}
                disabled={selectedBills.length === 0}
                className={`flex-1 py-5 rounded-xl font-bold text-white ${
                  selectedBills.length > 0 
                    ? (highContrast ? "bg-yellow-600" : "bg-accent") 
                    : "bg-gray-500"
                }`}
                style={{ fontSize: 24 * fontScale }}
              >
                {t("proceed")}
              </button>
            </div>
          </>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}
