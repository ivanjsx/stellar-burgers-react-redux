// libraries
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

// components
import BunRow from "./bun-row/bun-row";
import ToppingRow from "./topping-row/topping-row";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./burger-constructor.module.css";

// constants
import { BUNS_IN_BURGER_COUNT } from "../../utils/constants";

// actions
import { openModalInOrderMode } from "../../services/modal-slice";
import { 
  emptyCart, 
  setChosenBun, 
  removeTopping, 
  addTopping, 
  requestOrderPlacement 
} from "../../services/burger-constructor-slice";



function BurgerConstructor() {
  
  const dispatch = useDispatch();
  const { chosenBun, chosenToppings, canPlaceOrder, placedOrder } = useSelector(state => state.burgerConstructor);
  
  const [{ canDrop }, dropTargetRef] = useDrop(
    {
      accept: "ingredient",
      drop(item) {
        if (item.type === "bun") {
          dispatch(setChosenBun(item));
        } else {
          dispatch(addTopping(item));
        };
      },
      collect: monitor => (
        {
          canDrop: monitor.canDrop()
        }
      )
    }
  );
  
  const totalPrice = React.useMemo(
    () => {
      const outcome = chosenBun 
                      ? chosenBun.price * BUNS_IN_BURGER_COUNT 
                      : 0;
      return chosenToppings.reduce(
        (accumulator, current) => accumulator + current.price, outcome
      );    
    },
    [chosenBun, chosenToppings]
  );
  
  const placeOrder = React.useCallback(
    () => {
      if (canPlaceOrder) {
        dispatch(
          requestOrderPlacement(
            [chosenBun, ...chosenToppings].map(
              ingredient => ingredient._id
            )
          )
        ).then(
          () => {
            dispatch(openModalInOrderMode(placedOrder));
          }
        ).then(
          () => {
            dispatch(emptyCart());
          }
        );
      };
    },
    [canPlaceOrder, chosenBun, chosenToppings, placedOrder]
  );
  
  return (
    <section className={styles.constructor}>
      <div 
        className={`${styles.shadowWrapper} ${canDrop ? styles.welcomingShadow : ""}`}
        ref={dropTargetRef}
      >
          <ul className={styles.content}>
          
          {chosenBun && <BunRow type="top" />}
          {
            chosenToppings.length > 0 && 
            <li className={styles.scrollableContentContainer}>
              <ul className={styles.scrollableContent}>
                {
                  chosenToppings.map(
                    (topping, index) => (
                      <ToppingRow 
                        key={topping._uuidv4}
                        index={index}
                        topping={topping} 
                        deleteHandler={
                          () => {
                            dispatch(removeTopping(index));
                          }
                        }
                      />
                    )
                  )
                }
              </ul>
            </li>
          }
          {chosenBun && <BunRow type="bottom" />}
          
        </ul>
      </div>
      
      <div className={styles.summary}>
        <p className={styles.price}>
          {totalPrice} <CurrencyIcon type="primary" />
        </p>        
        <Button 
          size="large" 
          type="primary" 
          htmlType="button" 
          onClick={placeOrder}
          disabled={!canPlaceOrder}
            children="Оформить заказ"
          />
      </div>
      
    </section>
  );
};

export default React.memo(BurgerConstructor);
