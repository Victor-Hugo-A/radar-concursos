import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#bce0ff",
          300: "#8dccff",
          400: "#57aefa",
          500: "#2f8ee6",
          600: "#1d72c2",
          700: "#1b5d9d",
          800: "#1c4f82",
          900: "#1a436d"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
