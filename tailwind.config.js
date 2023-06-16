/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-down": {
          "0%": { top: "-100px" },
          "100%": { top: "12px" },
        },
      },
    },
  },
  plugins: [],
};
