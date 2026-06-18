import type { Config } from "tailwindcss";
import { colors, fonts } from "./styles/theme"; // Adjust path if necessary

const config: Config = {
  // Update content paths for Next.js App Router
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Keep this if you have other folders inside src/
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: colors.orange.primary,
        },
        black: {
          primary: colors.black.primary,
        },
        grey: {
          dark: colors.grey.dark,
        },
        white: {
          primary: colors.white.primary,
        },
      },
      fontFamily: {
        // These now point to the highly-optimized next/font variables
        poppins: [fonts.heading, "sans-serif"],
        inter: [fonts.body, "sans-serif"],
        mono: [fonts.mono, "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;