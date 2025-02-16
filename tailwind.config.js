/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./index.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        error: "#dc2626",
        background: "#ffffff",
        text: "#1f2937",
        textDim: "#6b7280",
        palette: {
          neutral100: "#ffffff",
          neutral200: "#f4f4f5",
          neutral300: "#d4d4d8",
          neutral400: "#a1a1aa",
          neutral700: "#3f3f46",
          neutral800: "#27272a",
        },
      },
      spacing: {
        "xxs": 2,
        "xs": 4,
        "sm": 8,
        "md": 12,
        "lg": 16,
        "xl": 24,
        "xxl": 32,
        "2xl": 48,
      },
    },
  },
  plugins: [],
}
