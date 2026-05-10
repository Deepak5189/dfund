import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        serif:   ["var(--font-playfair)", "Playfair Display", "serif"],
        mono:    ["var(--font-dm-mono)", "DM Mono", "monospace"],
      },
      colors: {
        cream:       "#F7F3ED",
        "warm-white":"#FDFAF6",
        ink:         "#1A1410",
        "ink-soft":  "#3D322A",
        amber:       "#E8820C",
        "amber-light":"#F5A640",
        "amber-pale": "#FEF0DC",
        sage:        "#4A6741",
        "sage-light":"#EBF0E8",
        rust:        "#C0442A",
        border:      "#E2D9CC",
        muted:       "#8A7B6E",
      },
      spacing: {
        15: "60px", // matches original 60px horizontal padding
        13: "52px",
      },
      animation: {
        "fade-up":       "fadeUp 0.6s ease both",
        "line-grow":     "lineGrow 0.8s ease forwards",
        "progress-grow": "progressGrow 1.2s 1s ease both",
        float:           "floatUp 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        lineGrow: {
          from: { transform: "scaleX(0)" },
          to:   { transform: "scaleX(1)" },
        },
        progressGrow: {
          from: { transform: "scaleX(0)" },
          to:   { transform: "scaleX(1)" },
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;