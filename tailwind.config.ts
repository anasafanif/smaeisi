import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        surface: "#E5E5E5",
        border: "#27272A",
        primary: {
          DEFAULT: "#c98756",
          bright: "#e8b896",
          deep: "#8b5a2b",
        },
        accent: "#d4a574",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        arabic: ["var(--font-arabic)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
