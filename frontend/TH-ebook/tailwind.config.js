/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT"
const config = {
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

export default withMT(config);
