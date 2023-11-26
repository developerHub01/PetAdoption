/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#422925",
        secondaryColor: "#ffffff",
      },
      fontFamily: {
        primaryFont: ["Poppins", "sans - serif"],
      },
    },
  },
  plugins: [],
};
