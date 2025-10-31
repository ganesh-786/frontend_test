/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        shopify: {
          // New color palette from image
          "forest-green": "#2d5016", // Dark Forest Green
          teal: "#20b2aa", // Vibrant Teal/Turquoise
          mint: "#e8f5e8", // Light Pastel Mint Green
          "bright-green": "#4caf50", // Medium Bright Green
          // Legacy colors for compatibility
          green: "#4caf50",
          "green-light": "#20b2aa",
          "green-dark": "#2d5016",
          "green-darker": "#1b3a0e",
          "green-darkest": "#0f2308",
          dark: "#1A1A1A",
          gray: "#F6F6F7",
          "gray-light": "#f8fafc",
          "gray-medium": "#f1f5f9",
          "gray-dark": "#e2e8f0",
        },
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        accent: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
      },
      boxShadow: {
        shopify: "0 4px 20px rgba(76, 175, 80, 0.15)",
        "shopify-lg": "0 8px 32px rgba(76, 175, 80, 0.2)",
        "shopify-xl": "0 20px 60px rgba(76, 175, 80, 0.25)",
        forest: "0 4px 20px rgba(45, 80, 22, 0.15)",
        teal: "0 4px 20px rgba(32, 178, 170, 0.15)",
        mint: "0 4px 20px rgba(232, 245, 232, 0.15)",
      },
      animation: {
        "slide-in": "messageSlideIn 0.3s ease-out",
        "pulse-soft": "pulse 2s infinite",
        "bounce-soft": "bounce 1s infinite",
      },
    },
  },
  plugins: [],
};
