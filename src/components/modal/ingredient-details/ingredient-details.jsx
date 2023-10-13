// libraries
import PropTypes from "prop-types";

// components
import Nutrition from "./nutrition/nutrition";

// styles
import styles from "./ingredient-details.module.css";

// utils
import { ingredientPropType } from "../../../utils/prop-types";



function IngredientDetails({ ingredient }) {
  return (
    <div className={styles.container}>
      
      <figure className={styles.figure}>
        <img 
          src={ingredient.image_large} 
          alt={`фото ингредиента ${ingredient.name} энергетической ценностью ${ingredient.calories}`}
          className={styles.image} 
        />
        <figcaption className={styles.caption}>
          {ingredient.name}
        </figcaption>
      </figure>
      
      <ul className={styles.details}>
        <Nutrition name="Калории, ккал" value={ingredient.calories} />
        <Nutrition name="Белки, г" value={ingredient.proteins} />
        <Nutrition name="Жиры, г" value={ingredient.fat} />
        <Nutrition name="Углеводы, г" value={ingredient.carbohydrates} />
      </ul>
    
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(ingredientPropType).isRequired
};

export default IngredientDetails;
