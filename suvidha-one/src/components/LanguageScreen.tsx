"use client";

import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { languages, type Language } from "@/types";

export function LanguageScreen() {
  const { setLanguage, setCurrentScreen, fontScale } = useAppStore();
  const { speak } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);
  
  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setCurrentScreen("auth");
  };
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const cardBg = highContrast ? "bg-gray-800" : "bg-background-light";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  const selectedBorder = highContrast ? "border-yellow-400" : "border-accent";
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col p-8`}>
      <h1 className={`${textColor} font-bold text-center mb-4`} style={{ fontSize: 48 * fontScale }}>
        {useTranslation().t("selectLanguage")}
      </h1>
      <p className={`${subTextColor} text-center mb-8`} style={{ fontSize: 32 * fontScale }}>
        अपनी भाषा चुनें
      </p>
      
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 content-start">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelectLanguage(lang.code)}
            className={`${cardBg} p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105 active:scale-95 border-4 ${
              useAppStore.getState().language === lang.code ? selectedBorder : "border-transparent"
            }`}
            style={{ minHeight: 200 }}
          >
            <span style={{ fontSize: 64 }}>{lang.flag}</span>
            <span className={textColor} style={{ fontSize: 32 * fontScale, fontWeight: 700 }}>
              {lang.nameNative}
            </span>
            <span className={subTextColor} style={{ fontSize: 24 * fontScale }}>
              {lang.name}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <span className={`${subTextColor} text-2xl`}>
          ← Default: Hindi
        </span>
      </div>
    </div>
  );
}
