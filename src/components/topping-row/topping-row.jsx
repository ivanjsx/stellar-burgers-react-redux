// libraries
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

// components
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./topping-row.module.css";

// utils
import { ingredientPropType } from "../../utils/prop-types";

// actions
import { dragTopping } from "../../services/burger-constructor-slice";



function ToppingRow({ index, topping, deleteHandler }) {
  
  const dispatch = useDispatch();
  const ref = React.useRef();

  const dragRow = React.useCallback(
    (fromIndex, toIndex) => {
      dispatch(
        dragTopping(fromIndex, toIndex)
      );
    },
    []
  );  
  
  const [{ isDragging }, dragRef] = useDrag(
    {
      type: "topping",
      item: { index },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }
  );
  
  const [, dropTargetRef] = useDrop(
    {
      accept: "topping",
      hover(item, monitor) {
        if (!ref.current) {
          return
        };
        const fromIndex = item.index;
        const toIndex = index;
        // Don't replace items with themselves
        if (fromIndex === toIndex) {
          return
        };
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (
          hoverBoundingRect.bottom - hoverBoundingRect.top
        ) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        if (fromIndex < toIndex && hoverClientY < hoverMiddleY) {
          return
        };
        // When dragging upwards, only move when the cursor is above 50%
        if (fromIndex > toIndex && hoverClientY > hoverMiddleY) {
          return
        };
        // Time to actually perform the action
        dragRow(fromIndex, toIndex);
        item.index = toIndex;
      },
    }
  );
  
  dragRef(dropTargetRef(ref));
  
  return (
    <li 
      className={`${styles.row} ${isDragging ? styles.isDragging : ""}`} 
      ref={ref}
    >
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
  deleteHandler: PropTypes.func.isRequired
};

export default ToppingRow;
