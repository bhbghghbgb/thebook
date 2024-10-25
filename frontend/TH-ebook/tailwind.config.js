/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT"
import {requirePropFactory} from "@mui/material";
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

      gridTemplateAreas: {
        'product-detail': [
          'left cover   facing  right',
          'left cover   buttons right',
          'left cover   tags    right',
          'left cover   scores  right',
          'left desc    desc    right',
          'left info    chapter right',
        ],
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@savvywombat/tailwindcss-grid-areas'),
  ],
  variants: {
    gridTemplateAreas: ['responsive'],
  },
};

export default withMT(config);
