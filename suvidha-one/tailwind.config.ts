import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A3C8F",
        accent: "#FF6600",
        success: "#217346",
        error: "#C0392B",
        background: "#FFFFFF",
        "background-light": "#F5F5F5",
        "text-primary": "#333333",
        "text-secondary": "#666666",
        "high-contrast-bg": "#000000",
        "high-contrast-text": "#FFFFFF",
      },
      fontFamily: {
        noto: ["Noto Sans", "Noto Sans Devanagari", "Roboto", "Arial", "sans-serif"],
      },
      fontSize: {
        hero: ["72px", { lineHeight: "1.2" }],
        h1: ["60px", { lineHeight: "1.3" }],
        h2: ["48px", { lineHeight: "1.4" }],
        body: ["48px", { lineHeight: "1.5" }],
        button: ["56px", { lineHeight: "1.2" }],
        input: ["48px", { lineHeight: "1.4" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      minHeight: {
        "screen-kiosk": "100vh",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 1.5s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
