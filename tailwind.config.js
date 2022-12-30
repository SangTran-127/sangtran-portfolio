/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#f8f8f2",
            maxWidth: "100%",
            p: {
              color: "#f8f8f2",
            },
            h2: {
              color: "f8f8f2",
              fontWeight: "bold",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwind-dracula")("dracula", true),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
