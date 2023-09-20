// libraries
import PropTypes from "prop-types";

// styles
import styles from "./order-details.module.css";

// images
import done from "../../../images/done.svg";



export default function OrderDetails({ order }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.id}>
        {order.id}
      </h3>
      <p className={styles.description}>
        идентификатор заказа
      </p>
      <img src={done} alt="иконка успешного принятия заказа" className={styles.done} />
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



OrderDetails.propTypes = PropTypes.exact(
  {
    order: PropTypes.shape(
      { 
        id: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        suggestion: PropTypes.string.isRequired
      }
    ).isRequired
  }
).isRequired;
