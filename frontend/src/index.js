import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/globalStyles.css";
import App from "./main.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring can be added here if needed
