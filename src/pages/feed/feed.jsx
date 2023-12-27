// libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { LoadingPage, ErrorPage } from "../../pages";

// utils 
import { ORDER_STATUSES } from "../../utils/order-statuses";



function FeedPage() {

  const dispatch = useDispatch();
  
  useEffect(
    () => {
      dispatch(connect("orders/all"));
      return () => {
        dispatch(disconnect());
      };
    }, 
    [dispatch]
  );  
  
  const { errorRequestingIngredients, pendingRequestingIngredients } = useSelector(
    defaultBurgerIngredientsSelector
  );  
  
  const { allTimeTotal, todaysTotal } = useSelector(
    defaultOrderFeedSelector
  );
  
  if (errorRequestingIngredients) {
    return <ErrorPage title="Что-то пошло не так!" showTips={true} />;
  };
  
  if (pendingRequestingIngredients) {
    return <LoadingPage />;
  };  
  
  return (
    <>
      <h1 className={styles.heading}>
        Лента заказов
      </h1>            
      <div className={styles.content}>
        
        <section className={styles.feed}>
          <OrderFeed showStatus={false} />
        </section>
        
        <section className={styles.summary}>
          
          <div className={styles.lists}>
            <h2 className={styles.listHeading}>Готовы:</h2>
            <OrderList targetStatus={ORDER_STATUSES.done.original} />
            <h2 className={styles.listHeading}>В работе:</h2>
            <OrderList targetStatus={ORDER_STATUSES.pending.original} />
          </div>
          
          <h2 className={styles.totalHeading}>Выполнено за все время:</h2>
          <p className={styles.digits}>{allTimeTotal}</p>
          <h2 className={styles.totalHeading}>Выполнено за сегодня:</h2>
          <p className={styles.digits}>{todaysTotal}</p>
          
        </section>
        
      </div>           
    </>
  );
};

export default FeedPage;
