"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-xl text-gray-600 mb-8">There was an error loading the application.</p>
        <button
          onClick={() => reset()}
          className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-xl"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
