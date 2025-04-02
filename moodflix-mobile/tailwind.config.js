/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: "#0D0707",
        "rich-blue": "#11151C",
        "eerie-black": "#252422",
        "black-olive": "#403D39",
        timberwolf: "#CCC5B9",
        "floral-white": "#FFFCF2",
        bole: "#7C4B4A",
        jasper: "#D66853",
        "pigment-green": "#0A993C",
      },
      fontFamily: {
        outfitRegular: ["Outfit-Regular", "sans-serif"],
        outfitBold: ["Outfit-Bold", "sans-serif"],
        outfitLight: ["Outfit-Light", "sans-serif"],
        outfitBlack: ["Outfit-Black", "sans-serif"],
        outfitSemiBold: ["Outfit-SemiBold", "sans-serif"],
        outfitThin: ["Outfit-Thin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
