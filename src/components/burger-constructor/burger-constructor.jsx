// libraries
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { memo, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Modal from "../modal/modal";
import BunRow from "../bun-row/bun-row";
import ToppingRow from "../topping-row/topping-row";
import OrderDetails from "../order-details/order-details";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./burger-constructor.module.css";

// constants
import { BUNS_IN_BURGER_COUNT, LOGIN_PAGE_ABSOLUTE_PATH } from "../../utils/constants";

// actions
import { 
  emptyCart, 
  addTopping, 
  setChosenBun, 
  removeTopping, 
} from "../../services/burger-constructor/burger-constructor-slice";
import { resetPreviewableOrder } from "../../services/create-order/create-order-slice";
import { requestOrderPlacement } from "../../services/create-order/create-order-thunks";

// selectors
import { 
  defaultUserSelector, 
  defaultCreateOrderSelector,
  defaultBurgerConstructorSelector,
} from "../../services/selectors";



function BurgerConstructor() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(defaultUserSelector);
  const { previewableOrder } = useSelector(defaultCreateOrderSelector);
  const { chosenBun, chosenToppings, canPlaceOrder } = useSelector(defaultBurgerConstructorSelector);
  
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
  
  const totalPrice = useMemo(
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
  
  const placeOrder = useCallback(
    () => {
      if (!currentUser) {
        navigate(LOGIN_PAGE_ABSOLUTE_PATH);
        return;
      };
      if (canPlaceOrder) {
        dispatch(
          requestOrderPlacement(
            [chosenBun, ...chosenToppings].map(
              ingredient => ingredient._id
            )
          )
        ).then(
          () => {
            dispatch(emptyCart());
          }
        );
      };
    },
    [currentUser, canPlaceOrder, chosenBun, chosenToppings]
  );
  
  return (
    <>
      <section className={styles.constructor}>
        <div 
          className={`${styles.shadowWrapper} ${canDrop ? styles.welcomingShadow : ""}`}
          ref={dropTargetRef}
        >
          <ul className={styles.content}>
            
            <BunRow type="top" />
            <li className={styles.scrollableContentContainer}>
              <ul className={styles.scrollableContent}>
                {
                  chosenToppings.length === 0
                  ? (
                    <ToppingRow isThumbnail={true} />
                  ) : chosenToppings.map(
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
            <BunRow type="bottom" />
            
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
      
      {
        previewableOrder && (
          <Modal 
            heading=""
            children={<OrderDetails />} 
            closeHandler={
              () => { 
                dispatch(resetPreviewableOrder());
              }
            }
          />
        )
      }    
    </>    
  );
};

export default memo(BurgerConstructor);
