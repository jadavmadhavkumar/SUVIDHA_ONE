"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAppStore } from "@/store";
import { translations } from "./translations";
import { api, API_BASE_URL } from "@/lib/api";

const LANGUAGE_MAP: Record<string, string> = {
  hi: "hi-IN",
  en: "en-US",
  ta: "ta-IN",
  bn: "bn-IN",
  te: "te-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  mr: "mr-IN",
  gu: "gu-IN",
  pa: "pa-IN",
};

export function useTranslation() {
  const language = useAppStore((state) => state.language);
  const voiceEnabled = useAppStore((state) => state.voiceEnabled);
  const [useBackendTts, setUseBackendTts] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
          setUseBackendTts(true);
        }
      } catch {
        setUseBackendTts(false);
      }
    };
    checkBackend();
  }, []);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"][key] || key;
  };

  const speak = useCallback(async (text: string) => {
    if (!voiceEnabled || typeof window === "undefined") return;

    if (useBackendTts) {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
        }

        const response = await api.tts.synthesize(text, LANGUAGE_MAP[language] || "hi-IN");
        if (response.success && response.data?.audio_url) {
          audioRef.current = new Audio(response.data.audio_url);
          await audioRef.current.play();
        } else {
          fallbackToBrowserTts(text);
        }
      } catch {
        fallbackToBrowserTts(text);
      }
    } else {
      fallbackToBrowserTts(text);
    }
  }, [voiceEnabled, language, useBackendTts]);

  const fallbackToBrowserTts = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_MAP[language] || "hi-IN";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
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
