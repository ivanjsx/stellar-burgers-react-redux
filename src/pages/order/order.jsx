// components
import OrderDetails from "../../components/order-details/order-details";

// styles 
import styles from "./order.module.css";



function OrderPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Детали заказа</h2>
      <OrderDetails />
    </div> 
  );  
};

export default OrderPage;
