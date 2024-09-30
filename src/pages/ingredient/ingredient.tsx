// libraries
import { FC } from "react";

// components
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

// styles
import styles from "./ingredient.module.css";



const IngredientPage: FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ingredient Details</h2>
      <IngredientDetails />
    </div> 
  );
};

export default IngredientPage;
