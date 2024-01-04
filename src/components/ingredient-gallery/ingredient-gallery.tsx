// libraries
import { memo, useMemo, useCallback, forwardRef } from "react";

// components
import IngredientCard from "../ingredient-card/ingredient-card";

// constants
import { BUNS_IN_BURGER_COUNT } from "../../utils/constants";

// styles
import styles from "./ingredient-gallery.module.css";

// selectors
import { 
  defaultBurgerIngredientsSelector,
  defaultBurgerConstructorSelector,
} from "../../services/selectors";

// hooks
import { useAppSelector } from "../../services/store";

// types 
import { IngredientType } from "../../utils/types";



type PropsType = Readonly<{
  title: string,
  category: IngredientType["type"],
}>;



const IngredientGallery = forwardRef<HTMLDivElement, PropsType>(
  ({ category, title }, ref) => {
    
    const { availableStock } = useAppSelector(defaultBurgerIngredientsSelector);
    const { chosenBun, chosenToppings } = useAppSelector(defaultBurgerConstructorSelector);
    
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
      () => [...availableStock.values()].filter(ingredient => ingredient.type === category),
      [availableStock, category]
    );
    
    const content = useMemo(
      () => items.map(
        ingredient => <IngredientCard 
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

export default memo(IngredientGallery);
