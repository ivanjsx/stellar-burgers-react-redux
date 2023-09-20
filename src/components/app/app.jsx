// libraries
import React from "react";

// components
import AppHeader from "../app-header/app-header";
import ModalOverlay from "../modal-overlay/modal-overlay";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
// styles
import styles from "./app.module.css";

// constants
import { BASE_URL } from "../../utils/constants";



export default function App() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [data, setData] = React.useState([]);

  function getData() {
    setIsLoading(true);
    fetch(
      BASE_URL, {method: "GET"}
    ).then(
      response => response.ok
                  ? response.json()
                  : Promise.reject(`error: ${response.status} ${response.statusText}`)
    ).then(
      object => (object.success && object.data.length)
                ? object.data
                : Promise.reject(`error: ${object}`)
    ).then(
      array => {
        setData(array);
      }
    ).catch(
      error => {
        console.error('error:', error.message);
        setHasError(true);
      }
    ).finally(
      () => {
        setIsLoading(false);
      }
    );
  };

  React.useEffect(
    getData,
    []
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={styles.heading}>
        Соберите бургер
      </h1>
      {
        !isLoading && !hasError && data.length &&
        <main className={styles.main}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </main>         
      }
      <ModalOverlay />
    </div>
  );
};
