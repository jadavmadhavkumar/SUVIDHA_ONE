"use client";

import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { Header, BottomNav } from "./Header";
import { History, CheckCircle, XCircle, Clock, IndianRupee, FileText, Zap, Waves, Flame } from "lucide-react";

export function HistoryScreen() {
  const { transactions, setCurrentScreen, fontScale } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);

  const bgColor = highContrast ? "bg-black" : "bg-gradient-to-br from-slate-50 via-white to-blue-50";
  const cardBg = highContrast ? "bg-gray-800" : "bg-white";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle size={32} className="text-success" />;
      case "failed":
        return <XCircle size={32} className="text-error" />;
      default:
        return <Clock size={32} className="text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const totalPaid = transactions
    .filter(t => t.status === "success")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className={`${bgColor} min-h-screen flex flex-col`}>
      <Header showBack onBack={() => setCurrentScreen("dashboard")} />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 animate-slide-in">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <History size={36} className="text-white" />
          </div>
          <div>
            <h1 className={`${textColor} font-bold`} style={{ fontSize: 40 * fontScale }}>
              {t("paymentHistory")}
            </h1>
            <p className={subTextColor} style={{ fontSize: 20 * fontScale }}>
              {t("recentTransactions")}
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        {!highContrast && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className={`${cardBg} p-5 rounded-2xl shadow-card`}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <IndianRupee size={28} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Total Paid</p>
                  <p className="text-2xl font-bold text-text-primary">₹{totalPaid.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className={`${cardBg} p-5 rounded-2xl shadow-card`}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FileText size={28} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Transactions</p>
                  <p className="text-2xl font-bold text-text-primary">{transactions.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transactions List */}
        {transactions.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <History size={64} className="text-gray-400" />
            </div>
            <p className={textColor} style={{ fontSize: 32 * fontScale, fontWeight: 600 }}>
              {t("noTransactions")}
            </p>
            <p className={`${subTextColor} mt-2`} style={{ fontSize: 24 * fontScale }}>
              Your payment history will appear here
            </p>
            <button
              onClick={() => setCurrentScreen("dashboard")}
              className="mt-6 bg-gradient-accent text-white px-8 py-4 rounded-xl font-bold text-xl hover:shadow-lg transition-all"
            >
              Make a Payment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`${cardBg} p-5 rounded-2xl shadow-card transition-all hover:shadow-lg animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  {/* Status Icon */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    transaction.status === "success" ? "bg-green-100" :
                    transaction.status === "failed" ? "bg-red-100" : "bg-yellow-100"
                  }`}>
                    {getStatusIcon(transaction.status)}
                  </div>

                  {/* Transaction Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={textColor} style={{ fontSize: 22 * fontScale, fontWeight: 700 }}>
                        {transaction.type}
                      </p>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                        {t(transaction.status)}
                      </span>
                    </div>
                    <p className={subTextColor} style={{ fontSize: 18 * fontScale }}>
                      {transaction.id}
                    </p>
                    <p className={subTextColor} style={{ fontSize: 16 * fontScale }}>
                      {new Date(transaction.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className={`font-extrabold ${
                      transaction.status === "success" ? "text-success" :
                      transaction.status === "failed" ? "text-error" : "text-warning"
                    }`} style={{ fontSize: 28 * fontScale }}>
                      ₹{transaction.amount.toLocaleString()}
                    </p>
                    {transaction.status === "success" && (
                      <p className="text-success text-sm" style={{ fontSize: 16 * fontScale }}>
                        ✓ Completed
                      </p>
                    )}
                  </div>
                </div>

                {/* View Receipt Button */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                  <button className={`${highContrast ? "text-yellow-400" : "text-primary"} font-medium flex items-center gap-2 hover:underline`} style={{ fontSize: 18 * fontScale }}>
                    <FileText size={20} />
                    View Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
