// libraries
import React from "react";
import PropTypes from "prop-types";

// components
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./row.module.css";

// utils
import { ingredientPropType } from "../../../utils/prop-types";



function TopRow({ bun }) {
  return (
    <li className={styles.lockedRow}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image_large}
      />
    </li>
  );
};

TopRow.propTypes = {
  bun: PropTypes.shape(ingredientPropType).isRequired
};

const MemoizedTopRow = React.memo(TopRow);
export { MemoizedTopRow };



function BottomRow({ bun }) {
  return (
    <li className={styles.lockedRow}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image_large}
      />
    </li>
  );
};

BottomRow.propTypes = {
  bun: PropTypes.shape(ingredientPropType).isRequired
};

const MemoizedBottomRow = React.memo(BottomRow);
export { MemoizedBottomRow };



function MiddleRow({ ingredient, deleteHandler }) {
  return (
    <li className={styles.freeRow}>
      <DragIcon type="primary" />  
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_large}
        handleClose={deleteHandler}
      />
    </li>  
  );
};

MiddleRow.propTypes = {
  ingredient: PropTypes.shape(ingredientPropType).isRequired
};

export { MiddleRow };
