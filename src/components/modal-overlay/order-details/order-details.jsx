// libraries
import PropTypes from "prop-types";

// styles
import styles from "./order-details.module.css";

// images
import done from "../../../images/done.svg";

// utils
import { orderPropType } from "../../../utils/prop-types";



export default function OrderDetails({ order }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.id}>
        {order.id}
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
          {order.status}
        </p>      
        <p className={`${styles.text} ${styles.inactive}`}>
          {order.suggestion}          
        </p>      
      </div>
    </div>
  );
};



OrderDetails.propTypes = {
  order: PropTypes.shape(orderPropType).isRequired
};
