/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          neutral: "#FFFFFF",
          dark: "#272343",
          light: "#E3F6F5",
          primary: "#1BCCCC",
          "primary-active": "#0CAAAA",
          secondary: "#FFD803",
          "secondary-active": "#FFC803",
          tertiary: "#BAE8E8",
          "tertiary-active": "#7EDEDE",
          gray: "#DFDFDF",
          darkgray: "#CCCCCC"
        }
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
        voltaire: ["Voltaire", "sans-serif"]
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
