// libraries
import React from "react";
import PropTypes from "prop-types";

// components
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./card.module.css";

// utils
import { ingredientPropType } from "../../../utils/prop-types";



export default function Card({ ingredient, count, onClick, addToCart }) {
  const MemoizedIcon = React.memo(CurrencyIcon);
  return (
    <div className={styles.container}>
      <figure className={styles.card} onClick={onClick}>
        <img 
          src={ingredient.image_large} 
          alt="фото ингредиента" 
          className={styles.image} 
        />
        <p className={styles.price}>
          {ingredient.price} <MemoizedIcon type="primary" />
        </p>
        <figcaption className={styles.name}>
          {ingredient.name}
        </figcaption>
      </figure>
      {count && <Counter count={count} size="default" />}
    </div>
  );
};



Card.propTypes = PropTypes.exact(
  {
    ingredient: ingredientPropType.isRequired,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
  }
).isRequired;
