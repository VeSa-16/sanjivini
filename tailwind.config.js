export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        urgency: {
          green: { bg: "#e6f4ea", text: "#137333" },
          yellow: { bg: "#fef7e0", text: "#b06000" },
          red: { bg: "#fce8e6", text: "#c5221f" },
        },
        farm: {
          base: "#f5f6f1", // cream
          text: "#173f2c", // darker green for high contrast
          muted: "#4a5d52", // stronger muted text
        }
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
      }
    }
  },
  plugins: [],
};
