/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      colors: {
        p: {
          // DEFAULT: "#ae3d64",
          primary: "#461dd3", //white use for userfirst action//most prominent,importance.important actions,high emphasis btns,fab
          primaryContaine: "#634caf", //white, not use for user first action ,but to standout fill color against surface as its one of key components
          secondary: "#a096cc", //black //less prominent like mobile,sidebar nav bg
          surface: "#d9d4ee", //card surface,black text
          surface2: "#ead5e1",
          surface3: "#cdd9b1",
          surface4: "#6cb196",
          surface5: "#abc578",
          decorate: "#93769e",
          surface6: "#87d0b7",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "2rem",
          xl: "3rem",
        },
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "14000px",
      },
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false
  }
};
