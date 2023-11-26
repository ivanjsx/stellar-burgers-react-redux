// libraries 
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

// components 
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./order-card.module.css";

// selectors 
import { defaultBurgerIngredientsSelector } from "../../services/selectors";

// utils 
import { orderPropType } from "../../utils/prop-types";



function OrderCard({ order, showStatus, targetLinkPath }) {
  
  const location = useLocation();
  
  const { availableStock } = useSelector(defaultBurgerIngredientsSelector);
  
  const icons = useMemo(
    () => [...new Set(order.ingredients)].map(
      id => {
        const ingredient = availableStock.get(id);
        return (
          <li key={id} className={styles.icon}>
            <IngredientIcon imageSrc={ingredient?.image_large} />
          </li>
        );
      }
    ),
    [availableStock, order]
  );
  
  const totalPrice = useMemo(
    () => order.ingredients.reduce(
      (accumulator, current) => accumulator + availableStock.get(current)?.price, 0
    ),
    [availableStock, order]
  );  
  
  return (
    <li className={styles.container}>
      <Link
        to={targetLinkPath}
        state={{ background: location }}
        className={styles.link}
      >
        <div className={styles.info}>
          <p className={styles.number}>#{order.number}</p>
          <p className={styles.date}>
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </div>
        
        <div>
          <h2 className={styles.name}>{order.name}</h2>
          {
            showStatus &&
            <p className={styles.status}>{order.status}</p>
          }
        </div>
        
        <div className={styles.info}>
          <ul className={styles.contains}>
            {icons}
          </ul>
          <p className={styles.price}>
            {totalPrice} <CurrencyIcon type="primary" />
          </p>               
        </div>    
      </Link>      
    </li>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape(orderPropType).isRequired,
  showStatus: PropTypes.bool.isRequired
};

export default OrderCard;
