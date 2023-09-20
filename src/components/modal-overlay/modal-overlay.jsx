// libraries
import React from "react";
import ReactDOM from "react-dom";

// components
import Modal from "./modal/modal";
import OrderDetails from "./order-details/order-details";
import IngredientDetails from "./ingredient-details/ingredient-details";

// styles 
import styles from "./modal-overlay.module.css";

// data
import { orderData } from "../../utils/order-data";
import { ingData } from "../../utils/order-data";



const modalRoot = document.querySelector("#react-modals");

export default function ModalOverlay({ mode }) {
  
  const [isVisible, setIsVisible] = React.useState(true);
  const [selectedIngredient, setSelectedIngredient] = React.useState(ingData);

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
            <IngredientDetails info={selectedIngredient} />
          );
        case "order": 
          return <OrderDetails info={orderData} />;
        default:
          return "";
      }
    },
    [mode, selectedIngredient, orderData]    
  );
  
  const overlayClassName = React.useMemo(
    () => isVisible
          ? `${styles.overlay} ${styles.visible}`
          : styles.overlay,
    [isVisible]
  );

  const handleEscapePress = React.useCallback(
    event => {
      if (event.key === "Escape") {
        close();
      };
    },
    []
  );    

  const handleOverlayClick = React.useCallback(
    event => {
      if (event.target === event.currentTarget) {
        close();
      };
    },
    []
  );      

  const open = React.useCallback(
    () => {
      setIsVisible(true);
      document.addEventListener(
        "keydown", handleEscapePress
      )
    },
    []
  );

  const close = React.useCallback(
    () => {
      setIsVisible(false);
      document.removeEventListener(
        "keydown", handleEscapePress
      )      
    },
    []
  );

  return ReactDOM.createPortal(
    (
      <div className={overlayClassName} onClick={handleOverlayClick}>
        <Modal heading={heading} closeHandler={close}>
          {content}
        </Modal>
      </div>
    ), 
    modalRoot
  );
};







  // _makeOpenable(openButtonElement) {
  //     openButtonElement.addEventListener(
  //         "click", () => {
  //             this._open();
  //         }            
  //     );        
  // };
