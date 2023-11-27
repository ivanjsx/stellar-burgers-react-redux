// libraries 
import PropTypes from "prop-types";

// styles
import styles from "./ingredient-icon.module.css";



function IngredientIcon({ imageSrc, isConcealed, concealedCount }) {
  return (
    <div className={styles.border}>
      <div 
        className={
          [
            styles.background,
            isConcealed ? styles.concealedBackground : ""
          ].join(" ")
        }
      >
        <img 
          src={imageSrc}
          alt="иконка ингредиента" 
          className={
            [
              styles.image,
              isConcealed ? styles.concealedImage : ""
            ].join(" ")            
          } 
        />
      </div>
      {
        isConcealed && 
        <p className={styles.concealedCount}>+{concealedCount}</p>
      }      
    </div>    
  );
};

IngredientIcon.propTypes = {
  imageSrc: PropTypes.string,
  isConcealed: PropTypes.bool,
  concealedCount: PropTypes.number,
};

export default IngredientIcon;
