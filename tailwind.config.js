/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        stagger: "stagger 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        swap: "swap 3s ease-in-out infinite",

        /* Existing loading pulse */
        loading: "loading 1.2s ease-in-out infinite",

        /* ✅ New animations */
        shimmer: "shimmer 1.2s linear infinite",
        tickPop: "tickPop 0.35s ease-out forwards",
      },
      keyframes: {
        stagger: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        swap: {
          "0%": { transform: "rotateX(0deg)" },
          "45%": { transform: "rotateX(90deg)", opacity: "0" },
          "55%": { transform: "rotateX(-90deg)", opacity: "0" },
          "100%": { transform: "rotateX(0deg)", opacity: "1" },
        },

        /* Existing pulse loading */
        loading: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },

        /* ✅ Shimmer wave */
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },

        /* ✅ Tick pop-in */
        tickPop: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "80%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
