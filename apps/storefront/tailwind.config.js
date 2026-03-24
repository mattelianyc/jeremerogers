/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "../../packages/ui/src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Times New Roman", "Times", "serif"]
      },
      letterSpacing: {
        luxury: "0.2em"
      }
    }
  },
  plugins: []
};
