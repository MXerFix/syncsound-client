/** @type {import('tailwindcss').Config} */
const { violet, blackA, mauve, green } = require('@radix-ui/colors');
const colors = require("tailwindcss/colors");
// const spacing = require('tailwindcss/scripts/')

const Sizes = count => {
  const result = {};
  for (let i = 2; i <= count; i += 2) {
    result[`${i}`] = `${i}px`;
  }
  return result;
};

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src//UI/**/*.{js,ts,jsx,tsx,mdx}",
    "./build/*.html",
  ],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
    colors: {
      ...colors,
      333: "#333",
      f9f9f9: "f9f9f9",
    },
    fontSize: {
      ...Sizes(128),
    },
  },
  plugins: [],
};
