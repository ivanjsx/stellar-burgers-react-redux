// libraries
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// components
import Card from "../card/card";

// styles
import styles from "./gallery.module.css";



function Gallery({ category, title }) {
  
  const { availableIngredientsStock } = useSelector(state => state.burgerIngredients);
  const { chosenBun, chosenToppings } = useSelector(state => state.burgerConstructor);
  
  return (
    <>
      <h2 className={styles.heading} id={category}>
        {title}
      </h2>    
      <ul className={styles.gallery}>
        {
          availableIngredientsStock.filter(
            availableIngredient => availableIngredient.type === category
          ).map(
            availableIngredient => (
              <Card 
                key={availableIngredient._id} 
                ingredient={availableIngredient} 
                count={
                  [chosenBun, ...chosenToppings].filter(
                    chosenIngredient => chosenIngredient._id === availableIngredient._id
                  ).length
                }
              />
            )
          )
        }
      </ul>
    </>
  );
};

Gallery.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Gallery;
