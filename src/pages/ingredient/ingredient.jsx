// libraries
import React from "react";
import { useDispatch } from "react-redux";

// components
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

// styles
import styles from "./ingredient.module.css";

// actions 
import { openIngredientModal } from "../../services/modal-slice";



function IngredientPage() {
  
  // const dispatch = useDispatch();
  
  // React.useEffect(
  //   () => {
  //     dispatch(openIngredientModal());
  //   },
  //   []
  // );
  
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Детали ингредиента</h2>
      <IngredientDetails />
    </div> 
  );
};

export default IngredientPage;
