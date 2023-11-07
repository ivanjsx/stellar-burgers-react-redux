// libraries
import React from "react";
import { DndProvider } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";

// components
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/modal/order-details/order-details";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import IngredientDetails from "../../components/modal/ingredient-details/ingredient-details";

// styles
import styles from "./home.module.css";

// actions
import { requestAvailableIngredientsStock } from "../../services/burger-ingredients-slice";



function HomePage() {
  
  const dispatch = useDispatch();
  
  const { modalMode, modalIsVisible } = useSelector(
    state => state.modal
  );
  const { errorRequestingIngredients, pendingRequestingIngredients } = useSelector(
    state => state.burgerIngredients
  );  
  
  React.useEffect(
    () => {
      dispatch(requestAvailableIngredientsStock());
    },
    // eslint-disable-next-line
    []
  );
  
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Соберите бургер
      </h1>        
      {
        !errorRequestingIngredients &&
        !pendingRequestingIngredients &&
        <div className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>         
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
    </div>
  );
};

export default HomePage;
