// libraries
import React from "react";
import { DndProvider } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";

// components
import Modal from "../modal/modal";
import AppHeader from "../app-header/app-header";
import OrderDetails from "../modal/order-details/order-details";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";

// styles
import styles from "./app.module.css";

// actions
import { fetchAvailableIngredientsStock } from "../../services/burger-ingredients-slice";



function App() {
  
  const dispatch = useDispatch();
  
  const { modalMode, modalIsVisible } = useSelector(state => state.modal);
  
  const { 
    errorFetchingIngredients,
    availableIngredientsStock,
    pendingFetchingIngredients,
  } = useSelector(state => state.burgerIngredients);  
  
  React.useEffect(
    () => {
      dispatch(fetchAvailableIngredientsStock());
    },
    []
  );
  
  return (
    <section className={styles.app}>
      <AppHeader />
      <h1 className={styles.heading}>
        Соберите бургер
      </h1>
      {
        !errorFetchingIngredients &&
        !pendingFetchingIngredients &&
        availableIngredientsStock &&
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>         
      }
      {
        modalIsVisible && 
        <Modal>
          {
            modalMode === "order"
            ? <OrderDetails />
            : <IngredientDetails />
          }
        </Modal>
      }
    </section>
  );
};

export default App;
