import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out forwards",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-down": "fade-down 0.6s ease-out forwards",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-up": "slide-up 0.5s ease-out forwards",
        title: "title 0.8s ease-out forwards",
        "fade-left": "fade-left 0.8s ease-out forwards",
        "fade-right": "fade-right 0.8s ease-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "0.6" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        title: {
          "0%": { opacity: "0", "letter-spacing": "-0.05em" },
          "40%": { opacity: "0.8" },
          "100%": { opacity: "1", "letter-spacing": "0em" },
        },
        "fade-left": {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-right": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
