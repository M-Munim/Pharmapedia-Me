/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // next ui
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "15px",
      },

      colors: {
        blue: "#2980B9",
        blue_sec: "#438AB8",
        borderBlue: "#2AA7FF",
        hover_blue: "#297AAF",
        hover_blue2: "#64C2FF",
        darkblue: "#2980B9",
        pClr: "#6C6C72",
        bg_1: "#FAFBFF",
        heading_blue: "#0A64B3",
        t_grey: "#707070",
        lightBlue: "#33ABFF",
        footerGrey: "#A0A0A0",
        facebook: "#3B5998",
        twitter: "#00ACED",
        pintrest: "#CC232A",
        prodclr1: "#5C5E6E",
        prodclr2: "#756F6F",
        greyBg: "#F2F2F2"
      },
      gradients: {
      },
      navWidth: {
        width: "400px"
      }

    },
  },
  // next ui
  darkMode: "class",
  plugins: [nextui()],
};
