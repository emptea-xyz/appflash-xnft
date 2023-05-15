import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/globals.css";
import "./style/navigation.css";
import "./style/home.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);