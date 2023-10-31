// libraries
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// components
import App from "./components/app";
import ErrorBoundary from "./components/error-boundary";

// styles
import "./index.css";

// store
import { store } from "./services/store"



ReactDOM.render(
  (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>,
      </ErrorBoundary>      
    </React.StrictMode>
  ),
  document.querySelector("#root")
);
