// libraries
import React from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";

// components
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./topping-row.module.css";

// utils
import { ingredientPropType } from "../../../utils/prop-types";



function ToppingRow({ index, topping, moveCard, deleteHandler }) {

  const ref = React.useRef(null);
  
  return (
    <li className={styles.row} ref={ref}>
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

ToppingRow.propTypes = {
  index: PropTypes.number.isRequired,
  topping: PropTypes.shape(ingredientPropType).isRequired,
  moveCard: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired
};

export { ToppingRow };
