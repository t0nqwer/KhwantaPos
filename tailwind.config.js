// /** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    letterSpacing: {
      normal: "0",
      wider: ".05em",
      widestt: ".4em",
      widest: ".5em",
    },

    extend: {
      fontFamily: {
        body: ["Noto Sans Thai", { fontFeatureSettings: '"cv11", "ss01"' }],
      },
      colors: {
        primary: "#111315",
        secondary: "#2d2d2d",
        neutral: colors.neutral,
        red: colors.red,
        white: colors.white,
        slate: colors.slate,
        black: colors.black,
        transparent: "transparent",
        green: colors.green,
        emerald: colors.emerald,
        primary2: "#242529",
        secondary2: "#36383e",
        third: "#dcdcdc",
        light: "#b0aca6",
        dark: "#27292d",
        highlight: "#d14a13",
      },
      zIndex: {
        100: "100",
        150: "150",
      },
      transitionProperty: {
        ...defaultTheme.transitionProperty,
        width: "width",
        height: "height",
      },
    },
  },

  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
};
