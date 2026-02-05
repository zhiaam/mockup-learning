/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-dmSans)",
      secondary: "var(--font-barlow)",
    },
    extend: {
      colors: {
        /* BRAND */
        primary: "#0ea5e9",   // sky-500 → warna utama (biru muda)
        secondary: "#64748b", // slate-500 → teks sekunder (adem & modern)
        accent: "#0284c7",    // sky-600 → CTA / hover / fokus

        /* BACKGROUND */
        cream: "#f8f5ef",     // krim premium (background utama)
        soft: "#f0f9ff",      // sky-50 (section ringan)

        /* UTIL */
        border: "#e5e7eb",    // netral border
      },
      boxShadow: {
        custom: "0px 10px 40px rgba(14, 165, 233, 0.12)", // glow biru lembut
      },
      backgroundImage: {
        hero: "linear-gradient(135deg, #e0f2fe 0%, #f8f5ef 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
