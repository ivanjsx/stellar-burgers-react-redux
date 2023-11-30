// libraries
import { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// components
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./burger-bun-row.module.css";

// selectors
import { defaultBurgerConstructorSelector } from "../../services/selectors";



function BurgerBunRow({ type }) {
  
  const { chosenBun } = useSelector(defaultBurgerConstructorSelector);
  
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
};

BurgerBunRow.propTypes = {
  type: PropTypes.string.isRequired
};

export default memo(BurgerBunRow);