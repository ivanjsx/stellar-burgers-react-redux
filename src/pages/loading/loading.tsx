// libraries
import { FC } from "react";

// styles
import styles from "./loading.module.css";



const LoadingPage: FC = () => {
  return (
    <h1 className={styles.heading}>
      Please wait a moment while we load the page
    </h1>
  );
};

export default LoadingPage;
