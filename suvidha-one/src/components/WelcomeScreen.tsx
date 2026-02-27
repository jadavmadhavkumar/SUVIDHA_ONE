"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { useTranslation, useVoiceAnnounce } from "./useTranslation";
import { Globe, Volume2, VolumeX } from "lucide-react";

export function WelcomeScreen() {
  const [error, setError] = useState<string | null>(null);
  
  const { setCurrentScreen, language, setLanguage, voiceEnabled, setVoiceEnabled, fontScale } = useAppStore();
  const { t, speak } = useTranslation();
  const highContrast = useAppStore((state) => state.highContrast);
  
  useVoiceAnnounce("welcome");
  
  const handleStart = () => {
    try {
      speak(t("selectLanguage"));
      setCurrentScreen("language");
    } catch (err) {
      console.error("handleStart error:", err);
      setCurrentScreen("language");
    }
  };
  
  const toggleLanguage = () => {
    try {
      const langs = ["hi", "en"];
      const currentIndex = langs.indexOf(language);
      const nextIndex = (currentIndex + 1) % langs.length;
      setLanguage(langs[nextIndex] as "hi" | "en");
    } catch (err) {
      console.error("toggleLanguage error:", err);
    }
  };
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const accentColor = highContrast ? "text-yellow-400" : "text-accent";
  
  if (error) {
    return (
      <div className={`${bgColor} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`${textColor} text-4xl font-bold mb-4`}>Error</h2>
          <p className={textColor}>{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-4 bg-accent text-white px-8 py-4 rounded-xl font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col animate-fade-in`}>
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <button
          onClick={toggleLanguage}
          className={`flex items-center gap-2 p-3 rounded-lg ${highContrast ? "bg-gray-800" : "bg-background-light"}`}
        >
          <Globe size={32} />
          <span className="font-bold" style={{ fontSize: 24 * fontScale }}>{language.toUpperCase()}</span>
        </button>
        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`p-3 rounded-lg ${highContrast ? "bg-gray-800" : "bg-background-light"}`}
        >
          {voiceEnabled ? <Volume2 size={32} /> : <VolumeX size={32} />}
        </button>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <div className="text-8xl mb-4">🇮🇳</div>
          <h1 className={`${textColor} font-bold mb-4`} style={{ fontSize: 72 * fontScale }}>
            SUVIDHA ONE
          </h1>
          <p className={accentColor} style={{ fontSize: 36 * fontScale }}>
            "One Kiosk, All Services"
          </p>
          <p className={highContrast ? "text-gray-400" : "text-text-secondary"} style={{ fontSize: 32 * fontScale }}>
            "सुविधा सबके लिए"
          </p>
        </div>
        
        {/* Touch to Start Button */}
        <button
          onClick={handleStart}
          className={`${highContrast ? "bg-yellow-600" : "bg-accent"} text-white px-16 py-8 rounded-2xl font-bold animate-pulse-slow`}
          style={{ fontSize: 36 * fontScale }}
        >
          {t("touchToStart")}
        </button>
        
        <p className={`mt-8 ${highContrast ? "text-gray-400" : "text-text-secondary"}`} style={{ fontSize: 24 * fontScale }}>
          👆 Tap anywhere
        </p>
      </main>
      
      {/* Footer */}
      <footer className={`p-6 text-center ${highContrast ? "text-gray-400" : "text-text-secondary"}`} style={{ fontSize: 20 * fontScale }}>
        <p>Digital India | Smart City Mission | Ek Bharat Shreshtha Bharat</p>
      </footer>
    </div>
  );
}
