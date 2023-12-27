// libraries
import { useState, useEffect, useCallback } from "react";

// styles
import styles from "./order-creation.module.css";

// selectors 
import { defaultOrderCreationSelector } from "../../services/selectors";

// hooks
import { useAppSelector } from "../../services/store";



function OrderCreation() {
  
  const { 
    pendingCreatingOrder,
    createdOrder,
    status,
    action,
    iconSrc,
    suggestion
  } = useAppSelector(defaultOrderCreationSelector);
  
  const getFiveRandomDigits = useCallback(
    () => 10000 + Math.floor(Math.random()*90000),
    []
  );
  
  const [rotatingRandomDigits, setRotatingRandomDigits] = useState(getFiveRandomDigits());
  
  useEffect(
    () => {
      const interval = setInterval(
        () => {
          if (pendingCreatingOrder) {
            setRotatingRandomDigits(getFiveRandomDigits());
          };
        }, 
        100
      );
      return () => clearInterval(interval);
    }, 
    [pendingCreatingOrder, getFiveRandomDigits]
  );
  
  return (
    <div className={styles.container}>
      <h3 className={styles.id}>
        {createdOrder.order?.number || rotatingRandomDigits}
      </h3>
      <p className={styles.description}>
        {status}
      </p>
      <img 
        alt="иконка статуса заказа"
        src={iconSrc}
        className={
          [
            styles.icon,
            pendingCreatingOrder ? styles.rotating : ""
          ].join(" ")
        }
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
