import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "./service-worker.js"

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
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/service-worker.js").then(registration => {
//       console.log("Service Worker registered!");
//     }).catch(error => {
//       console.error("Service Worker registration failed:", error);
//     });
//   });
// }

reportWebVitals();
