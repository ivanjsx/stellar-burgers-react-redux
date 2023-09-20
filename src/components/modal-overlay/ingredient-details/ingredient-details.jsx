// libraries
import PropTypes from "prop-types";

// components
import Nutrition from "./nutrition/nutrition";

// styles
import styles from "./ingredient-details.module.css";



export default function IngredientDetails({ info }) {
  return (
    <div className={styles.container}>
      
      <figure className={styles.figure}>
        <img 
          src={info.image_large} 
          alt="фото ингредиента" 
          className={styles.image} 
        />
        <figcaption className={styles.caption}>
          {info.name}
        </figcaption>
      </figure>
      
      <ul className={styles.details}>
        <Nutrition name="Калории, ккал" value={info.calories} />
        <Nutrition name="Белки, г" value={info.proteins} />
        <Nutrition name="Жиры, г" value={info.fat} />
        <Nutrition name="Углеводы, г" value={info.carbohydrates} />
      </ul>
    
    </div>
  );
};



IngredientDetails.propTypes = PropTypes.exact(
  {
    info: PropTypes.shape(
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
