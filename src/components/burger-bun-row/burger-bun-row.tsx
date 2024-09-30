// libraries
import { memo } from "react";

// components
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./burger-bun-row.module.css";

// selectors
import { defaultBurgerConstructorSelector } from "../../services/selectors";

// hooks
import { useAppSelector } from "../../services/store";



type PropsType = Readonly<{
  type: "top" | "bottom"
}>;



function BurgerBunRow({ type }: PropsType): JSX.Element {
  
  const { chosenBun } = useAppSelector(defaultBurgerConstructorSelector);
  
  const content = chosenBun
                  ? (
                    <ConstructorElement
                      type={type}
                      isLocked={true}
                      text={`${chosenBun.name} (${type})`}
                      price={chosenBun.price}
                      thumbnail={chosenBun.image_large}
                    />        
                  ) : (
                    <p className={styles.thumbnailText}>
                      {type === "top" ? "Drag a bun right here" : ""}
                    </p>
                  );

  return (
    <li className={`${styles.row} ${type === "bottom" ? styles.stickToBottom : ""}`}>
      {content}
    </li>
  );
};

export default memo(BurgerBunRow);
