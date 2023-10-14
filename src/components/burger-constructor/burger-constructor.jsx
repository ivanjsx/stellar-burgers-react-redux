// libraries
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

// components
import { TopRow } from "./row/row";
import { BottomRow } from "./row/row";
import { MiddleRow } from "./row/row";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./burger-constructor.module.css";

// constants
import { BUNS_IN_BURGER_COUNT } from "../../utils/constants";

// actions
import { openModalInOrderMode } from "../../services/modal-slice";
import { setChosenBun, addTopping, removeTopping, fetchOrderPlacement, emptyCart } from "../../services/burger-constructor-slice";



function BurgerConstructor() {
  
  const dispatch = useDispatch();
  const { chosenBun, chosenToppings, canPlaceOrder, placedOrder } = useSelector(state => state.burgerConstructor);
  
  const [{ canDrop, isOver }, dropTargetRef] = useDrop(
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
          canDrop: monitor.canDrop(),
          isOver: monitor.isOver()
        }
      )
    }
  );
  
  const totalPrice = React.useMemo(
    () => {
      const result = chosenBun ? chosenBun.price * BUNS_IN_BURGER_COUNT : 0;
      return chosenToppings.reduce(
        (accumulator, current) => accumulator + current.price, result
      );    
    },
    [chosenBun, chosenToppings]
  );
  
  function placeOrder() {
    dispatch(
      fetchOrderPlacement(
        [chosenBun, ...chosenToppings].map(
          ingredient => ingredient._id
        )
      )
    ).then(
      () => {
        dispatch(openModalInOrderMode(placedOrder))
      }
    ).then(
      () => {
        dispatch(emptyCart())
      }
    );
  };
  
  return (
    <section className={styles.constructor}>
      <ul 
        className={`${styles.content} ${canDrop ? styles.invitingShadow : ""} ${isOver ? styles.welcomingShadow : ""}`} 
        ref={dropTargetRef}
      >
        
        {chosenBun && <TopRow /> }
        
        <li className={styles.scrollableContentContainer}>
          <ul className={styles.scrollableContent}>
            {
              chosenToppings.map(
                (topping, index) => (
                  <MiddleRow 
                    key={index}
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
        
        {chosenBun && <BottomRow />}
        
      </ul>
      
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
        >
          Оформить заказ
        </Button>   
      </div>
      
    </section>
  );
};

export default React.memo(BurgerConstructor);
