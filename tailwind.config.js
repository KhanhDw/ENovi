/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        signika: ["signika"], // Thêm font
      },
    },
  },
  plugins: [],
};

// bulid new font: npx tailwindcss -i ./src/styles.css -o ./src/stylesCustom.css --watch
