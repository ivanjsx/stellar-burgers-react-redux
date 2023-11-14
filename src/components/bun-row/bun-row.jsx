// libraries
import { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// components
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./bun-row.module.css";



const BunRow = memo(
  ({ type }) => {
    
    const { chosenBun } = useSelector(state => state.burgerConstructor);

    const content = chosenBun
                    ? (
                      <ConstructorElement
                        type={type}
                        isLocked={true}
                        text={`${chosenBun.name} ${type === "top" ? "(верх)" : "(низ)"}`}
                        price={chosenBun.price}
                        thumbnail={chosenBun.image_large}
                      />        
                    ) : (
                      <p className={styles.thumbnailText}>
                        {type === "top" ? "Перетащите сюда булку" : ""}
                      </p>
                    );

    return (
      <li className={`${styles.row} ${type === "bottom" ? styles.stickToBottom : ""}`}>
        {content}
      </li>
    );
  }
);

BunRow.propTypes = {
  type: PropTypes.string.isRequired
};

export default BunRow;