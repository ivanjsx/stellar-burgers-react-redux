// libraries
import React from "react";
import ReactDOM from "react-dom";

// components
import App from "./components/app/app";
import ErrorBoundary from "./components/error-boundary/error-boundary";

// styles
import "./index.css";



ReactDOM.render(
  (
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>      
    </React.StrictMode>
  ),
  document.querySelector("#root")
);
