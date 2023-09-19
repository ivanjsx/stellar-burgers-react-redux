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

function getNRandomElements(array, number) {
  let result = [];
  for (let i = 0; i < number; i++) {
    result.push(getRandomElement(array))
  }
  return result;
};



export default function BurgerConstructor({ data }) {

  const MemoizedIcon = React.memo(CurrencyIcon);

  const [chosenBun, setChosenBun] = React.useState(null);
  const [chosenIngredients, setChosenIngredients] = React.useState([]);

  const chooseBun = React.useCallback(
    () => getRandomElement(
      data.filter(
        ingredient => ingredient.type === "bun"
      )
    ),
    [data]       
    );

  const chooseIngredients = React.useCallback(
    () => getNRandomElements(
      data.filter(
        ingredient => ingredient.type !== "bun"
      ),
      7
    ),
    [data]       
  );

  React.useEffect(
    () => {
      setChosenBun(chooseBun());
      setChosenIngredients(chooseIngredients());
    },
    [chooseBun, chooseIngredients]
  );

  const totalPrice = React.useMemo(
    () => {
      if (chosenBun && chosenIngredients.length) {
        return chosenIngredients.reduce(
          (acc, curr) => acc + curr.price, 0
        ) + chosenBun.price * 2;
      }
      return 0;
    },
    [chosenBun, chosenIngredients]
  );  

  return (
    <section className={styles.constructor}>
      <ul className={styles.content}>
        {chosenBun && <TopRow bun={chosenBun}/> }
        <li className={styles.scrollableContentContainer}>
          <ul className={styles.scrollableContent}>
            {
              chosenIngredients.map(
                (ingredient, index) => {
                  return <MiddleRow ingredient={ingredient} key={index} />
                }
              )
            }
          </ul>
        </li>
        {chosenBun && <BottomRow bun={chosenBun}/> }
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
