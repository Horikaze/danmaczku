/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#272A33",
        card: "#3D4351",
        content: "#5B647D",
        text: "#E0E0E0",
        button: "#FF7324",
        navbar: "#1f2229"
      },
    },
  },
  plugins: [],
};
