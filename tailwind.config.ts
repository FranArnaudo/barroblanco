import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "2/3": "66%",
        "3/4": "75%",
        "5/6": "83%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-main": "#f7c6f0",
        "primary-dark": "#de99d5",
        "primary-light": "#ffe3fb",
        "danger-main": "#d4382c",
        "danger-dark": "#a82c23",
        "danger-light": "#ed574c",
      },
    },
  },
  plugins: [],
};
export default config;
