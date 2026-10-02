import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        ink: {
          950: "#070d1c",
          900: "#0b1530",
          800: "#12204a",
          700: "#1c2d5e",
          600: "#2d4079",
        },
        paper: { DEFAULT: "#f7f5f0", 50: "#fbfaf7", 100: "#f2efe8", 200: "#e6e1d6" },
        teal: {
          50: "#ecfaf6",
          100: "#cff2e8",
          300: "#6fd3bb",
          400: "#35b99b",
          500: "#1a9c80",
          600: "#127d67",
          700: "#0f6454",
          800: "#0d4f43",
        },
        gold: { 300: "#e6cf8f", 400: "#d6b664", 500: "#b8963f", 600: "#8f7330", 700: "#6b5522" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: { eyebrow: "0.18em" },
      boxShadow: {
        soft: "0 1px 2px rgba(11,21,48,.04), 0 8px 24px -12px rgba(11,21,48,.12)",
        lift: "0 2px 4px rgba(11,21,48,.05), 0 24px 48px -20px rgba(11,21,48,.25)",
      },
    },
  },
  plugins: [],
};
export default config;
