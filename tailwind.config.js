import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
				fadeInUp: "fadeInUp 0.6s ease-out both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
				fadeInUp: {
					"0%": { opacity: 0, transform: "translateY(20px)" },
					"100%": { opacity: 1, transform: "translateY(0)" },
  			},
      },
    },
  },
  plugins: [animate],
};
