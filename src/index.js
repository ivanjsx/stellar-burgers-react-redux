// libraries
import React from "react";
import ReactDOM from "react-dom";

// components
import App from "./components/app/app";

// styles
import "./index.css";



class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false 
    };
  };

  static getDerivedStateFromError(error) {
    return {hasError: true};
  };

  componentDidCatch(error, info) {
    console.log("error:", error, info);
  };

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h1>Что-то пошло не так :(</h1>
          <p>
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
        </section>
      );
    }
    return this.props.children;
  };
};



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
