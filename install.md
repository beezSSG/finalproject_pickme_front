
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
}
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