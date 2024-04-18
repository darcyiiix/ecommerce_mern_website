/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    
    extend: {
      
      colors: 
    {
      primary: '#7DA177',
      primary_dark: '#5C7C5B',
      primary_grey: '#f3f3f3',
      secondary_grey: '#EBEAEA'
    },
    },
  },
  plugins: [
  require("daisyui"),
  require('flowbite/plugin'),
],
}

