// libraries
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// components
import Card from "../card/card";

// constants
import { BUNS_IN_BURGER_COUNT } from "../../../utils/constants";

// styles
import styles from "./gallery.module.css";



const Gallery = React.forwardRef(
  ({ category, title }, ref) => {
    
    const { availableIngredientsStock } = useSelector(state => state.burgerIngredients);
    const { chosenBun, chosenToppings } = useSelector(state => state.burgerConstructor);
    
    const countIngredient = React.useCallback(
      ingredient => {
        let outcome = chosenBun 
                      ? Number(chosenBun._id === ingredient._id) * BUNS_IN_BURGER_COUNT 
                      : 0;
        return chosenToppings.reduce(
          (accumulator, current) => accumulator + Number(current._id === ingredient._id), outcome
        );
      },
      [chosenBun, chosenToppings]
    );
    
    return (
      <div id={category} ref={ref}>
        <h2 className={styles.heading}>
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
      </div>
    );    
  }
);

Gallery.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Gallery;
