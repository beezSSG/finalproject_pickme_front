/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      sm: { min: "390px", max: "819px" },
      md: { min: "820px", max: "1023px" },
      lg: { min: "1080px" },
    },
    extend: {
      colors: {
        // 색상 옆에 어디 component에 쓰일 지 적어놓기 -> 통일된 디자인
        'main-orange': '#ff6b00', //
        'sub-orange': '#fca311',  //
        'main-yellow': '#ffc300', // 
        'sub-yellow': '#ffd60a', // 
      },
    },
  },
  plugins: [
  ],
}