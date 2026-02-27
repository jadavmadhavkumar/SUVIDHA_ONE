"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { Header, BottomNav } from "./Header";
import { Zap, Waves, Flame, Building2, FileText, Send } from "lucide-react";

const categories = [
  { id: "electricity", icon: Zap, label: "Electricity", labelHindi: "बिजली", color: "bg-accent" },
  { id: "water", icon: Waves, label: "Water", labelHindi: "पानी", color: "bg-blue-500" },
  { id: "gas", icon: Flame, label: "Gas", labelHindi: "गैस", color: "bg-red-500" },
  { id: "municipal", icon: Building2, label: "Municipal", labelHindi: "नगरपालिका", color: "bg-success" },
  { id: "other", icon: FileText, label: "Other", labelHindi: "अन्य", color: "bg-purple-600" },
];

export function GrievanceScreen() {
  const { addGrievance, setCurrentScreen, fontScale } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);
  
  const [step, setStep] = useState<"category" | "form">("category");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const cardBg = highContrast ? "bg-gray-800" : "bg-background-light";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  const inputBg = highContrast ? "bg-gray-700" : "bg-background-light";
  
  const handleCategorySelect = (catId: string) => {
    setCategory(catId);
    setStep("form");
  };
  
  const handleSubmit = () => {
    if (subject && description) {
      addGrievance({
        id: `GRV${Date.now()}`,
        category,
        title: subject,
        description,
        status: "open",
        createdAt: new Date().toISOString()
      });
      setCurrentScreen("dashboard");
    }
  };
  
  if (step === "category") {
    return (
      <div className={`${bgColor} min-h-screen flex flex-col`}>
        <Header showBack onBack={() => setCurrentScreen("dashboard")} />
        
        <main className="flex-1 p-6 overflow-auto">
          <h1 className={`${textColor} font-bold mb-2`} style={{ fontSize: 40 * fontScale }}>
            {t("fileComplaint")}
          </h1>
          <p className={`${subTextColor} mb-8`} style={{ fontSize: 24 * fontScale }}>
            शिकायत दर्ज करें
          </p>
          
          <p className={`${textColor} mb-6`} style={{ fontSize: 24 * fontScale }}>
            {t("selectCategory")}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`${cardBg} p-6 rounded-xl flex flex-col items-center gap-3`}
                style={{ minHeight: 160 }}
              >
                <div className={`${cat.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                  <cat.icon size={32} className="text-white" />
                </div>
                <p className={textColor} style={{ fontSize: 24 * fontScale, fontWeight: 600 }}>
                  {cat.labelHindi}
                </p>
                <p className={subTextColor} style={{ fontSize: 18 * fontScale }}>
                  {cat.label}
                </p>
              </button>
            ))}
          </div>
        </main>
        
        <BottomNav />
      </div>
    );
  }
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col`}>
      <Header showBack onBack={() => setStep("category")} />
      
      <main className="flex-1 p-6 overflow-auto">
        <h1 className={`${textColor} font-bold mb-6`} style={{ fontSize: 36 * fontScale }}>
          {t("fileComplaint")}
        </h1>
        
        <div className="space-y-6">
          <div>
            <label className={textColor} style={{ fontSize: 24 * fontScale }}>
              {t("subject")}
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`w-full mt-2 p-4 rounded-xl ${inputBg} ${textColor}`}
              style={{ fontSize: 24 * fontScale, minHeight: 70 }}
            />
          </div>
          
          <div>
            <label className={textColor} style={{ fontSize: 24 * fontScale }}>
              {t("description")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full mt-2 p-4 rounded-xl ${inputBg} ${textColor}`}
              style={{ fontSize: 24 * fontScale, minHeight: 180 }}
              rows={4}
            />
          </div>
          
          <button
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 ${
              highContrast ? "bg-yellow-600" : "bg-accent"
            } text-white`}
            style={{ fontSize: 24 * fontScale, minHeight: 70 }}
          >
            <Send size={28} />
            {t("attachPhoto")}
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!subject || !description}
            className={`w-full py-6 rounded-xl font-bold text-white ${
              subject && description 
                ? (highContrast ? "bg-yellow-600" : "bg-accent") 
                : "bg-gray-500"
            }`}
            style={{ fontSize: 28 * fontScale }}
          >
            {t("submitComplaint")}
          </button>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
