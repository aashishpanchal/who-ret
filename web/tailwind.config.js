/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: "Inter",
        Poppins: "Poppins",
      },
      colors: {
        sidebar: "#28243d",
        primary: ["#ff2d24", "#ff7e14"],
      },
    },
  },
  plugins: [],
};
