// libraries
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// components
import Card from "../card/card";

// styles
import styles from "./gallery.module.css";



function Gallery({ category, title }) {
  
  const { availableIngredientsStock } = useSelector(state => state.burgerIngredients);
  const { chosenBun, chosenToppings } = useSelector(state => state.burgerConstructor);
  
  const countIngredient = React.useCallback(
    ingredient => {
      let result = chosenBun ? Number(chosenBun._id === ingredient._id) : 0;
      return chosenToppings.reduce(
        (accumulator, current) => accumulator + Number(current._id === ingredient._id), result
      );
    },
    [chosenBun, chosenToppings]
  );
  
  return (
    <>
      <h2 className={styles.heading} id={category}>
        {title}
      </h2>    
      <ul className={styles.gallery}>
        {
          availableIngredientsStock.filter(
            ingredient => ingredient.type === category
          ).map(
            ingredient => (
              <Card 
                key={ingredient._id} 
                ingredient={ingredient} 
                count={countIngredient(ingredient)}
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
