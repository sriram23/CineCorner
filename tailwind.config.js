/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001f3f',
        secondary: '#00152a',
        light: '#00335f'
      },
    },
  },
  plugins: [],
}