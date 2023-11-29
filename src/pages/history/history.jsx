// libraries 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import OrderFeed from "../../components/order-feed/order-feed";

// constants 
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

// selectors 
import { 
  defaultUserSelector,
  defaultBurgerIngredientsSelector, 
} from "../../services/selectors";

// actions 
import { connect, disconnect } from "../../services/order-feed/order-feed-slice";

// styles
import styles from "./history.module.css";

// pages 
import { ErrorPage, LoadingPage } from "../../pages";



function HistoryPage() {
  
  const dispatch = useDispatch();
  
  const { currentUser } = useSelector(defaultUserSelector);
  
  useEffect(
    () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY).split(" ")[1];
      dispatch(connect(`orders?token=${accessToken}`));
      return () => {
        dispatch(disconnect());
      };
    }, 
    [currentUser]
  );  
  
  const { errorRequestingIngredients, pendingRequestingIngredients } = useSelector(
    defaultBurgerIngredientsSelector
  );  
  
  if (errorRequestingIngredients) {
    return <ErrorPage title="Что-то пошло не так!" showTips={true} />;
  };
  
  if (pendingRequestingIngredients) {
    return <LoadingPage />;
  };  
  
  return (
    <section className={styles.content}>
      <OrderFeed showStatus={true} />
    </section>
  );
};

export default HistoryPage;
