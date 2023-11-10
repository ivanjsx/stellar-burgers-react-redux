// libraries
import React from "react";
import { DndProvider } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";

// components
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

// pages
import { LoadingPage, ErrorPage } from "../../pages";

// styles
import styles from "./home.module.css";

// actions
import { requestAvailableIngredientsStock } from "../../services/burger-ingredients-slice";



function HomePage() {
  
  const dispatch = useDispatch();
  
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
  
  if (errorRequestingIngredients) {
    return <ErrorPage title={"Что-то пошло не так!"} showTips={true} />;
  };
  
  if (pendingRequestingIngredients) {
    return <LoadingPage />;
  };

  return (
    <>
      <h1 className={styles.heading}>
        Соберите бургер
      </h1>            
      <div className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>           
    </>
  );

};

export default HomePage;
