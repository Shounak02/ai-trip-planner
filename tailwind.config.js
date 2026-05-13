/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enable light/dark via .dark class
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      // Optional extra SaaS-style colors
      colors: {
        brand: {
          DEFAULT: "oklch(0.5799 0.1448 153.76)",
          dark: "oklch(0.279 0.041 260.031)",
        },
      },
      keyframes: {
        aurora: {
          "0%": { backgroundPosition: "0% 50%", transform: "rotate(-5deg) scale(0.9)" },
          "25%": { backgroundPosition: "50% 100%", transform: "rotate(5deg) scale(1.1)" },
          "50%": { backgroundPosition: "100% 50%", transform: "rotate(-3deg) scale(0.95)" },
          "75%": { backgroundPosition: "50% 0%", transform: "rotate(3deg) scale(1.05)" },
          "100%": { backgroundPosition: "0% 50%", transform: "rotate(-5deg) scale(0.9)" },
        },
      },
      animation: {
        aurora: "aurora 8s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
