// libraries
import PropTypes from "prop-types";

// components
import Card from "../card/card";

// styles
import styles from "./gallery.module.css";

// utils
import { ingredientPropType } from "../../../utils/prop-types";

// constants
import { DEFAULT_INGREDIENT_QUANTITY } from "../../../utils/constants";



export default function Gallery({ id, title, cardClickHandler, ingredients }) {
  return (
    <>
      <h2 className={styles.heading} id={id}>
        {title}
      </h2>    
      <ul className={styles.gallery}>
        {
          ingredients.map(
            ingredient => (
              <Card 
                ingredient={ingredient} 
                key={ingredient._id} 
                onClick={cardClickHandler}
                count={DEFAULT_INGREDIENT_QUANTITY} 
              />
            )
          )
        }
      </ul>
    </>
  );
};

Gallery.propTypes = PropTypes.exact(
  {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      ingredientPropType.isRequired      
    ).isRequired
  }
).isRequired;
