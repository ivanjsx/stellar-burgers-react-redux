// libraries
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";

// styles
import styles from "./order-creation.module.css";

// selectors 
import { defaultOrderCreationSelector } from "../../services/selectors";



function OrderCreation() {
  
  const { 
    pendingCreatingOrder,
    previewableOrder,
    status,
    action,
    iconSrc,
    suggestion
  } = useSelector(defaultOrderCreationSelector);
  
  const getRandomDigits = useCallback(
    () => Math.floor(Math.random()*90000) + 10000,
    []
  );
  
  const [rotatingRandomDigits, setRotatingRandomDigits] = useState(getRandomDigits());
  
  useEffect(
    () => {
      const interval = setInterval(
        () => {
          if (pendingCreatingOrder) {
            setRotatingRandomDigits(getRandomDigits());
          };
        }, 
        100
      );
      return () => clearInterval(interval);
    }, 
    [pendingCreatingOrder, getRandomDigits]
  );
  
  return (
    <div className={styles.container}>
      <h3 className={styles.id}>
        {previewableOrder.order?.number || rotatingRandomDigits}
      </h3>
      <p className={styles.description}>
        {status}
      </p>
      <img 
        alt="иконка статуса заказа"
        className={
          [
            styles.icon,
            pendingCreatingOrder ? styles.rotating : ""
          ].join(" ")
        }
        src={iconSrc}
      />
      <div className={styles.textArea}>
        <p className={styles.text}>
          {action}
        </p>      
        <p className={`${styles.text} ${styles.inactive}`}>
          {suggestion}    
        </p>      
      </div>
    </div>
  );
};

export default OrderCreation;
