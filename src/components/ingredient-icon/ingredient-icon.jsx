// libraries 
import PropTypes from "prop-types";

// styles
import styles from "./ingredient-icon.module.css";



function IngredientIcon({ imageSrc }) {
  return (
    <div className={styles.border}>
      <div className={styles.background}>
        <img 
          className={styles.image} 
          alt="иконка ингредиента" 
          src={imageSrc}
        />
      </div>
    </div>    
  );
};

IngredientIcon.propTypes = {
  imageSrc: PropTypes.string
};

export default IngredientIcon;
