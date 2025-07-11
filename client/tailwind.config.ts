// tailwind.config.ts
import type { Config } from "tailwindcss";

export default{
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        courier: ['"Courier Prime"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;

