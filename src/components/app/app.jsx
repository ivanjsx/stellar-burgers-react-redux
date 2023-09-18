// components
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

// styles
import styles from "./app.module.css";

// data
import { data } from "../../utils/data";



export default function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={styles.heading}>
        Соберите бургер
      </h1>
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
};
