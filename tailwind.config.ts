/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "light",
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        screen: "100vw",
      },
    },
  },
};
