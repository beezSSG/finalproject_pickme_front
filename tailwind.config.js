/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { min: "280px", max: "819px" },
      md: { min: "820px", max: "1079px" },
      lg: { min: "1080px" },
      xl: { min: "1280px", max: "1600px" },
    },
    extend: {
      keyframes: {
        bubble: {
          "0%": {
            top: '27%',
            scale: '1',
            transform: "translateX(10px)",
            opacity: "1",
          },
          "25%": {
            transform: "translateX(-8px)",
          },
          "50%": {
            transform: "translateX(8px)",
          },
          "75%": {
            transform: "translateX(-8px)",
          },
          "100%": {
            top: '5%',
            scale: '0.5',
            transform: "translateX(8px)",
            opacity: "0"
          },
        },
        pop: {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0.7',
          },
          '100%': {
            opacity: '0',
          },
        },
        melt: {
          '0%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(16.5%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        }
      },
      colors: {
        // 색상 옆에 어디 component에 쓰일 지 적어놓기 -> 통일된 디자인
        "main-orange": "#ff6b00", //
        "sub-orange": "#fca311", //
        "main-yellow": "#ffc300", //
        "sub-yellow": "#ffd60a", //
      },
      animation: {
        bubble: "bubble 1s ease-in-out infinite",
        melt: "melt 1.5s ease-in-out infinite",
        pop: "pop 1s ease-in-out 0.5s infinite",
      },
    },
  },
  plugins: [],
};
