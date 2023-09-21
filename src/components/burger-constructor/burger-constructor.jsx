// libraries
import React from "react";
import PropTypes from "prop-types";

// components
import { MemoizedTopRow } from "./row/row";
import { MemoizedBottomRow } from "./row/row";
import { MiddleRow } from "./row/row";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./burger-constructor.module.css";

// utils
import { getRandomElement } from "../../utils/functions";
import { getNRandomElements } from "../../utils/functions";
import { ingredientPropType } from "../../utils/prop-types";

// constants
import { BUNS_IN_BURGER_COUNT } from "../../utils/constants";
import { CHOSEN_INGREDIENTS_COUNT } from "../../utils/constants";



function BurgerConstructor({ cart, orderClickHandler }) {

  // значения будут браться из пропсов после того как
  // реализуется функционал добавления в корзину
  const [chosenBun, setChosenBun] = React.useState(null);
  const [chosenIngredients, setChosenIngredients] = React.useState([]);

  // функция будет удалена после того как 
  // реализуется функционал добавления в корзину
  const chooseBun = React.useCallback(
    () => getRandomElement(
      cart.filter(
        ingredient => ingredient.type === "bun"
      )
    ),
    [cart]       
  );

  // функция будет удалена после того как 
  // реализуется функционал добавления в корзину  
  const chooseIngredients = React.useCallback(
    () => getNRandomElements(
      cart.filter(
        ingredient => ingredient.type !== "bun"
      ),
      CHOSEN_INGREDIENTS_COUNT
    ),
    [cart]       
  );

  // значения будут браться из пропсов после того как
  // реализуется функционал добавления в корзину  
  React.useEffect(
    () => {
      setChosenBun(chooseBun());
      setChosenIngredients(chooseIngredients());
    },
    [chooseBun, chooseIngredients]
  );

  // функция будет вынесена в родительский компонент после того как
  // реализуется функционал добавления в корзину
  function deleteIngredient(index) {
    return () => {
      setChosenIngredients(
        chosenIngredients.toSpliced(index, 1)
      );
    };
  };

  function computeTotalPrice() {
    let result = 0;
    if (chosenBun) {
      result += chosenBun.price * BUNS_IN_BURGER_COUNT;
    };
    if (chosenIngredients.length) {
      result += chosenIngredients.reduce(
        (acc, curr) => acc + curr.price, 0
      );
    };
    return result;
  };

  return (
    <section className={styles.constructor}>
      <ul className={styles.content}>

        {chosenBun && <MemoizedTopRow bun={chosenBun}/> }
        
        <li className={styles.scrollableContentContainer}>
          <ul className={styles.scrollableContent}>
            {
              chosenIngredients.map(
                (ingredient, index) => (
                  <MiddleRow 
                    key={index}
                    ingredient={ingredient} 
                    deleteHandler={deleteIngredient(index)}
                  />
                )
              )
            }
          </ul>
        </li>
        
        {chosenBun && <MemoizedBottomRow bun={chosenBun} />}
      
      </ul>
      
      <div className={styles.summary}>
        <p className={styles.price}>
          {computeTotalPrice()} <CurrencyIcon type="primary" />
        </p>        
        <Button 
          htmlType="button" 
          type="primary" 
          size="large" 
          onClick={orderClickHandler}
        >
          Оформить заказ
        </Button>   
      </div>
    
    </section>
  );
};

BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape(ingredientPropType)
  ).isRequired,
  orderClickHandler: PropTypes.func.isRequired
};

const MemoizedBurgerConstructor = React.memo(BurgerConstructor);
export default MemoizedBurgerConstructor;
