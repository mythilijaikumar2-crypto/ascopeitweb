/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#056999",
        secondary: "#049CCB",
        accent: "#6CCFF6",
        softLight: "#BFEFFF",
        background: "#F4FBFB",
        white: "#FFFFFF",
        dark: "#1E293B",
        secondaryText: "#64748B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        'brand-gradient': "linear-gradient(135deg, #056999 0%, #049CCB 55%, #6CCFF6 100%)",
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(5, 105, 153, 0.15)',
        'premium-hover': '0 20px 40px -15px rgba(5, 105, 153, 0.25)',
        'glass': '0 8px 32px 0 rgba(5, 105, 153, 0.08)',
      },
    },
  },
  plugins: [],
}
