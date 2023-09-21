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



function ModalOverlay({ data, mode, isVisible, closeHandler }) {
  
  const overlayClassName =  isVisible
                            ? `${styles.overlay} ${styles.visible}`
                            : styles.overlay;

  function inferHeading() {
    switch (mode) {
      case "ingredient":
        return "Детали ингредиента";
      default:
        return "";
    };
  };

  function inferContent() {
    switch (mode) {
      case "ingredient":
        return (
          <IngredientDetails ingredient={data} />
        );
      case "order": 
        return <OrderDetails order={data} />;
      default:
        return null;
    };
  };

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closeHandler();
    };
  };      

  const modalRoot = document.querySelector("#react-modals");

  return ReactDOM.createPortal(
    (
      <div className={overlayClassName} onClick={handleOverlayClick}>
        <Modal heading={inferHeading()} closeHandler={closeHandler}>
          {inferContent()}
        </Modal>
      </div>
    ), 
    modalRoot
  );
};

ModalOverlay.propTypes = {
  data: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired
};

export default ModalOverlay;
