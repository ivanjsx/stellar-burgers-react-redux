// libraries
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { memo, useMemo, useCallback, FC } from "react";

// components
import Modal from "../modal/modal";
import BurgerBunRow from "../burger-bun-row/burger-bun-row";
import OrderCreation from "../order-creation/order-creation";
import BurgerToppingRow from "../burger-topping-row/burger-topping-row";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./burger-constructor.module.css";

// urls
import { LOGIN_PAGE_ABSOLUTE_PATH } from "../../utils/urls";

// constants 
import { BUNS_IN_BURGER_COUNT } from "../../utils/constants";

// actions
import { 
  emptyCart, 
  addTopping, 
  setChosenBun, 
  removeTopping, 
} from "../../services/burger-constructor/burger-constructor-slice";
import { createOrder } from "../../services/order-creation/order-creation-thunks";
import { resetCreatedOrder } from "../../services/order-creation/order-creation-slice";

// selectors
import { 
  defaultUserSelector, 
  defaultOrderCreationSelector,
  defaultBurgerConstructorSelector,
} from "../../services/selectors";

// hooks
import { useAppSelector, useAppDispatch } from "../../services/store";

// types 
import { IngredientType } from "../../utils/types";



const BurgerConstructor: FC = () => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(defaultUserSelector);
  const { createdOrder } = useAppSelector(defaultOrderCreationSelector);
  const { chosenBun, chosenToppings, canPlaceOrder } = useAppSelector(defaultBurgerConstructorSelector);
  
  const [{ canDrop }, dropTargetRef] = useDrop(
    {
      accept: "ingredient",
      drop(item: IngredientType) {
        if (item.type === "bun") {
          dispatch(setChosenBun(item));
        } else {
          dispatch(addTopping(item));
        };
      },
      collect: (monitor) => (
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
          createOrder(
            Array(BUNS_IN_BURGER_COUNT).fill(chosenBun).concat(chosenToppings).map(
              (ingredient) => ingredient._id
            )
          )
        ).then(
          () => {
            dispatch(emptyCart());
          }
        );
      };
    },
    [currentUser, canPlaceOrder, chosenBun, chosenToppings, dispatch, navigate]
  );
  
  return (
    <>
      <div 
        className={`${styles.shadowWrapper} ${canDrop ? styles.welcomingShadow : ""}`}
        ref={dropTargetRef}
      >
        <ul className={styles.content}>
          
          <BurgerBunRow type="top" />
          <li className={styles.scrollableContentContainer}>
            <ul className={styles.scrollableContent}>
              {
                chosenToppings.length === 0
                ? (
                  <BurgerToppingRow isThumbnail={true} />
                ) : chosenToppings.map(
                  (topping, index) => (
                    <BurgerToppingRow 
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
          <BurgerBunRow type="bottom" />
          
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
      
      {
        createdOrder && (
          <Modal 
            children={<OrderCreation />} 
            closeHandler={
              () => { 
                dispatch(resetCreatedOrder());
              }
            }
          />
        )
      }    
    </>    
  );
};

export default memo(BurgerConstructor);
