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

// Service Worker 등록
// ServiceWorkerRegistration.register(); 

reportWebVitals();
