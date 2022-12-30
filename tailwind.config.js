/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        twitterColor:"#00ADED",
        fontColor:"#0F1419",
        grayColor:"#536471"

      }
    },
    
  },
  plugins: [],
}
