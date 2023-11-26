// libraries 
import { useCallback, useMemo } from "react";
import { useMatch } from "react-router-dom";

// components
import OrderCard from "../order-card/order-card";

// styles 
import styles from "./order-feed.module.css";

// data 
import { all } from "../../data/all";

// constants 
import { 
  FEED_PAGE_ABSOLUTE_PATH, 
  HISTORY_PAGE_ABSOLUTE_PATH, 
  OWN_ORDER_PAGE_ABSOLUTE_PATH,
  COMMON_ORDER_PAGE_ABSOLUTE_PATH, 
} from "../../utils/constants";



function OrderFeed({ showStatus }) {
  
  const feedMatch = useMatch(FEED_PAGE_ABSOLUTE_PATH);
  const historyMatch = useMatch(HISTORY_PAGE_ABSOLUTE_PATH);
  
  const orders = useMemo(
    () => {
      if (feedMatch) {
        return all.orders;
      };      
      if (historyMatch) {
        return all.orders;
      };      
      return [];
    },
    [feedMatch, historyMatch]
  );
  
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
        orders.map(
          order => (
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
