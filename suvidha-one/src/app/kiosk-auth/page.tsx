"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneScreen,
  SuccessScreen,
  ErrorScreen,
  LanguageToggle,
} from "@/components/kiosk";
import { useKioskMode } from "@/hooks/useKioskMode";
import { useAppStore } from "@/store";

type AuthStep = "phone" | "success" | "error";

export default function KioskAuthPage() {
  const [step, setStep] = useState<AuthStep>("phone");
  const [highContrast, setHighContrast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { language, setLanguage } = useAppStore();
  useKioskMode({
    autoFullscreen: true,
    wakeLock: true,
  });

  const { login } = useAppStore();

  // Handle phone submission
  const handlePhoneSubmit = useCallback(
    async (phoneNumber: string) => {
      try {
        setLoading(true);
        setError(null);
        login("guest", {
          id: `guest_${Date.now()}`,
          name: "Test User",
          mobile: phoneNumber,
        });
        localStorage.setItem("access_token", `test_token_${Date.now()}`);
        localStorage.setItem("refresh_token", `test_refresh_${Date.now()}`);
        setStep("success");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to continue");
        setStep("error");
      } finally {
        setLoading(false);
      }
    },
    [login]
  );

  // Handle back navigation
  const handleBack = useCallback(() => {
    setError(null);
    setStep("phone");
  }, []);

  // Handle success continuation
  const handleSuccess = useCallback(() => {
    // Navigate to dashboard or home
    console.log("Authentication successful");
  }, []);

  // Handle go home
  const handleHome = useCallback(() => {
    // Navigate to dashboard
    console.log("Going to dashboard");
  }, []);

  // Handle retry from error
  const handleRetry = useCallback(() => {
    setError(null);
    setStep("phone");
  }, []);

  // Toggle language
  const handleToggleLanguage = useCallback(() => {
    const nextLang = language === "hi" ? "en" : "hi";
    setLanguage(nextLang);
  }, [language, setLanguage]);

  return (
    <div className={`min-h-screen ${highContrast ? "high-contrast" : ""}`}>
      {/* Language toggle - always visible */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle
          currentLanguage={language}
          onToggle={handleToggleLanguage}
          highContrast={highContrast}
        />
      </div>

      {/* High contrast toggle */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`p-4 rounded-full ${
            highContrast ? "bg-yellow-600" : "bg-gray-800"
          } text-white`}
          aria-label="Toggle High Contrast"
        >
          {highContrast ? "◐" : "◑"}
        </button>
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {step === "phone" && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <PhoneScreen
              onPhoneSubmit={handlePhoneSubmit}
              onBack={handleBack}
              loading={loading}
              error={error}
              highContrast={highContrast}
            />
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <SuccessScreen
              onSuccess={handleSuccess}
              onHome={handleHome}
              highContrast={highContrast}
              autoHomeDelay={5000}
            />
          </motion.div>
        )}

        {step === "error" && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ErrorScreen
              message={error}
              onRetry={handleRetry}
              onHome={handleHome}
              highContrast={highContrast}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-r from-primary to-accent text-white">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xl">Service Online</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl">🇮🇳 Digital India</span>
          <span className="text-xl">|</span>
          <span className="text-xl">SUVIDHA ONE</span>
        </div>
      </div>
    </div>
  );
}
