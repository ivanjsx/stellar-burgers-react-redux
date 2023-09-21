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



export default function Gallery({ id, title, addToCartHandler, cardClickHandler, ingredients }) {
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
                key={ingredient._id} 
                ingredient={ingredient} 
                count={DEFAULT_INGREDIENT_QUANTITY} 
                onClick={cardClickHandler(ingredient)}
                addToCart={addToCartHandler(ingredient)}                
              />
            )
          )
        }
      </ul>
    </>
  );
};



Gallery.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  addToCartHandler: PropTypes.func.isRequired,
  cardClickHandler: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape(ingredientPropType)
  ).isRequired
};
