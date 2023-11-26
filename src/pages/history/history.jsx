// components
import OrderFeed from "../../components/order-feed/order-feed";

// styles
import styles from "./history.module.css";



function HistoryPage() {
  return (
    <section className={styles.content}>
      <OrderFeed showStatus={true} />
    </section>
  );
};

export default HistoryPage;
