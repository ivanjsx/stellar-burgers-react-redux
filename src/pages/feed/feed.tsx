// libraries
import { FC, useEffect } from "react";

// components
import OrderFeed from "../../components/order-feed/order-feed";
import OrderList from "../../components/order-list/order-list";

// styles 
import styles from "./feed.module.css";

// selectors 
import { 
  defaultOrderFeedSelector,
  defaultBurgerIngredientsSelector, 
} from "../../services/selectors";

// actions 
import { connect, disconnect } from "../../services/order-feed/order-feed-slice";

// pages 
import { LoadingPage, ErrorPage } from "..";

// utils 
import { ORDER_STATUSES } from "../../utils/order-statuses";

// hooks
import { useAppSelector, useAppDispatch } from "../../services/store";



const FeedPage: FC = () => {
  
  const dispatch = useAppDispatch();
  
  useEffect(
    () => {
      dispatch(connect("orders/all"));
      return () => {
        dispatch(disconnect());
      };
    }, 
    [dispatch]
  );  
  
  const { errorRequestingIngredients, pendingRequestingIngredients } = useAppSelector(
    defaultBurgerIngredientsSelector
  );  
  
  const { allTimeTotal, todaysTotal } = useAppSelector(
    defaultOrderFeedSelector
  );
  
  if (errorRequestingIngredients) {
    return <ErrorPage title="Something went wrong!" showTips={true} />;
  };
  
  if (pendingRequestingIngredients) {
    return <LoadingPage />;
  };  
  
  return (
    <>
      <h1 className={styles.heading}>
        Order Feed
      </h1>            
      <div className={styles.content}>
        
        <section className={styles.feed}>
          <OrderFeed showStatus={false} />
        </section>
        
        <section className={styles.summary}>
          
          <div className={styles.lists}>
            <h2 className={styles.listHeading}>Ready:</h2>
            <OrderList targetStatus={ORDER_STATUSES.done.original} />
            <h2 className={styles.listHeading}>In progress:</h2>
            <OrderList targetStatus={ORDER_STATUSES.pending.original} />
          </div>
          
          <h2 className={styles.totalHeading}>Completed all time:</h2>
          <p className={styles.digits}>{allTimeTotal}</p>
          <h2 className={styles.totalHeading}>Completed today:</h2>
          <p className={styles.digits}>{todaysTotal}</p>
          
        </section>
        
      </div>           
    </>
  );
};

export default FeedPage;
