/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
      "./app/**/*.{ts,tsx,js,jsx}",
      "./components/**/*.{ts,tsx,js,jsx}",
      "./lib/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
          colors: {
            bg: "hsl(40 38% 93%)",
            fg: "hsl(193 57% 27%)",
            primary: "hsl(193 57% 27%)",
            secondary: "hsl(195 56% 78%)",
            accent: "hsl(19 74% 64%)",
            muted: "hsl(40 38% 96%)",
            destructive: "hsl(0 84.2% 60.2%)",
    
            TEAL: "#1B5E6E",
            CREAM: "#F5F1E8",
            SOFT_BLUE: "#A8D8E8",
            WARM_ORANGE: "#E8845C",
            CORAL: "#D97548",
            SALMON: "#F4A583",
            PEACH: "#F5D5CC",
            SAGE: "#6B9E7C",
            LAVENDER: "#D4C5F9",
            LIGHT_YELLOW: "#F5E6C8",
          },
          borderRadius: {
            xl2: "1.25rem",
          },
          boxShadow: {
            soft: "0 8px 30px rgba(0,0,0,0.06)",
          },
        },
      },
      plugins: [],
    } ;
