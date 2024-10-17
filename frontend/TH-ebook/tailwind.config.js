/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "custom-xl": "4.5rem", // Thêm kích thước font 4.5rem
      },
      colors: {
        "custom-orange": "rgb(255, 103, 64)",
      },
    },
  },
  plugins: [],
};
