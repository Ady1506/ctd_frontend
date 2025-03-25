/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lblue:'#E4E9F0',
        dblue:'#173061'
      },
      fontFamily: {
        custom: ['DM Sans', 'sans-serif'], // Replace 'Roboto' with your font name
      },
    },
  },
  
}