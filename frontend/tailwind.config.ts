import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "hsl(40 38% 93%)",          // Crème
        fg: "hsl(193 57% 27%)",         // Sarcelle
        primary: "hsl(193 57% 27%)",    // Sarcelle
        secondary: "hsl(195 56% 78%)",  // Bleu doux
        accent: "hsl(19 74% 64%)",      // Orange chaud
        muted: "hsl(40 38% 96%)",       // Crème plus clair
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 4px 16px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
