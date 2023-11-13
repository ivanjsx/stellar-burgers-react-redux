// libraries
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// components
import Nutrition from "../nutrition/nutrition";

// styles
import styles from "./ingredient-details.module.css";

// pages 
import { ErrorPage } from "../../pages";



function IngredientDetails() {
  
  const { ingredientId } = useParams();

  const previewableIngredientSelector = React.useCallback(
    state => state.burgerIngredients.availableIngredientsStock.filter(
      ingredient => ingredient._id === ingredientId
    )[0],
    [ingredientId]
  ); 

  const previewableIngredient = useSelector(previewableIngredientSelector);
  
  if (!previewableIngredient) {
    return <ErrorPage title={"Что-то пошло не так!"} showTips={true} />;
  };

  return (
    <div className={styles.container}>
      
      <figure className={styles.figure}>
        <img 
          src={previewableIngredient.image_large} 
          alt={`фото ингредиента ${previewableIngredient.name} энергетической ценностью ${previewableIngredient.calories}`}
          className={styles.image} 
        />
        <figcaption className={styles.caption}>
          {previewableIngredient.name}
        </figcaption>
      </figure>
      
      <ul className={styles.details}>
        <Nutrition name="Калории, ккал" value={previewableIngredient.calories} />
        <Nutrition name="Белки, г" value={previewableIngredient.proteins} />
        <Nutrition name="Жиры, г" value={previewableIngredient.fat} />
        <Nutrition name="Углеводы, г" value={previewableIngredient.carbohydrates} />
      </ul>
    
    </div>
  );
};

export default IngredientDetails;
