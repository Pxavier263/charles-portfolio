import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        /* Body text and dark neutrals (body text = #1B2A2F) */
        ink: {
          950: "#0B1A1F",
          900: "#1B2A2F",
          800: "#24373D",
          700: "#33494F",
          600: "#4A6168",
        },
        /* Cool background neutrals (page background = #F7F9F9) */
        paper: { DEFAULT: "#F7F9F9", 50: "#FBFCFC", 100: "#EEF3F4", 200: "#DFE7E9" },
        /* PRIMARY: Deep Teal (headers, nav, links) = teal-700 #0F4C5C */
        teal: {
          50: "#EAF3F5",
          100: "#D2E6EA",
          200: "#A9CFD8",
          300: "#7DB8C6",
          400: "#4A9AAD",
          500: "#23798E",
          600: "#155F71",
          700: "#0F4C5C",
          800: "#0B3C49",
          900: "#082E38",
        },
        /* ACCENT: Burnt Orange (buttons, highlights) = orange-500 #E36414 */
        orange: {
          50: "#FDF1E9",
          100: "#FBDDC8",
          300: "#F3A774",
          400: "#EC8240",
          500: "#E36414",
          600: "#C2530F",
          700: "#96400B",
          800: "#6E2F08",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: { eyebrow: "0.18em" },
      boxShadow: {
        soft: "0 1px 2px rgba(27,42,47,.04), 0 8px 24px -12px rgba(27,42,47,.12)",
        lift: "0 2px 4px rgba(27,42,47,.05), 0 24px 48px -20px rgba(27,42,47,.25)",
      },
    },
  },
  plugins: [],
};
export default config;
