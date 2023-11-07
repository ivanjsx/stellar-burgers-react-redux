// libraries
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// components
import App from "./components/app";
import ErrorBoundary from "./components/error-boundary/error-boundary";

// styles
import "./index.css";

// store
import { store } from "./services/store"



ReactDOM.render(
  (
    <React.StrictMode>
      <ErrorBoundary>
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router> 
      </ErrorBoundary>      
    </React.StrictMode>
  ),
  document.querySelector("#root")
);
