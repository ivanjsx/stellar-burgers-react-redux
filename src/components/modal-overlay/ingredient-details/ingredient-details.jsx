// libraries
import PropTypes from "prop-types";

// components
import Nutrition from "./nutrition/nutrition";

// styles
import styles from "./ingredient-details.module.css";



export default function IngredientDetails({ ingredient }) {
  return (
    <div className={styles.container}>
      
      <figure className={styles.figure}>
        <img 
          src={ingredient.image_large} 
          alt="фото ингредиента" 
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



IngredientDetails.propTypes = PropTypes.exact(
  {
    ingredient: PropTypes.shape(
      { 
        image_large: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired
      }
    ).isRequired
  }
).isRequired;
