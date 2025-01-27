/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#72bf6a",
          100: "#ececa3",
          300: "#b5e550",
          500: "#abc32f",
          700: "#809c13",
          900: "#607c3c",
        },
        secondary: {
          DEFAULT: "#FFFF00",
          100: "#bbdffb",
          200: "#90cbf9",
          300: "#64b7f6",
          400: "#41a7f5",
          500: "#1e97f3",
          600: "#1a8ae5",
          700: "#1477d2",
          800: "#1065c0",
          900: "#0747a1",
        },
        tertiary: "#FFbf00",
      },
    },
  },
  plugins: [],
};
