// libraries 
import PropTypes from "prop-types";

// styles 
import styles from "./order-list.module.css";

// data 
import { all } from "../../data/all";



function OrderList({ status }) {
  
  const orders = all.orders.filter(
    order => order.status === status
  ).sort(
    (a, b) => a.updatedAt < b.updatedAt ? 1 : -1
  ).slice(
    0, 20
  );
  
  return (
    orders.length > 0 &&
    <ul className={styles.list}>
      {
        orders.map(
          order => (
            <li 
              key={order.number}
              className={
                [
                  styles.item,
                  status === "done" ? styles.done : ""
                ].join(" ")              
              }
            >
              {order.number}
            </li>
          )
        )
      }
    </ul>
  );
};

OrderList.propTypes = {
  status: PropTypes.string.isRequired
};

export default OrderList;
