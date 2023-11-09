// styles
import styles from "./loading.module.css";



function LoadingPage() {
  return (
    <>
      <h1 className={styles.heading}>
        Подождите немного, пока мы загружаем страницу
      </h1>
    </>
  );
};

export default LoadingPage;
