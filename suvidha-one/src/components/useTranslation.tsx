"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import { translations } from "./translations";

export function useTranslation() {
  const language = useAppStore((state) => state.language);
  const voiceEnabled = useAppStore((state) => state.voiceEnabled);
  
  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"][key] || key;
  };
  
  const speak = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined") return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "hi" ? "hi-IN" : language === "ta" ? "ta-IN" : language === "bn" ? "bn-IN" : "en-IN";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };
  
  const stopSpeaking = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
  };
  
  return { t, speak, stopSpeaking, language };
}

export function useVoiceAnnounce(screenKey: string) {
  const { speak, language } = useTranslation();
  const voiceEnabled = useAppStore((state) => state.voiceEnabled);
  const announced = useRef(false);
  
  useEffect(() => {
    if (voiceEnabled && !announced.current) {
      const text = translations[language]?.[`announce_${screenKey}`] || translations[language]?.welcome || "";
      if (text) {
        speak(text);
      }
      announced.current = true;
    }
    
    return () => {
      announced.current = false;
    };
  }, [screenKey, voiceEnabled, language, speak]);
}
