// libraries
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// components
import ModalOverlay from "../modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./modal.module.css";



function Modal({ heading, isVisible, close, children }) {

  function handleEscapePress(event) {
    if (event.key === "Escape") {
      close();
    };
  };

  React.useEffect(
    () => {
      if (isVisible) {
        document.addEventListener("keydown", handleEscapePress);
      };
      return () => {
        document.removeEventListener("keydown", handleEscapePress);   
      };
    }, 
    [isVisible]
  );

  const modalRoot = document.querySelector("#react-modals");

  return ReactDOM.createPortal(
    (
      <ModalOverlay isVisible={isVisible} close={close}>
        <div className={styles.container}>
          
          <div className={styles.header}>
            <h2 className={styles.heading}>{heading}</h2>
            <button className={styles.close} onClick={close} type="button">
              <CloseIcon type="primary" />
            </button>
          </div>

          {children}    
        
        </div>
      </ModalOverlay>
    ),
    modalRoot
  );
};

Modal.propTypes = {
  heading: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.bool
    ])    
  ).isRequired
};

export default Modal;
