// libraries
import { createPortal } from "react-dom";
import { useEffect, useMemo } from "react";
import { useMatch } from "react-router-dom";

// components
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// urls 
import { 
  OWN_ORDER_PAGE_ABSOLUTE_PATH,
  INGREDIENT_PAGE_ABSOLUTE_PATH, 
  COMMON_ORDER_PAGE_ABSOLUTE_PATH, 
} from "../../utils/urls";

// styles
import styles from "./modal.module.css";



type PropsType = Readonly<{
  children: JSX.Element,
  closeHandler: () => void,
}>



function Modal({ closeHandler, children }: PropsType): JSX.Element {
  
  const ownOrderMatch = useMatch(OWN_ORDER_PAGE_ABSOLUTE_PATH);
  const ingredientMatch = useMatch(INGREDIENT_PAGE_ABSOLUTE_PATH);
  const commonOrderMatch = useMatch(COMMON_ORDER_PAGE_ABSOLUTE_PATH);
  
  const heading = useMemo(
    () => {
      if (ownOrderMatch) {
        return "Детали заказа";
      };      
      if (ingredientMatch) {
        return "Детали ингредиента";
      };      
      if (commonOrderMatch) {
        return "Детали заказа";
      };      
      return "";
    },
    [ownOrderMatch, ingredientMatch, commonOrderMatch]
  );
  
  useEffect(
    () => {
      function handleEscapePress(event: KeyboardEvent) {
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
  
  const modalRoot = document.querySelector("#modals")!;
  
  return createPortal(
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

export default Modal;
