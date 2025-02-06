/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{html,ts}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        signika: ["signika"], // Thêm font
      },
      keyframes: {
        expandFromLeft: {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
        expandFromRight: {
          "0%": { transform: "scaleX(0)", transformOrigin: "right" },
          "100%": { transform: "scaleX(1)", transformOrigin: "right" },
        },
        expandFromTop: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "100%": { transform: "scaleY(1)", transformOrigin: "top" },
        },
        expandFromBottom: {
          "0%": { transform: "scaleY(0)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(1)", transformOrigin: "bottom" },
        },
        collapseToLeft: {
          "0%": { transform: "scaleX(1)", transformOrigin: "left" },
          "100%": { transform: "scaleX(0)", transformOrigin: "left" },
        },
        collapseToRight: {
          "0%": { transform: "scaleX(1)", transformOrigin: "right" },
          "100%": { transform: "scaleX(0)", transformOrigin: "right" },
        },
        collapseToTop: {
          "0%": { transform: "scaleY(1)", transformOrigin: "top" },
          "100%": { transform: "scaleY(0)", transformOrigin: "top" },
        },
        collapseToBottom: {
          "0%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        "expand-from-top": "expandFromTop duration-300 ease-out forwards",
        "expand-from-bottom": "expandFromBottom duration-300 ease-out forwards",
        "expand-from-left": "expandFromLeft duration-300 ease-out forwards",
        "expand-from-right": "expandFromRight duration-300 ease-out forwards",

        "collapse-to-top": "collapseToTop duration-300 ease-out forwards",
        "collapse-to-bottom": "collapseToBottom duration-300 ease-out forwards",
        "collapse-to-left": "collapseToLeft duration-300 ease-out forwards",
        "collapse-to-right": "collapseToRight duration-300 ease-out forwards",
      },
    },
  },
  plugins: [],
};

// bulid new font: npx tailwindcss -i ./src/styles.css -o ./src/stylesCustom.css --watch
