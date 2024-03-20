# Tailwind CSS 설치

콘솔 명령어로 Tailwind CSS 설치

```bash
npm install -D tailwindcss
npx tailwindcss init
```

tailwind.config.js를 수정

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

src/styles/input.css에 Tailwind directives를 추가

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind CLI build을 실행

```bash
npx tailwindcss -i ./src/styles/tailwindcss/input.css -o ./src/styles/tailwindcss/output.css --watch
```

Tailwind CSS를 react app에 적용햐보기

```javascript
function App() {
  return (
    <div>
      <p className="text-3xl font-bold underline">HELLO</p>
    </div>
  );
}
```

```bash

프로모션 베너에 필요
npm install react-material-ui-carousel

지도이벤트에 필요
npm install react-hook-geolocation

네이버지도
npm install react-naver-maps

이미지 슬라이더(Slider.js)
npm install slider

페이지네이션
npm i react-js-pagination

리엑트 아이콘
npm install react-icons --save

pretendard 폰트 (기본 폰트로 사용할 것임)
npm i pretendard

```
