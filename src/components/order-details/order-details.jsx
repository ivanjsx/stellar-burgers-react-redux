// libraries
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// styles
import styles from "./order-details.module.css";

// images
import done from "../../images/done.svg";
import failed from "../../images/failed.svg";
import pending from "../../images/pending.svg";

// selectors 
import { defaultBurgerConstructorSelector } from "../../services/selectors";



function OrderDetails() {

  const { errorRequestingOrder, pendingRequestingOrder, previewableOrder } = useSelector(defaultBurgerConstructorSelector);

  const [status, setStatus] = useState("");
  const [action, setAction] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [iconSrc, setIconSrc] = useState("");

  useEffect(
    () => {
      if (errorRequestingOrder) {
        setStatus("не удалось создать заказ");
        setAction("Что-то пошло не так");
        setSuggestion("Лучше всего будет, если вы напишете в поддержку");
        setIconSrc(failed);
      } else if (pendingRequestingOrder) {
        setStatus("создаём заказ");
        setAction("Скоро начнём готовить заказ");
        setSuggestion("Обычно это занимает совсем немного времени");
        setIconSrc(pending);
      } else {
        setStatus("идентификатор заказа");
        setAction("Ваш заказ начали готовить");
        setSuggestion("Дождитесь готовности на орбитальной станции");
        setIconSrc(done);
      };
    },
    [errorRequestingOrder, pendingRequestingOrder]
  );
  
  return (
    <div className={styles.container}>
      <h3 className={styles.id}>
        {previewableOrder.order.number}
      </h3>
      <p className={styles.description}>
        {status}
      </p>
      <img 
        alt="иконка статуса заказа: заказ успешно принят"
        className={styles.done}
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
