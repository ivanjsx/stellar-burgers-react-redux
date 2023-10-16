// libraries
import { useSelector } from "react-redux";

// components
import Nutrition from "./nutrition/nutrition";

// styles
import styles from "./ingredient-details.module.css";



function IngredientDetails() {

  const { previewableContent } = useSelector(state => state.modal);

  return (
    <div className={styles.container}>
      
      <figure className={styles.figure}>
        <img 
          src={previewableContent.image_large} 
          alt={`фото ингредиента ${previewableContent.name} энергетической ценностью ${previewableContent.calories}`}
          className={styles.image} 
        />
        <figcaption className={styles.caption}>
          {previewableContent.name}
        </figcaption>
      </figure>
      
      <ul className={styles.details}>
        <Nutrition name="Калории, ккал" value={previewableContent.calories} />
        <Nutrition name="Белки, г" value={previewableContent.proteins} />
        <Nutrition name="Жиры, г" value={previewableContent.fat} />
        <Nutrition name="Углеводы, г" value={previewableContent.carbohydrates} />
      </ul>
    
    </div>
  );
};

export default IngredientDetails;
