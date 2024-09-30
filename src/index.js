import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/globalStyles.css";
import App from "./main";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ResumeContextProvider } from "./context/resume-context";
import { ResumeSpecificContextProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <ResumeContextProvider>
      <ResumeSpecificContextProvider>
        <App />
      </ResumeSpecificContextProvider>
    </ResumeContextProvider>
  </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
