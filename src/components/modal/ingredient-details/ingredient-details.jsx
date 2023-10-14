// libraries
import { useSelector } from "react-redux";

// components
import Nutrition from "./nutrition/nutrition";

// styles
import styles from "./ingredient-details.module.css";



function IngredientDetails() {

  const { previewableIngredient } = useSelector(state => state.modal);

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
