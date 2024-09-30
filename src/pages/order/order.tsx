// libraries 
import { FC } from "react";

// components
import OrderDetails from "../../components/order-details/order-details";

// styles 
import styles from "./order.module.css";



const OrderPage: FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Order Details</h2>
      <OrderDetails />
    </div> 
  );  
};

export default OrderPage;
