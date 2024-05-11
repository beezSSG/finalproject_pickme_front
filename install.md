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

## LIB

```bash

# 사용하지 않는 모듈 삭제
npm uninstall react-material-ui-carousel
npm uninstall tw-elements
npm uninstall slider
npm uninstall flowbite flowbite-react

# React router
npm install react-router-dom

# Axios
npm install axios

# 지도 이벤트에 필요
npm install react-hook-geolocation

# 네이버지도
npm install react-naver-maps

# 이미지 슬라이더(swiper.js)
npm install swiper

# 페이지네이션
npm install react-js-pagination

# 리액트 아이콘
npm install react-icons --save

# pretendard 폰트 (기본 폰트로 사용할 것임)
npm install pretendard

# tailwind ui lib
npm install @headlessui/react

# 리액트 무한 스크롤
npm install --save react-infinite-scroll-component

# 리액트 js바코드
npm install jsbarcode --save

# 파이어베이스 (pwa)
npm install firebase

# 부트페이 (결제 시스템)
npm install bootpay

# 날짜계산
npm install moment

# antd
npm install antd

# 차트.js
npm install react-chartjs-2 chart.js

# 헤드리스ui
npm install @headlessui/react

# sweetalert2
npm install sweetalert2

```
