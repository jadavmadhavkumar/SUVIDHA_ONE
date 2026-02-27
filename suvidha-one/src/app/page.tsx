"use client";

import { AppContent } from "@/components/AppContent";
import { useEffect, useState } from "react";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setIsLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-xl text-gray-600">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-4 bg-accent text-white px-8 py-4 rounded-xl font-bold text-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-8xl mb-4 animate-pulse">🇮🇳</div>
          <h1 className="text-4xl font-bold text-primary mb-2">SUVIDHA ONE</h1>
          <p className="text-xl text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  try {
    return <AppContent />;
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-xl text-gray-600">
            {err instanceof Error ? err.message : "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-accent text-white px-8 py-4 rounded-xl font-bold text-xl"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}
