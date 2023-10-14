// libraries
import { useSelector } from "react-redux";

// styles
import styles from "./order-details.module.css";

// images
import done from "../../../images/done.svg";



function OrderDetails() {

  const { orderDetails } = useSelector(state => state.modal);

  return (
    <div className={styles.container}>
      <h3 className={styles.id}>
        {orderDetails.order.number}
      </h3>
      <p className={styles.description}>
        идентификатор заказа
      </p>
      <img 
        src={done}
        className={styles.done}
        alt="иконка статуса заказа: заказ успешно принят"
      />
      <div className={styles.textArea}>
        <p className={styles.text}>
          {
            orderDetails.success 
            ? "Ваш заказ начали готовить" 
            : "Что-то пошло не так :("
          }
        </p>      
        <p className={`${styles.text} ${styles.inactive}`}>
          {
            orderDetails.success 
            ? "Дождитесь готовности на орбитальной станции" 
            : "Лучше всего будет, если вы напишете в поддержку"
          }    
        </p>      
      </div>
    </div>
  );
};

export default OrderDetails;
