// libraries 
import { useMemo } from "react";

// styles 
import styles from "./order-list.module.css";

// selectors 
import { defaultOrderFeedSelector } from "../../services/selectors";

// utils 
import { ORDER_STATUSES } from "../../utils/order-statuses";

// hooks
import { useAppSelector } from "../../services/store";

// types 
import { FetchedOrderType } from "../../utils/types";



type PropsType = Readonly<{
  targetStatus: FetchedOrderType["status"],
}>



function OrderList({ targetStatus }: PropsType): JSX.Element {
  
  const { orders } = useAppSelector(
    defaultOrderFeedSelector
  );
  
  const content = useMemo(
    () => [...orders.values()].filter(
      (order) => order.status === targetStatus
    ).sort(
      (a, b) => a.createdAt < b.createdAt ? 1 : -1
    ).slice(0, 20),
    [orders, targetStatus]
  );
  
  return (
    <ul className={styles.list}>
      {
        content.map(
          (order) => (
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

export default OrderList;
