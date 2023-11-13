// libraries
import { DndProvider } from "react-dnd";
import { useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";

// components
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

// pages
import { LoadingPage, ErrorPage } from "../../pages";

// styles
import styles from "./home.module.css";




function HomePage() {
  
  const { errorRequestingIngredients, pendingRequestingIngredients } = useSelector(
    state => state.burgerIngredients
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
