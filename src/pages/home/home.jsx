// libraries
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// components
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

// pages
import { LoadingPage, ErrorPage } from "../../pages";

// styles
import styles from "./home.module.css";

// selectors
import { defaultBurgerIngredientsSelector } from "../../services/selectors";

// hooks
import { useAppSelector } from "../../services/store";



function HomePage() {
  
  const { errorRequestingIngredients, pendingRequestingIngredients } = useAppSelector(
    defaultBurgerIngredientsSelector
  );  
  
  if (errorRequestingIngredients) {
    return <ErrorPage title="Что-то пошло не так!" showTips={true} />;
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
          <section className={styles.ingredients}>
            <BurgerIngredients />
          </section>
          <section className={styles.constructor}>
            <BurgerConstructor />
          </section>
        </DndProvider>
      </div>           
    </>
  );
};

export default HomePage;
