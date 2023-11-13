// libraries
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// components
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./modal.module.css";



function Modal({ heading, closeHandler, children }) {
  
  React.useEffect(
    () => {
      function handleEscapePress(event) {
        if (event.key === "Escape") {
          closeHandler();
        };
      };      
      document.addEventListener("keydown", handleEscapePress);
      return () => {
        document.removeEventListener("keydown", handleEscapePress);   
      };
    }, 
    [closeHandler]
  );

  const modalRoot = document.querySelector("#modals");

  return ReactDOM.createPortal(
    (
      <ModalOverlay closeHandler={closeHandler}>
        <div className={styles.container}>
          
          <div className={styles.header}>
            <h2 className={styles.heading}>{heading}</h2>
            <button 
              className={styles.close} 
              type="button"
              onClick={closeHandler} 
            >
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
  onClose: PropTypes.func,
  children: PropTypes.element.isRequired
};

export default Modal;
