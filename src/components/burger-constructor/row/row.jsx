// libraries
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// components
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./row.module.css";

// utils
import { ingredientPropType } from "../../../utils/prop-types";



const TopRow = React.memo(
  function () {
    const { chosenBun } = useSelector(state => state.burgerConstructor);
    return (
      <li className={styles.lockedRow}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${chosenBun.name} (верх)`}
          price={chosenBun.price}
          thumbnail={chosenBun.image_large}
        />
      </li>
    );
  }
);

export { TopRow };



const BottomRow = React.memo(
  function () {
    const { chosenBun } = useSelector(state => state.burgerConstructor);
    return (
      <li className={styles.lockedRow}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${chosenBun.name} (низ)`}
          price={chosenBun.price}
          thumbnail={chosenBun.image_large}
        />
      </li>
    );
  }
);

export { BottomRow };



function MiddleRow({ topping, deleteHandler }) {
  return (
    <li className={styles.freeRow}>
      <DragIcon type="primary" />  
      <ConstructorElement
        text={topping.name}
        price={topping.price}
        thumbnail={topping.image_large}
        handleClose={deleteHandler}
      />
    </li>  
  );
};

MiddleRow.propTypes = {
  topping: PropTypes.shape(ingredientPropType).isRequired,
  deleteHandler: PropTypes.func.isRequired
};

export { MiddleRow };
