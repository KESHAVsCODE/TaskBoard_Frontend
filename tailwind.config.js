/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        extraLightBlack: "#262629",
        lightBlack: "#1e1e21",
        mediumBlack: "#1a1a1e",
        darkBlack: "#0f0f10",
        lightGray: "#607274",
      },
      borderColor: {
        lightGray: "#444",
      },
      textColor: {
        lightGray: "#c1c1c2",
        darkGray: "#666",
      },
      boxShadow: {
        focusInputBoxShadow: "0 0 3px 2px rgb(228 121 17 / 50%)",
      },
    },
  },
  plugins: [],
};
