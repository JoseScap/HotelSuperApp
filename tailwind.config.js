const defaultConfig = require("./app/config/hotelConfig.json")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: defaultConfig.branding.colors.primary,
        secondary: defaultConfig.branding.colors.secondary,
        text: {
          primary: defaultConfig.branding.colors.text.primary,
          secondary: defaultConfig.branding.colors.text.secondary,
        },
        background: {
          primary: defaultConfig.branding.colors.background.primary,
          secondary: defaultConfig.branding.colors.background.secondary,
        },
      },
    },
  },
}
