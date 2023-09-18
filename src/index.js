// libraries
import React from "react";
import ReactDOM from "react-dom";

// components
import App from "./components/app/app";

// styles
import "./index.css";

ReactDOM.render(
  (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ),
  document.querySelector("#root")
);
