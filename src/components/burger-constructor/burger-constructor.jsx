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
import rowStyles from "./row/row.module.css";

// utils
import { getRandomElement } from "../../utils/functions";
import { getNRandomElements } from "../../utils/functions";
import { ingredientPropType } from "../../utils/prop-types";

// constants
import { BUNS_IN_BURGER_COUNT } from "../../utils/constants";
import { CHOSEN_INGREDIENTS_COUNT } from "../../utils/constants";



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
      CHOSEN_INGREDIENTS_COUNT
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
        ) + chosenBun.price * BUNS_IN_BURGER_COUNT;
      }
      return 0;
    },
    [chosenBun, chosenIngredients]
  );  

  function deleteIngredient(index) {
    return event => {
      setChosenIngredients(
        chosenIngredients.toSpliced(index, 1)
      );              
      const currentRow = event.target.closest(`.${rowStyles.freeRow}`);
      currentRow.remove();
    }      
  };

  return (
    <section className={styles.constructor}>
      <ul className={styles.content}>
        {chosenBun && <TopRow bun={chosenBun}/> }
        <li className={styles.scrollableContentContainer}>
          <ul className={styles.scrollableContent}>
            {
              chosenIngredients.map(
                (ingredient, index) => {
                  return (
                    <MiddleRow 
                      key={index}
                      ingredient={ingredient} 
                      deleteHandler={deleteIngredient(index)}
                    />
                  )
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
