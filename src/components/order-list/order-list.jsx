// libraries 
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// styles 
import styles from "./order-list.module.css";

// selectors 
import { defaultOrderFeedSelector } from "../../services/selectors";

// utils 
import { ORDER_STATUSES } from "../../utils/order-statuses";



function OrderList({ targetStatus }) {
  
  const { orders } = useSelector(
    defaultOrderFeedSelector
  );
  
  const content = useMemo(
    () => [...orders.values()].filter(
      order => order.status === targetStatus
    ).toSorted(
      (a, b) => a.createdAt < b.createdAt ? 1 : -1
    ).slice(
      0, 20
    ),
    [orders, targetStatus]
  );
  
  return (
    orders.length > 0 &&
    <ul className={styles.list}>
      {
        content.map(
          order => (
            <li 
              key={order.number}
              className={
                [
                  styles.item,
                  targetStatus === ORDER_STATUSES.done.original ? styles.done : ""
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
  targetStatus: PropTypes.string.isRequired
};

export default OrderList;
