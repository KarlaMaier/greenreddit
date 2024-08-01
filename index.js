import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure you have your styles
import App from "./App";

// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
