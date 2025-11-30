/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gstore: {
          blue: '#3A6FF8',
          midnight: '#0C1220',
          gold: '#F5C96B',
          silver: '#DDE2E9',
        }
      }
    },
  },
  plugins: [],
}