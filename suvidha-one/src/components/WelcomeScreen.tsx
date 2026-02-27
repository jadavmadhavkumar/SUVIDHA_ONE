"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { useTranslation, useVoiceAnnounce } from "./useTranslation";
import { Globe, Volume2, VolumeX, Sparkles } from "lucide-react";

export function WelcomeScreen() {
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const bgColor = highContrast ? "bg-black" : "bg-gradient-to-br from-blue-50 via-white to-orange-50";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const accentColor = highContrast ? "text-yellow-400" : "text-gradient";

  if (error) {
    return (
      <div className={`${bgColor} min-h-screen flex items-center justify-center`}>
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-6xl mb-4">❌</div>
          <h2 className={`${textColor} text-4xl font-bold mb-4`}>Error</h2>
          <p className="text-gray-600 mb-6" style={{ fontSize: 24 * fontScale }}>{error}</p>
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
    <div className={`${bgColor} min-h-screen flex flex-col animate-fade-in`}>
      {/* Animated Background Elements */}
      {!highContrast && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-bounce-slow" />
          <div className="absolute bottom-40 right-10 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-bounce-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
        </div>
      )}

      {/* Header */}
      <header className="relative p-6 flex justify-between items-center z-10">
        <button
          onClick={toggleLanguage}
          className={`flex items-center gap-3 p-4 rounded-xl ${highContrast ? "bg-gray-800" : "bg-white shadow-md"} hover:shadow-lg transition-all`}
        >
          <Globe size={36} className={highContrast ? "text-yellow-400" : "text-primary"} />
          <span className="font-bold" style={{ fontSize: 24 * fontScale }}>{language.toUpperCase()}</span>
        </button>
        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`p-4 rounded-xl ${highContrast ? "bg-gray-800" : "bg-white shadow-md"} hover:shadow-lg transition-all`}
        >
          {voiceEnabled ? <Volume2 size={36} className="text-primary" /> : <VolumeX size={36} className="text-gray-400" />}
        </button>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex flex-col items-center justify-center p-8 z-10">
        <div className="text-center mb-12 animate-slide-up">
          {/* Animated Flag Emoji */}
          <div className="relative inline-block mb-6">
            <div className={`text-9xl ${isHovered ? 'animate-bounce-slow' : ''} transition-all duration-300`}>🇮🇳</div>
            <div className="absolute -top-2 -right-2">
              <Sparkles size={40} className={highContrast ? "text-yellow-400" : "text-accent"} />
            </div>
          </div>
          
          {/* Main Title with Gradient */}
          <h1 className={`${highContrast ? 'text-white' : 'text-gradient'} font-extrabold mb-4`} style={{ fontSize: 80 * fontScale, textShadow: highContrast ? 'none' : '2px 2px 4px rgba(0,0,0,0.1)' }}>
            SUVIDHA ONE
          </h1>
          
          {/* Tagline */}
          <div className="space-y-2">
            <p className={accentColor} style={{ fontSize: 40 * fontScale, fontWeight: 600 }}>
              "One Kiosk, All Services"
            </p>
            <p className={highContrast ? "text-gray-400" : "text-text-secondary"} style={{ fontSize: 36 * fontScale }}>
              "सुविधा सबके लिए"
            </p>
          </div>

          {/* Feature Pills */}
          {!highContrast && (
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium" style={{ fontSize: 20 * fontScale }}>
                ⚡ Fast Service
              </span>
              <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium" style={{ fontSize: 20 * fontScale }}>
                🔒 Secure
              </span>
              <span className="bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-medium" style={{ fontSize: 20 * fontScale }}>
                🌐 10+ Languages
              </span>
            </div>
          )}
        </div>

        {/* Touch to Start Button */}
        <button
          onClick={handleStart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative group px-20 py-10 rounded-3xl font-extrabold text-white text-4xl transition-all duration-300 transform ${
            highContrast 
              ? 'bg-yellow-600 hover:bg-yellow-500' 
              : 'bg-gradient-accent hover:shadow-2xl'
          } ${isHovered ? 'scale-105' : 'scale-100'} animate-pulse-slow`}
          style={{ fontSize: 40 * fontScale, minWidth: 400 }}
        >
          <span className="flex items-center gap-4">
            <Sparkles size={40} />
            {t("touchToStart")}
            <Sparkles size={40} />
          </span>
          {/* Shine effect */}
          {!highContrast && (
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          )}
        </button>

        <p className={`mt-8 ${highContrast ? "text-gray-400" : "text-text-secondary"}`} style={{ fontSize: 26 * fontScale }}>
          👆 {highContrast ? 'Tap to begin' : 'Tap anywhere to begin your journey'}
        </p>
      </main>

      {/* Footer */}
      <footer className={`relative p-6 text-center z-10 ${highContrast ? "text-gray-400" : "text-text-muted"}`} style={{ fontSize: 20 * fontScale }}>
        <div className="flex justify-center gap-4 mb-2">
          <span>🇮🇳</span>
          <span>Digital India</span>
          <span>•</span>
          <span>Smart City Mission</span>
          <span>•</span>
          <span>Ek Bharat Shreshtha Bharat</span>
        </div>
        <p style={{ fontSize: 18 * fontScale }}>Made with ❤️ for India</p>
      </footer>
    </div>
  );
}
