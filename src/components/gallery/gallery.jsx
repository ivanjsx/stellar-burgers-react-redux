// libraries
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { memo, useMemo, useCallback, forwardRef } from "react";

// components
import Card from "../card/card";

// constants
import { BUNS_IN_BURGER_COUNT } from "../../utils/constants";

// styles
import styles from "./gallery.module.css";

// selectors
import { 
  defaultBurgerIngredientsSelector,
  defaultBurgerConstructorSelector,
} from "../../services/selectors";



const Gallery = forwardRef(
  ({ category, title }, ref) => {
    
    const { availableIngredientsStock } = useSelector(defaultBurgerIngredientsSelector);
    const { chosenBun, chosenToppings } = useSelector(defaultBurgerConstructorSelector);
    
    const countIngredient = useCallback(
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

    const items = useMemo(
      () => availableIngredientsStock.filter(ingredient => ingredient.type === category),
      [availableIngredientsStock, category]
    );

    const content = useMemo(
      () => items.map(
        ingredient => <Card 
                        key={ingredient._id} 
                        ingredient={ingredient} 
                        count={countIngredient(ingredient)}
                      />
      ),
      [items, countIngredient]
    );
    
    return (
      <div id={category} ref={ref} className={styles.container}>
        <h2 className={styles.heading}>
          {title}
        </h2>    
        <ul className={styles.gallery}>
          {content}
        </ul>
      </div>
    );    
  }
);

Gallery.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default memo(Gallery);
