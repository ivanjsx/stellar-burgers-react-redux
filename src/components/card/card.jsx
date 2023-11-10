// libraries
import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";

// components
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./card.module.css";

// utils
import { ingredientPropType } from "../../utils/prop-types";

// actions
import { openIngredientModal } from "../../services/modal-slice";



function Card({ ingredient, count }) {
  
  const dispatch = useDispatch();
  const ref = React.useRef();

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
    <div className={`${styles.container} ${isDragging ? styles.isDragging : ""}`}>
      <figure 
        ref={ref}
        className={styles.card} 
        onClick={
          () => {
            dispatch(openIngredientModal(ingredient));
          }
        }
      >
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
    </div>
  );
};

Card.propTypes = {
  ingredient: PropTypes.shape(ingredientPropType).isRequired,
  count: PropTypes.number.isRequired,
};

export default React.memo(Card);
