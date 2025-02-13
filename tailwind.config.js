/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        'midnight': '#303947',
        'teal':'#1CB9B4',
        'coral':'#F8C2B3',
        'grey-300':'#C5C9CF',
        'purple':'#5A5FBC',
        'grey':'#626875',
        'grey-outline':'#E0E2E5',
        'teal-300':'#059794'
      }
    },
  },
  plugins: [],
}

