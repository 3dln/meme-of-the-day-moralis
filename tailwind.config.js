module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        motdoffwhite: "#F9F9F9",
        motdgrey: "#A0A0A0",
        motdblack: "#000000",
        motdblue: "#40FFFD",
        motdgreen: "#2AFD64",
        motdyellow: "#FFFB4E",
        motdorange: "#FD7822",
        motdred: "#FF0000",
        motdpink: "#FD22D2",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        ssp: ["Source Sans Pro", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
