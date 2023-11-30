// libraries
import PropTypes from "prop-types";

// styles
import styles from "./ingredient-nutrition.module.css";



function IngredientNutrition({ name, value }) {
  return (
    <li className={styles.nutrition}>
      <p className={`${styles.text} ${styles.name}`}>{name}</p>
      <p className={`${styles.text} ${styles.value}`}>{value}</p>
    </li>
  );
};

IngredientNutrition.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default IngredientNutrition;
