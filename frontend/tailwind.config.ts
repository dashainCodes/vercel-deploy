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
        // 10C6FF
        primary: {
          50: "#eafaff",
          100: "#bff0ff",
          150: "#95e6ff",
          200: "#6adcff",
          250: "#40d1ff",
          300: "#10C6FF",
          350: "#00b2ea",
          400: "#0092bf",
          450: "#007195",
          500: "#00516a",
          550: "#003140",
          600: "#001015",
        },

        secondary: {
          50: "#f4f4f4",
          100: "#dfdfdf",
          150: "#cacaca",
          200: "#b5b5b5",
          250: "#9f9f9f",
          300: "#8a8a8a",
          350: "#757575",
          400: "#606060",
          450: "#4a4a4a",
          500: "#353535",
          550: "#202020",
          600: "#0b0b0b",
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
