// libraries
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { memo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// components
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./ingredient-card.module.css";

// utils
import { ingredientPropType } from "../../utils/prop-types";

// constants 
import { INGREDIENT_PAGE_ABSOLUTE_PATH } from "../../utils/constants";



function IngredientCard({ ingredient, count }) {
  
  const location = useLocation();
  const targetPath = INGREDIENT_PAGE_ABSOLUTE_PATH.split(":")[0].concat(ingredient._id);
  
  const ref = useRef();
  
  const [{ isDragging }, dragRef] = useDrag(
    {
      type: "ingredient",
      item: ingredient,
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })      
    }
  );
  
  dragRef(ref);  
  
  return (
    <li className={`${styles.container} ${isDragging ? styles.isDragging : ""}`}>
      <Link
        to={targetPath}
        state={{ background: location }}
        className={styles.link}
      >
        <figure ref={ref} className={styles.figure}>
          <img 
            src={ingredient.image_large} 
            alt={`фото ингредиента ${ingredient.name} стоимостью ${ingredient.price}`}
            className={styles.image} 
          />
          <p className={styles.price}>
            {ingredient.price} <CurrencyIcon type="primary" />
          </p>
          <figcaption className={styles.name}>
            {ingredient.name}
          </figcaption>
        </figure>
        {count > 0 && <Counter count={count} size="default" />}
      </Link>    
    </li>
  );
};

IngredientCard.propTypes = {
  ingredient: PropTypes.shape(ingredientPropType).isRequired,
  count: PropTypes.number.isRequired,
};

export default memo(IngredientCard);
