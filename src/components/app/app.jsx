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

// data
import { sampleOrderData } from "../../utils/sample-order-data";



export default function App() {

  const [data, setData] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [modalData, setModalData] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("order");
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [cart, setCart] = React.useState([]);

  const MemoizedHeader = React.memo(AppHeader);

  const getData = React.useCallback(
    () => {
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
    },
    []
  );

  React.useEffect(
    getData,
    [getData]
  );

  const handleEscapePress = React.useCallback(
    event => {
      if (event.key === "Escape") {
        closeModal();
      };
    },
    []
  );      

  const openModal = React.useCallback(
    () => {
      setIsModalVisible(true);
      document.addEventListener(
        "keydown", handleEscapePress
      )
    },
    [handleEscapePress]
  );

  const closeModal = React.useCallback(
    () => {
      setIsModalVisible(false);
      document.removeEventListener(
        "keydown", handleEscapePress
      )      
    },
    [handleEscapePress]
  );  

  const orderClickHandler = React.useCallback(
    () => {
      setModalData(sampleOrderData);
      setModalMode("order");
      openModal();
    },
    [openModal, sampleOrderData]
  );

  const cardClickHandler = React.useCallback(
    ingredient => {
      return () => {
        setModalData(ingredient);
        setModalMode("ingredient");
        openModal();        
      };
    },
    [openModal]
  );

  // заготовка функции для реализации добавления в корзину
  const addToCartHandler = React.useCallback(
    () => {
      return ingredient => {
        // добавить проверку: в корзине не может быть 
        // больше одной булки (наверное)
        setCart(
          [...cart, ingredient]
        );
      };
    },
    [cart]
  );  

  return (
    <div className={styles.app}>
      <MemoizedHeader />
      <h1 className={styles.heading}>
        Соберите бургер
      </h1>
      {
        !isLoading && !hasError && data.length &&
        <main className={styles.main}>
          <BurgerIngredients 
            // пока что корзину в компонент не передаём.
            // позже начнём (когда реализуем 
            // функционал добавления ингредиента в корзину),
            // чтобы рассчитывать значения счётчиков на карточках
            // cart={cart}
            available={data} 
            addToCartHandler={addToCartHandler}
            cardClickHandler={cardClickHandler} 
          />
          <BurgerConstructor 
            // пока что добавляем в корзину всё что есть,
            // а потом внутри компонента случайно выбираем
            // булку и заданное число ингредиентов.
            // поменяем механику, когда реализуем 
            // функционал добавления ингредиента в корзину
            cart={data}
            orderClickHandler={orderClickHandler} 
          />
        </main>         
      }
      {
        isModalVisible && modalData &&
        <ModalOverlay 
          data={modalData}
          mode={modalMode}
          isVisible={isModalVisible}
          closeHandler={closeModal}
        />
      } 
    </div>
  );
};
