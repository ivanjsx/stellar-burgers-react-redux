// libraries 
import { useCallback, useMemo } from "react";
import { useMatch } from "react-router-dom";

// components
import OrderCard from "../order-card/order-card";

// styles 
import styles from "./order-feed.module.css";

// selectors 
import { defaultOrderFeedSelector } from "../../services/selectors";

// urls 
import { 
  FEED_PAGE_ABSOLUTE_PATH, 
  HISTORY_PAGE_ABSOLUTE_PATH, 
  OWN_ORDER_PAGE_ABSOLUTE_PATH,
  COMMON_ORDER_PAGE_ABSOLUTE_PATH, 
} from "../../utils/urls";

// hooks
import { useAppSelector } from "../../services/store";



function OrderFeed({ showStatus }) {
  
  const { orders } = useAppSelector(
    defaultOrderFeedSelector
  );

  const content = useMemo(
    () => [...orders.values()].toSorted(
      (a, b) => a.createdAt < b.createdAt ? 1 : -1
    ),
    [orders]
  );
  
  const feedMatch = useMatch(FEED_PAGE_ABSOLUTE_PATH);
  const historyMatch = useMatch(HISTORY_PAGE_ABSOLUTE_PATH);
  
  const targetLinkPath = useCallback(
    (orderNumber) => {
      if (feedMatch) {
        return COMMON_ORDER_PAGE_ABSOLUTE_PATH.split(":")[0].concat(orderNumber);
      };      
      if (historyMatch) {
        return OWN_ORDER_PAGE_ABSOLUTE_PATH.split(":")[0].concat(orderNumber);
      };        
      return "";
    },
    [feedMatch, historyMatch]
  );    
  
  return (
    <ul className={styles.content}>
      {
        content.map(
          (order) => (
            <OrderCard 
              key={order.number} 
              order={order} 
              showStatus={showStatus} 
              targetLinkPath={targetLinkPath(order.number)}
            />
          )
        )
      }
    </ul>
  );
};

export default OrderFeed;
