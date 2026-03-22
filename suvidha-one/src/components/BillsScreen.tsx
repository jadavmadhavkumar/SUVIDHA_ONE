"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { useBills } from "@/hooks/useApi";
import { Header, BottomNav } from "./Header";
import { Check, Zap, Waves, Flame, AlertCircle, Calendar, FileText, Loader2 } from "lucide-react";

export function BillsScreen() {
  const { bills, selectedBills, toggleBillSelection, selectAllBills, setCurrentScreen, fontScale, setBills } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);

  const { data: billsData, isLoading, error, refetch } = useBills();

  useEffect(() => {
    if (billsData?.bills) {
      const formattedBills = billsData.bills.map(b => ({
        id: b.id,
        provider: b.provider,
        consumerNumber: b.consumer_number,
        amount: b.amount,
        dueDate: b.due_date,
        period: b.period,
        status: b.status,
        utilityType: b.utility_type,
      }));
      setBills(formattedBills);
    }
  }, [billsData, setBills]);

  const bgColor = highContrast ? "bg-black" : "bg-gradient-to-br from-slate-50 via-white to-blue-50";
  const cardBg = highContrast ? "bg-gray-800" : "bg-white";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";

  const selectedTotal = bills
    .filter(b => selectedBills.includes(b.id))
    .reduce((sum, b) => sum + b.amount, 0);

  const pendingBills = bills.filter(b => b.status === "pending");

  const convenienceFee = selectedTotal > 0 ? Math.round(selectedTotal * 0.02) : 0;
  const grandTotal = selectedTotal + convenienceFee;

  const handleProceed = () => {
    if (selectedBills.length > 0) {
      setCurrentScreen("payment-mode");
    }
  };

  const getUtilityIcon = (type: string) => {
    switch (type) {
      case "electricity": return Zap;
      case "water": return Waves;
      case "gas": return Flame;
      default: return FileText;
    }
  };

  if (isLoading) {
    return (
      <div className={`${bgColor} min-h-screen flex flex-col items-center justify-center`}>
        <Loader2 className="w-16 h-16 animate-spin text-primary mb-4" />
        <p className={textColor} style={{ fontSize: 24 * fontScale }}>Loading bills...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${bgColor} min-h-screen flex flex-col`}>
        <Header showBack onBack={() => setCurrentScreen("dashboard")} />
        <main className="flex-1 p-6 flex flex-col items-center justify-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <p className={textColor} style={{ fontSize: 24 * fontScale }}>Failed to load bills</p>
          <button
            onClick={() => refetch()}
            className="mt-4 bg-primary text-white px-6 py-3 rounded-xl font-bold"
            style={{ fontSize: 20 * fontScale }}
          >
            Retry
          </button>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className={`${bgColor} min-h-screen flex flex-col`}>
      <Header showBack onBack={() => setCurrentScreen("dashboard")} showCart />

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center gap-3 mb-6 animate-slide-in">
          <div className="p-3 bg-gradient-accent rounded-xl">
            <FileText size={36} className="text-white" />
          </div>
          <div>
            <h1 className={`${textColor} font-bold`} style={{ fontSize: 40 * fontScale }}>
              {t("billPayment")}
            </h1>
            <p className={subTextColor} style={{ fontSize: 20 * fontScale }}>
              {pendingBills.length} {t("pendingBills")}
            </p>
          </div>
        </div>

        {pendingBills.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={64} className="text-green-600" />
            </div>
            <p className={textColor} style={{ fontSize: 32 * fontScale, fontWeight: 600 }}>{t("noBills")}</p>
            <p className={`${subTextColor} mt-2`} style={{ fontSize: 24 * fontScale }}>All bills are paid!</p>
          </div>
        ) : (
          <>
            {/* Bills List */}
            <div className="space-y-4 mb-6">
              {pendingBills.map((bill, index) => {
                const UtilityIcon = getUtilityIcon(bill.utilityType);
                const isSelected = selectedBills.includes(bill.id);
                return (
                  <button
                    key={bill.id}
                    onClick={() => toggleBillSelection(bill.id)}
                    className={`${cardBg} w-full p-5 rounded-2xl flex items-center gap-4 border-4 shadow-card transition-all duration-300 ${
                      isSelected
                        ? (highContrast ? "border-yellow-400 bg-gray-700" : "border-accent bg-blue-50")
                        : "border-transparent"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Selection Checkbox */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-gradient-success"
                        : (highContrast ? "bg-gray-700" : "bg-gray-200")
                    }`}>
                      {isSelected && <Check size={32} className="text-white" />}
                    </div>

                    {/* Utility Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                      bill.utilityType === "electricity" ? "from-yellow-400 to-orange-500" :
                      bill.utilityType === "water" ? "from-blue-400 to-cyan-500" :
                      "from-red-400 to-orange-500"
                    } flex items-center justify-center`}>
                      <UtilityIcon size={32} className="text-white" />
                    </div>

                    {/* Bill Info */}
                    <div className="flex-1 text-left">
                      <p className={textColor} style={{ fontSize: 26 * fontScale, fontWeight: 700 }}>
                        {bill.provider}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className={subTextColor} style={{ fontSize: 18 * fontScale }}>
                          {t("consumerNo")}: {bill.consumerNumber}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          bill.status === "overdue" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {t(bill.status)}
                        </span>
                      </div>
                      <p className={subTextColor} style={{ fontSize: 18 * fontScale }}>
                        {t("period")}: {bill.period}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <p className={textColor} style={{ fontSize: 32 * fontScale, fontWeight: 800 }}>
                        ₹{bill.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        <Calendar size={16} className="text-error" />
                        <p className="text-error font-medium" style={{ fontSize: 16 * fontScale }}>
                          {new Date(bill.dueDate).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Payment Summary */}
            <div className={`${cardBg} p-6 rounded-2xl shadow-lg mb-6 animate-slide-up`}>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <p className={textColor} style={{ fontSize: 24 * fontScale, fontWeight: 600 }}>
                  {selectedBills.length} {t("billsSelected")}
                </p>
                <button
                  onClick={selectAllBills}
                  className={`${highContrast ? "text-yellow-400" : "text-primary"} underline font-medium`}
                  style={{ fontSize: 20 * fontScale }}
                >
                  {t("selectAll")}
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className={subTextColor} style={{ fontSize: 22 * fontScale }}>{t("total")}</span>
                  <span className={textColor} style={{ fontSize: 22 * fontScale, fontWeight: 600 }}>₹{selectedTotal.toLocaleString()}</span>
                </div>
                {convenienceFee > 0 && (
                  <div className="flex justify-between">
                    <span className={subTextColor} style={{ fontSize: 22 * fontScale }}>{t("convenienceFee")} (2%)</span>
                    <span className={textColor} style={{ fontSize: 22 * fontScale, fontWeight: 600 }}>₹{convenienceFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t-2 border-gray-300">
                  <span className={textColor} style={{ fontSize: 28 * fontScale, fontWeight: 700 }}>{t("grandTotal")}</span>
                  <span className="text-gradient" style={{ fontSize: 32 * fontScale, fontWeight: 800 }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={selectAllBills}
                className={`flex-1 py-6 rounded-xl font-bold border-2 transition-all ${
                  highContrast
                    ? "border-gray-600 text-white hover:bg-gray-800"
                    : "border-primary text-primary hover:bg-blue-50"
                }`}
                style={{ fontSize: 24 * fontScale }}
              >
                {t("selectAll")}
              </button>
              <button
                onClick={handleProceed}
                disabled={selectedBills.length === 0}
                className={`flex-1 py-6 rounded-xl font-bold text-white transition-all transform ${
                  selectedBills.length > 0
                    ? (highContrast ? "bg-yellow-600 hover:bg-yellow-500" : "bg-gradient-accent hover:shadow-xl hover:scale-105")
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                style={{ fontSize: 24 * fontScale }}
              >
                {t("proceed")} →
              </button>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
