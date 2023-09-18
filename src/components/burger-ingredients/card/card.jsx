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



export default function Card({ info, count }) {
  const MemoizedIcon = React.memo(CurrencyIcon);
  return (
    <figure className={styles.card}>
      <img 
        src={info.image_large} 
        alt="фото ингредиента" 
        className={styles.image} 
      />
      <p className={styles.price}>
        {info.price} <MemoizedIcon type="primary" />
      </p>
      <figcaption className={styles.name}>
        {info.name}
      </figcaption>
      {
        count &&
        <Counter count={count} size="default" extraClass="m-1" />      
      }
    </figure>
  );
};

Card.propTypes = PropTypes.exact(
  {
    info: ingredientPropType.isRequired,
    count: PropTypes.number.isRequired
  }
).isRequired;
