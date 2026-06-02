/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'oseor-blue': '#036eb1',
        'oseor-red': '#ae151e',
        'oseor-violet': '#6b21a8', // base for blue-violet gradient
        'oseor-gray-light': '#f8f9fa',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
