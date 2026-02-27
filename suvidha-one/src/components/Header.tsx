"use client";

import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { ArrowLeft, Globe, Volume2, VolumeX, User, Settings, Home, FileText, HelpCircle } from "lucide-react";

interface HeaderProps {
  showBack?: boolean;
  showCart?: boolean;
  title?: string;
  onBack?: () => void;
}

export function Header({ showBack, showCart, title, onBack }: HeaderProps) {
  const { t } = useTranslation();
  const { language, setLanguage, voiceEnabled, setVoiceEnabled, selectedBills, fontScale } = useAppStore();
  const highContrast = useAppStore((state) => state.highContrast);
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  
  const toggleLanguage = () => {
    const langs = ["hi", "en", "ta", "bn", "te", "kn", "ml", "mr", "gu", "pa"];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex] as any);
  };
  
  return (
    <header className={`${bgColor} border-b ${highContrast ? "border-gray-700" : "border-gray-200"} p-4 flex items-center justify-between`} style={{ minHeight: 80 * fontScale }}>
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={onBack}
            className={`p-4 rounded-lg ${highContrast ? "bg-gray-800" : "bg-background-light"}`}
            style={{ minWidth: 80, minHeight: 80 }}
          >
            <ArrowLeft size={40} />
          </button>
        )}
        {title && (
          <h1 className={`${textColor} font-bold`} style={{ fontSize: 32 * fontScale }}>
            {title}
          </h1>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {showCart && selectedBills.length > 0 && (
          <div className={`${highContrast ? "bg-yellow-600" : "bg-accent"} text-white px-4 py-2 rounded-lg font-bold`} style={{ fontSize: 24 * fontScale }}>
            {t("cart")} ({selectedBills.length})
          </div>
        )}
        <button
          onClick={toggleLanguage}
          className={`p-4 rounded-lg flex items-center gap-2 ${highContrast ? "bg-gray-800" : "bg-background-light"}`}
          style={{ minWidth: 80, minHeight: 80 }}
        >
          <Globe size={36} />
          <span style={{ fontSize: 24 * fontScale }}>{language.toUpperCase()}</span>
        </button>
        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`p-4 rounded-lg ${highContrast ? "bg-gray-800" : "bg-background-light"}`}
          style={{ minWidth: 80, minHeight: 80 }}
        >
          {voiceEnabled ? <Volume2 size={36} /> : <VolumeX size={36} />}
        </button>
      </div>
    </header>
  );
}

interface BottomNavProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function BottomNav({ currentTab = "home", onTabChange }: BottomNavProps) {
  const { t } = useTranslation();
  const { setCurrentScreen, fontScale, logout, isAuthenticated } = useAppStore();
  const highContrast = useAppStore((state) => state.highContrast);
  
  const bgColor = highContrast ? "bg-gray-900" : "bg-white";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const activeColor = highContrast ? "text-yellow-400" : "text-primary";
  
  const tabs = [
    { id: "home", icon: Home, label: t("home") },
    { id: "history", icon: FileText, label: t("history") },
    { id: "help", icon: HelpCircle, label: t("help") },
    { id: "settings", icon: Settings, label: t("settings") },
  ];
  
  const handleTabClick = (tabId: string) => {
    if (tabId === "home") {
      setCurrentScreen("dashboard");
    } else if (tabId === "settings") {
      setCurrentScreen("settings");
    } else if (tabId === "history") {
      setCurrentScreen("history");
    } else if (tabId === "help") {
      setCurrentScreen("help");
    }
    onTabChange?.(tabId);
  };
  
  return (
    <nav className={`${bgColor} border-t ${highContrast ? "border-gray-700" : "border-gray-200"} p-4 flex justify-around`} style={{ minHeight: 100 }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`flex flex-col items-center gap-2 ${currentTab === tab.id ? activeColor : textColor}`}
          style={{ minWidth: 100 }}
        >
          <tab.icon size={40} />
          <span style={{ fontSize: 20 * fontScale }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function UserGreeting() {
  const { user, bills, fontScale } = useAppStore();
  const { t } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);
  
  const pendingCount = bills.filter(b => b.status === "pending").length;
  const totalDue = bills.filter(b => b.status === "pending").reduce((sum, b) => sum + b.amount, 0);
  
  if (!user) return null;
  
  return (
    <div className={`p-6 ${highContrast ? "bg-gray-800" : "bg-primary"} text-white rounded-xl mb-6`}>
      <div className="flex justify-between items-center">
        <div>
          <p style={{ fontSize: 28 * fontScale }}>{t("welcomeUser")} {user.name}</p>
        </div>
        <div className="text-right">
          <p style={{ fontSize: 24 * fontScale }}>{t("pendingBills")}: {pendingCount}</p>
          <p style={{ fontSize: 28 * fontScale }} className="font-bold">{t("due")}: ₹{totalDue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
