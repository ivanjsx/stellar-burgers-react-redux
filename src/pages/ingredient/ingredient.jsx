// components
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

// styles
import styles from "./ingredient.module.css";



function IngredientPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Детали ингредиента</h2>
      <IngredientDetails />
    </div> 
  );
};

export default IngredientPage;
