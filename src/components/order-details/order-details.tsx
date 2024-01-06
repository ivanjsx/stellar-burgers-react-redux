// libraries
import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

// components 
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./order-details.module.css";

// pages 
import { ErrorPage } from "../../pages";

// selectors 
import { 
  defaultOrderFeedSelector,
  defaultOrderDetailsSelector, 
  defaultBurgerIngredientsSelector,
} from "../../services/selectors";

// actions 
import { getOrderByNumber } from "../../services/order-details/order-details-thunks";

// utils 
import { ORDER_STATUSES } from "../../utils/order-statuses";

// hooks
import { useAppSelector, useAppDispatch } from "../../services/store";



const OrderDetails: FC = () => {
  
  const dispatch = useAppDispatch();
  const { orderNumber } = useParams();
  
  const { orders } = useAppSelector(
    defaultOrderFeedSelector
  );
  
  useEffect(
    () => {
      if (!orders.get(Number(orderNumber))) {
        dispatch(
          getOrderByNumber(Number(orderNumber))
        );
      };
    },
    [orders, orderNumber, dispatch]
  );  
  
  const { fetchedOrder } = useAppSelector(
    defaultOrderDetailsSelector
  );
  
  const previewableOrder = useMemo(
    () => {
      if (orders.get(Number(orderNumber))) {
        return orders.get(Number(orderNumber));
      };      
      return fetchedOrder;
    },
    [orders, orderNumber, fetchedOrder]
  );
  
  const { availableStock } = useAppSelector(
    defaultBurgerIngredientsSelector
  );
  
  const quantities = useMemo(
    () => {
      let quantities: { [id in string]: number } = {};
      if (previewableOrder) {
        previewableOrder.ingredients.forEach(
          (id) => {
            if (quantities[id]) {
              quantities[id] += 1;
            } else {
              quantities[id] = 1;
            };
          }
        );
      };
      return quantities;
    },
    [previewableOrder]
  );
  
  const totalPrice = useMemo(
    () => {
      if (previewableOrder) {
        return previewableOrder.ingredients.reduce(
          (accumulator, current) => {
            const ingredient = availableStock.get(current);
            return ingredient ? accumulator + ingredient.price : 0
          }, 0
        );
      };
      return 0;
    },
    [previewableOrder, availableStock]
  );    
  
  if (!previewableOrder) {
    return <ErrorPage title="Такой заказ не найден!" showTips={true} />;
  };
  
  if (
    Object.keys(quantities).some(
      (ingredient) => !availableStock.has(ingredient)
    )
  ) {
    return <ErrorPage title="В заказе неизвестные ингредиенты!" showTips={true} />;
  };
  
  return (
    <div className={styles.container}>
      
      <p className={styles.number}>#{previewableOrder.number}</p>
      <h3 className={styles.name}>{previewableOrder.name}</h3>
      <p 
        className={
          [
            styles.status, 
            previewableOrder.status === ORDER_STATUSES.done.original ? styles.statusDone : ""
          ].join(" ")
        }
      >
        {ORDER_STATUSES[previewableOrder.status].decoded}
      </p>
      <h3 className={styles.header}>Состав:</h3>
      
      <div className={styles.scrollableContainer}>
        <ul className={styles.contains}>
          {
            Object.entries(quantities).map(
              ([ingredient, quantity]) => (
                <li 
                  key={ingredient}
                  className={styles.ingredient}
                >
                  <IngredientIcon imageSrc={availableStock.get(ingredient)?.image_large} />
                  <p className={styles.title}>{availableStock.get(ingredient)?.name}</p>
                  <p className={styles.price}>
                    <span>{quantity}</span>
                    <span>x</span>
                    <span>{availableStock.get(ingredient)?.price}</span>
                    <CurrencyIcon type="primary" />
                  </p>
                </li>
              )
            )
          }
        </ul>
      </div>
      
      <div className={styles.footer}>
        <p className={styles.date}>
          <FormattedDate date={new Date(previewableOrder.createdAt)} />
        </p>
        <p className={styles.price}>
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
      </div>    
    </div>
  );
};

export default OrderDetails;
