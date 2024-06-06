import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "green": {
          primary: "#25CB62",
          secondary: "#1DAA61",
        },
        "gray": {
          dark: "#202020",
          normal: "#2c2c2c",
          light: "rgb(60,60,60)",
        },
        white: "rgb(245,245,245)",
      },
    },
  },
  plugins: [],
};
export default config;
