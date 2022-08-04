/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      borderRadius: {
        primary: "25px",
      },
      colors: {
        dark_text: "#1C1C1C",
        light_bg: "#F3F3F3",
        dark_bg: "#212226",
        spearmint: "#D2EAE4",
        lavender: "#D7D2EA",
        grey: "#a5a5a5",
      },
      fontFamily: {
        work: ["Work Sans", "sans-serif"],
      },
      fontWeight: {
        light: 326,
      },
      transitionTimingFunction: {
        "in-out-circ": "cubic-bezier(0.85, 0, 0.15, 1)",
      },
      spacing: {
        primary: "1.25rem",
        switch: "4.68rem",
      },
    },
  },
  plugins: [],
}
