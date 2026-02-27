"use client";

import { useAppStore } from "@/store";
import { useTranslation } from "./useTranslation";
import { Header, BottomNav } from "./Header";
import { Volume2, VolumeX, Type, Eye } from "lucide-react";

export function SettingsScreen() {
  const { 
    fontScale, setFontScale, 
    highContrast, setHighContrast, 
    voiceEnabled, setVoiceEnabled,
    setCurrentScreen,
    logout
  } = useAppStore();
  const { t } = useTranslation();
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const cardBg = highContrast ? "bg-gray-800" : "bg-background-light";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  
  const fontSizes = [
    { scale: 1, label: "Normal", labelHindi: "सामान्य" },
    { scale: 1.3, label: "Large", labelHindi: "बड़ा" },
    { scale: 1.5, label: "Extra Large", labelHindi: "बहुत बड़ा" },
  ];
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col`}>
      <Header showBack onBack={() => setCurrentScreen("dashboard")} />
      
      <main className="flex-1 p-6 overflow-auto">
        <h1 className={`${textColor} font-bold mb-8`} style={{ fontSize: 40 * fontScale }}>
          {t("settings")}
        </h1>
        
        <div className="space-y-6">
          {/* Voice Guidance */}
          <div className={`${cardBg} p-6 rounded-xl`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {voiceEnabled ? (
                  <Volume2 size={40} className={textColor} />
                ) : (
                  <VolumeX size={40} className={textColor} />
                )}
                <div>
                  <p className={textColor} style={{ fontSize: 28 * fontScale }}>
                    {t("voiceGuidance")}
                  </p>
                  <p className={subTextColor} style={{ fontSize: 20 * fontScale }}>
                    वॉयस गाइडेंस
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`px-6 py-3 rounded-lg font-bold ${
                  voiceEnabled 
                    ? (highContrast ? "bg-yellow-600" : "bg-success") 
                    : (highContrast ? "bg-gray-600" : "bg-gray-400")
                } text-white`}
                style={{ fontSize: 20 * fontScale }}
              >
                {voiceEnabled ? t("on") : t("off")}
              </button>
            </div>
          </div>
          
          {/* Font Size */}
          <div className={`${cardBg} p-6 rounded-xl`}>
            <div className="flex items-center gap-4 mb-4">
              <Type size={40} className={textColor} />
              <div>
                <p className={textColor} style={{ fontSize: 28 * fontScale }}>
                  {t("fontSize")}
                </p>
                <p className={subTextColor} style={{ fontSize: 20 * fontScale }}>
                  फ़ॉन्ट आकार
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              {fontSizes.map((size) => (
                <button
                  key={size.scale}
                  onClick={() => setFontScale(size.scale)}
                  className={`flex-1 py-4 rounded-lg font-bold border-2 ${
                    fontScale === size.scale 
                      ? (highContrast ? "border-yellow-400 bg-gray-700" : "border-accent bg-accent/10")
                      : "border-transparent"
                  } ${textColor}`}
                  style={{ fontSize: 20 * fontScale }}
                >
                  <span style={{ fontSize: 24 * size.scale }}>A</span>
                  <br />
                  {size.labelHindi}
                </button>
              ))}
            </div>
          </div>
          
          {/* High Contrast */}
          <div className={`${cardBg} p-6 rounded-xl`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Eye size={40} className={textColor} />
                <div>
                  <p className={textColor} style={{ fontSize: 28 * fontScale }}>
                    {t("highContrastMode")}
                  </p>
                  <p className={subTextColor} style={{ fontSize: 20 * fontScale }}>
                    हाई कॉन्ट्रास्ट मोड
                  </p>
                </div>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`px-6 py-3 rounded-lg font-bold ${
                  highContrast 
                    ? (highContrast ? "bg-yellow-600" : "bg-success") 
                    : (highContrast ? "bg-gray-600" : "bg-gray-400")
                } text-white`}
                style={{ fontSize: 20 * fontScale }}
              >
                {highContrast ? t("on") : t("off")}
              </button>
            </div>
            <p className={`${subTextColor} mt-2`} style={{ fontSize: 18 * fontScale }}>
              Black background, white text
            </p>
          </div>
          
          {/* Logout */}
          <button
            onClick={logout}
            className={`w-full py-6 rounded-xl font-bold border-2 ${
              highContrast 
                ? "border-red-600 text-red-500" 
                : "border-error text-error"
            }`}
            style={{ fontSize: 28 * fontScale }}
          >
            {t("logout")}
          </button>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
