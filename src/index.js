import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// tailwind css
import "./styles/tailwindcss/input.css";
import "./styles/tailwindcss/output.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);

// ServiceWorkerRegistration.unregister();  // unregister(); => register(); 로 고치셔야합니다.

reportWebVitals();
