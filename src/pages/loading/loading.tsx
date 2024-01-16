// libraries
import { FC } from "react";

// styles
import styles from "./loading.module.css";



const LoadingPage: FC = () => {
  return (
    <h1 className={styles.heading}>
      Подождите немного, пока мы загружаем страницу
    </h1>
  );
};

export default LoadingPage;
