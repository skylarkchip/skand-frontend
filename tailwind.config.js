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
        "custom-black": "#0E0C0C",
        "custom-gray": "#86797D",
        "custom-light-gray": "#C4BBBE",
        "custom-off-white": "#F3F1F2",
        "custom-pink": "#DF2060",
        "custom-dark-pink": "#E5447A",
        "custom-light-pink": "#DCD6D8",
      },
      fontFamily: {
        primary: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
