// libraries
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// components
import Modal from "./modal/modal";
import OrderDetails from "./order-details/order-details";
import IngredientDetails from "./ingredient-details/ingredient-details";

// styles 
import styles from "./modal-overlay.module.css";



const modalRoot = document.querySelector("#react-modals");

export default function ModalOverlay({ data, mode, isVisible, closeHandler }) {
  
  const overlayClassName = React.useMemo(
    () => isVisible
          ? `${styles.overlay} ${styles.visible}`
          : styles.overlay,
    [isVisible]
  );

  const heading = React.useMemo(
    () => {
      switch (mode) {
        case "ingredient":
          return "Детали ингредиента";
        case "order": 
          return "";
        default:
          return "";
      }
    },
    [mode]
  );

  const content = React.useMemo(
    () => {
      switch (mode) {
        case "ingredient":
          return (
            <IngredientDetails ingredient={data} />
          );
        case "order": 
          return <OrderDetails order={data} />;
        default:
          return "";
      }
    },
    [mode, data]    
  );

  const handleOverlayClick = React.useCallback(
    event => {
      if (event.target === event.currentTarget) {
        closeHandler();
      };
    },
    [closeHandler]
  );      

  return ReactDOM.createPortal(
    (
      <div className={overlayClassName} onClick={handleOverlayClick}>
        <Modal heading={heading} closeHandler={closeHandler}>
          {content}
        </Modal>
      </div>
    ), 
    modalRoot
  );
};

ModalOverlay.propTypes = PropTypes.exact(
  {
    mode: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired
  }
).isRequired;

