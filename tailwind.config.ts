import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import radix from "tailwindcss-radix";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      animation: {
        "fade-in": "fade 0.1s ease forwards",
        "fade-out": "fade 0.1s ease reverse",
        "scale-in": "scale 0.1s ease forwards",
        "scale-out": "scale 0.1s ease reverse",
        "slide-in": "slide 0.1s ease forwards",
        "slide-out": "slide 0.1s ease reverse",
        tooltip: "fade 0.1s ease forwards, slide 0.1s ease forwards",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scale: {
          "0%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        slide: {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [radix, typography],
} satisfies Config;
