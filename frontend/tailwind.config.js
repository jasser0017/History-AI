/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}"
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
        darkbg: "hsl(193 57% 12%)",
        darkfg: "hsl(40 38% 93%)",
        darkprimary: "hsl(195 56% 78%)",
        darkaccent: "hsl(19 74% 64%)",
        darkborder: "hsl(193 57% 24%)",
        darkcard: "hsl(193 57% 18%)",
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
