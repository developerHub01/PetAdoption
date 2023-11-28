import { primaryColor, secondaryColor } from "./src/constant/constant";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
      },
      fontFamily: {
        primaryFont: ["Poppins", "sans - serif"],
      },
    },
  },
  plugins: [],
};
