/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: "#0D0707",
        richBlue: "#11151C",
        eerieBlack: "#252422",
        blackOlive: "#403D39",
        timberwolf: "#CCC5B9",
        floralWhite: "#FFFCF2",
        bole: "#7C4B4A",
        jasper: "#D66853",
        pigmentGreen: "#0A993C",
        coral: "#FF794D",
        prussianBlue: "#212D40",
        raisinBlack: "#19212E",
      },
      fontFamily: {
        outfitRegular: ["Outfit-Regular", "sans-serif"],
        outfitBold: ["Outfit-Bold", "sans-serif"],
        outfitLight: ["Outfit-Light", "sans-serif"],
        outfitBlack: ["Outfit-Black", "sans-serif"],
        outfitSemiBold: ["Outfit-SemiBold", "sans-serif"],
        outfitThin: ["Outfit-Thin", "sans-serif"],
        spaceGroteskRegular: ["SpaceGrotesk-Regular", "sans-serif"],
        spaceGroteskBold: ["SpaceGrotesk-Bold", "sans-serif"],
        spaceGroteskLight: ["SpaceGrotesk-Light", "sans-serif"],
      },
    },
  },
  plugins: [],
};
