// libraries
import React from "react";
import PropTypes from "prop-types";

// components
import { TopRow } from "./row/row";
import { BottomRow } from "./row/row";
import { MiddleRow } from "./row/row";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./burger-constructor.module.css";

// utils
import { ingredientPropType } from "../../utils/prop-types";



function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
};

function getRandomElements(array, number) {
  let result = [];
  for (let i = 0; i < number; i++) {
    result.push(getRandomElement(array))
  }
  return result;
};



export default function BurgerConstructor({ data }) {

  const MemoizedIcon = React.memo(CurrencyIcon);

  const [chosenBun, setChosenBun] = React.useState(
    getRandomElement(
      data.filter(
        ingredient => ingredient.type === "bun"
      )
    )
  );

  const [chosenIngredients, setChosenIngredients] = React.useState(
    getRandomElements(
      data.filter(
        ingredient => ingredient.type !== "bun"
      ),
      7
    )
  );

  const [totalPrice, setTotalPrice] = React.useState(
    chosenIngredients.reduce(
      (cum, item) => cum + item.price, 
      0
    ) + chosenBun.price * 2
  );

  return (
    <section className={styles.constructor}>
      <ul className={styles.content}>
        <TopRow bun={chosenBun}/>
        <ul className={styles.contentScrollable}>
          {
            chosenIngredients.map(
              (ingredient, index) => {
                return <MiddleRow ingredient={ingredient} key={index} />
              }
            )
          }
        </ul>
        <BottomRow bun={chosenBun}/>
      </ul>
      <div className={styles.summary}>
        <p className={styles.price}>
          {totalPrice} <MemoizedIcon type="primary" />
        </p>        
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>        
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = PropTypes.exact(
  {
    data: PropTypes.arrayOf(
      ingredientPropType.isRequired      
    ).isRequired
  }
).isRequired;
