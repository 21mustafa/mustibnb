/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#268bfc',
        secondary: '#dae4f3'
      }
    },
  },
  plugins: [],
}

