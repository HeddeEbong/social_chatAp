/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        '20':"repeat(20,minmax(0,1.5fr))"
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
      colors: {
        primary: "#209cee"
      },
      gridColumn:{ "19":"span 10"}
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
