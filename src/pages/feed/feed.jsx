// libraries
import { useSelector } from "react-redux";

// components
import OrderFeed from "../../components/order-feed/order-feed";
import OrderList from "../../components/order-list/order-list";

// styles 
import styles from "./feed.module.css";

// selectors 
import { defaultBurgerIngredientsSelector } from "../../services/selectors";

// pages 
import { LoadingPage, ErrorPage } from "../../pages";

// data 
import { all } from "../../data/all";



function FeedPage() {
  
  const { errorRequestingIngredients, pendingRequestingIngredients } = useSelector(
    defaultBurgerIngredientsSelector
  );  

  const allTimeTotal = all.total;
  const todayTotal = all.totalToday;
  
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
            <OrderList status="done" />
            <h2 className={styles.listHeading}>В работе:</h2>
            <OrderList status="inprogress" />
          </div>
          
          <h2 className={styles.totalHeading}>Выполнено за все время:</h2>
          <p className={styles.digits}>{allTimeTotal}</p>
          <h2 className={styles.totalHeading}>Выполнено за сегодня:</h2>
          <p className={styles.digits}>{todayTotal}</p>
          
        </section>
        
      </div>           
    </>
  );
};

export default FeedPage;
