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



function Modal({ children, onClose }) {

  const dispatch = useDispatch();
  const { modalIsVisible, modalHeading } = useSelector(state => state.modal);  

  const closeCallback = React.useCallback(
    () => {
      dispatch(closeModal());
      if (onClose) {
        onClose();
      };
    },
    [onClose]
  );

  React.useEffect(
    () => {
      function handleEscapePress(event) {
        if (event.key === "Escape") {
          closeCallback();
        };
      };      
      if (modalIsVisible) {
        document.addEventListener("keydown", handleEscapePress);
      };
      return () => {
        document.removeEventListener("keydown", handleEscapePress);   
      };
    }, 
    [modalIsVisible, closeCallback]
  );

  const modalRoot = document.querySelector("#modals");

  return ReactDOM.createPortal(
    (
      <ModalOverlay closeCallback={closeCallback}>
        <div className={styles.container}>
          
          <div className={styles.header}>
            <h2 className={styles.heading}>{modalHeading}</h2>
            <button 
              className={styles.close} 
              type="button"
              onClick={closeCallback} 
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
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func
};

export default Modal;
