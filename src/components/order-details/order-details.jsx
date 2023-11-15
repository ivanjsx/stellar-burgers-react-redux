// libraries
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";

// styles
import styles from "./order-details.module.css";

// selectors 
import { defaultCreateOrderSelector } from "../../services/selectors";



function OrderDetails() {
  
  const { 
    pendingRequestingOrder,
    previewableOrder,
    status,
    action,
    iconSrc,
    suggestion
  } = useSelector(defaultCreateOrderSelector);
  
  const getRandomDigits = useCallback(
    () => Math.floor(Math.random()*90000) + 10000,
    []
  );
  
  const [rotatingRandomDigits, setRotatingRandomDigits] = useState(getRandomDigits());
  
  useEffect(
    () => {
      const interval = setInterval(
        () => {
          if (pendingRequestingOrder) {
            setRotatingRandomDigits(getRandomDigits());
          };
        }, 
        100
      );
      return () => clearInterval(interval);
    }, 
    [pendingRequestingOrder, getRandomDigits]
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
            pendingRequestingOrder ? styles.rotating : ""
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

export default OrderDetails;
