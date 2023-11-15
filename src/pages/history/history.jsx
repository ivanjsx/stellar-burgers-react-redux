// components
import { ErrorPage } from "../../pages";

// styles
import styles from "./history.module.css";



function HistoryPage() {
  return (
    <>
      <p className={styles.description}>
        В этом разделе вы можете просмотреть свою историю заказов      
      </p>
      <div className={styles.content}>
        <ErrorPage title="Эта страница пока в разработке" showTips={false} />                
      </div>
    </>
  );
};

export default HistoryPage;
