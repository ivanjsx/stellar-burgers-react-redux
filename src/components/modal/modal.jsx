// libraries
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

// components
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./modal.module.css";

// actions 
import { closeModal } from "../../services/modal-slice";



function Modal({ children }) {

  const dispatch = useDispatch();
  const { modalIsVisible, modalHeading } = useSelector(state => state.modal);  

  const closePopup = React.useCallback(
    () => {
      dispatch(closeModal());
    },
    []
  );

  React.useEffect(
    () => {
      function handleEscapePress(event) {
        if (event.key === "Escape") {
          closePopup();
        };
      };      
      if (modalIsVisible) {
        document.addEventListener("keydown", handleEscapePress);
      };
      return () => {
        document.removeEventListener("keydown", handleEscapePress);   
      };
    }, 
    [modalIsVisible, closePopup]
  );

  const modalRoot = document.querySelector("#modals");

  return ReactDOM.createPortal(
    (
      <ModalOverlay closePopup={closePopup}>
        <div className={styles.container}>
          
          <div className={styles.header}>
            <h2 className={styles.heading}>{modalHeading}</h2>
            <button 
              className={styles.close} 
              type="button"
              onClick={closePopup} 
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
  children: PropTypes.element.isRequired
};

export default Modal;
