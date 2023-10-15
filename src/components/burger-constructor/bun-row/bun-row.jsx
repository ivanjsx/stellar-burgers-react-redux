// libraries
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// components
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./bun-row.module.css";



const BunRow = React.memo(
  function ({ type }) {
    const { chosenBun } = useSelector(state => state.burgerConstructor);
    return (
      <li className={`${styles.row} ${type === "bottom" ? styles.stickToBottom : ""}`}>
        <ConstructorElement
          type={type}
          isLocked={true}
          text={`${chosenBun.name} ${type === "top" ? "(верх)" : "(низ)"}`}
          price={chosenBun.price}
          thumbnail={chosenBun.image_large}
        />
      </li>
    );
  }
);

BunRow.propTypes = {
  type: PropTypes.string.isRequired
};

export { BunRow };