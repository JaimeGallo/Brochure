/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jega-blue-dark': '#0f2a4a',
        'jega-blue-medium': '#1a3d6b',
        'jega-blue-light': '#2c5aa0',
        'jega-gray-light': '#f8f9fa',
        'jega-gold': '#d4af37',
        'jega-gold-light': '#f4d03f',
      }
    },
  },
  plugins: [],
}

