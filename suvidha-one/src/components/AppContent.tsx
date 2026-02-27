"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { LanguageScreen } from "@/components/LanguageScreen";
import { AuthScreen } from "@/components/AuthScreen";
import { DashboardScreen } from "@/components/DashboardScreen";
import { BillsScreen } from "@/components/BillsScreen";
import { PaymentModeScreen } from "@/components/PaymentModeScreen";
import { PaymentProcessingScreen } from "@/components/PaymentScreen";
import { GrievanceScreen } from "@/components/GrievanceScreen";
import { SettingsScreen } from "@/components/SettingsScreen";
import { HistoryScreen } from "@/components/HistoryScreen";

function CertificatesScreen() {
  const { certificates, setCurrentScreen, fontScale } = useAppStore();
  const highContrast = useAppStore((state) => state.highContrast);
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col`}>
      <header className={`p-4 border-b ${highContrast ? "border-gray-700" : "border-gray-200"}`}>
        <button
          onClick={() => setCurrentScreen("dashboard")}
          className={`p-3 rounded-lg ${highContrast ? "bg-gray-800" : "bg-background-light"}`}
        >
          ← Back
        </button>
      </header>
      
      <main className="flex-1 p-6">
        <h1 className={`${textColor} font-bold mb-6`} style={{ fontSize: 40 * fontScale }}>
          Certificates / प्रमाण पत्र
        </h1>
        
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div key={cert.id} className={`${highContrast ? "bg-gray-800" : "bg-background-light"} p-5 rounded-xl`}>
              <div className="flex justify-between items-start mb-2">
                <p className={textColor} style={{ fontSize: 24 * fontScale, fontWeight: 600 }}>
                  {cert.typeHindi}
                </p>
                <span className={`px-3 py-1 rounded-full text-white text-sm ${
                  cert.status === "processing" ? "bg-yellow-500" : 
                  cert.status === "issued" ? "bg-green-600" : "bg-gray-500"
                }`}>
                  {cert.status}
                </span>
              </div>
              <p className={subTextColor} style={{ fontSize: 18 * fontScale }}>
                Application: {cert.applicationNumber}
              </p>
              <p className={subTextColor} style={{ fontSize: 18 * fontScale }}>
                Date: {cert.createdAt}
              </p>
            </div>
          ))}
        </div>
        
        <button
          className={`w-full mt-6 py-5 rounded-xl font-bold text-white ${
            highContrast ? "bg-yellow-600" : "bg-orange-500"
          }`}
          style={{ fontSize: 24 * fontScale }}
        >
          Apply for Certificate / आवेदन करें
        </button>
      </main>
    </div>
  );
}

function HelpScreen() {
  const { setCurrentScreen, fontScale } = useAppStore();
  const highContrast = useAppStore((state) => state.highContrast);
  
  const bgColor = highContrast ? "bg-black" : "bg-white";
  const textColor = highContrast ? "text-white" : "text-text-primary";
  const subTextColor = highContrast ? "text-gray-400" : "text-text-secondary";
  
  return (
    <div className={`${bgColor} min-h-screen flex flex-col`}>
      <header className={`p-4 border-b ${highContrast ? "border-gray-700" : "border-gray-200"}`}>
        <button
          onClick={() => setCurrentScreen("dashboard")}
          className={`p-3 rounded-lg ${highContrast ? "bg-gray-800" : "bg-background-light"}`}
        >
          ← Back
        </button>
      </header>
      
      <main className="flex-1 p-6">
        <h1 className={`${textColor} font-bold mb-6`} style={{ fontSize: 40 * fontScale }}>
          Help / मदद
        </h1>
        
        <div className={`${highContrast ? "bg-gray-800" : "bg-background-light"} p-6 rounded-xl`}>
          <p className={textColor} style={{ fontSize: 24 * fontScale }}>
            For assistance, please contact the helpdesk or speak to a representative.
          </p>
          <p className={`${subTextColor} mt-4`} style={{ fontSize: 20 * fontScale }}>
            सहायता के लिए, कृपया हेल्पडेस्क से संपर्क करें।
          </p>
        </div>
      </main>
    </div>
  );
}

export function AppContent() {
  const [error, setError] = useState<string | null>(null);

  const currentScreen = useAppStore((state) => state.currentScreen);
  const fontScale = useAppStore((state) => state.fontScale);
  const highContrast = useAppStore((state) => state.highContrast);
  
  useEffect(() => {
    try {
      // Initialize app state
    } catch (err) {
      console.error("AppContent initialization error:", err);
    }
  }, []);
  
  const renderScreen = () => {
    try {
      switch (currentScreen) {
        case "welcome":
          return <WelcomeScreen />;
        case "language":
          return <LanguageScreen />;
        case "auth":
          return <AuthScreen />;
        case "dashboard":
          return <DashboardScreen />;
        case "bills":
          return <BillsScreen />;
        case "payment-mode":
          return <PaymentModeScreen />;
        case "payment-processing":
          return <PaymentProcessingScreen />;
        case "grievance":
          return <GrievanceScreen />;
        case "settings":
          return <SettingsScreen />;
        case "certificates":
          return <CertificatesScreen />;
        case "history":
          return <HistoryScreen />;
        case "help":
          return <HelpScreen />;
        default:
          return <WelcomeScreen />;
      }
    } catch (renderError) {
      console.error("Screen rendering error:", renderError);
      return <WelcomeScreen />;
    }
  };
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-xl text-gray-600">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-4 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  try {
    return (
      <div 
        className={`${highContrast ? "bg-black" : "bg-white"}`}
        style={{ 
          fontSize: `${fontScale}rem`,
          minHeight: "100vh"
        }}
      >
        {renderScreen()}
      </div>
    );
  } catch (err) {
    console.error("AppContent error:", err);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-xl text-gray-600">
            {err instanceof Error ? err.message : "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-xl"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
