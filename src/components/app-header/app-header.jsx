// libraries
import React from "react";

// components
import MenuItem from "./menu-item/menu-item";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./app-header.module.css";



export default function AppHeader() {
  
  const MemoizedLogo = React.memo(Logo);
  const [active, setActive] = React.useState("constructor");

  function defineIconType(targetItem) {
    return active === targetItem ? "primary" : "secondary";
  };

  function defineTextClass(targetItem) {
    return active === targetItem ? styles.menuTextActive : styles.menuTextInactive;
  };

  function setActiveTarget(targetItem) {
    return function() {
      setActive(targetItem);
    };
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <nav className={styles.menuArea}>
          <ul className={styles.menu}>

            <MenuItem 
              text="Конструктор"
              IconComponent={BurgerIcon}
              iconType={defineIconType("constructor")}
              textClass={defineTextClass("constructor")}
              clickHandler={setActiveTarget("constructor")}
            />

            <MenuItem 
              text="Лента&nbsp;заказов"
              IconComponent={ListIcon}
              iconType={defineIconType("feed")}
              textClass={defineTextClass("feed")}
              clickHandler={setActiveTarget("feed")}
            />
          
          </ul>
        </nav>

        <div className={styles.logoArea}>
          <MemoizedLogo />
        </div>  
        
        <nav className={styles.profileArea}>
          <ul className={styles.profile}>
            

            <MenuItem 
              text="Личный&nbsp;кабинет"
              IconComponent={ProfileIcon}
              iconType={defineIconType("profile")}
              textClass={defineTextClass("profile")}
              clickHandler={setActiveTarget("profile")}
            />          

          </ul>
        </nav>      

      </div>
    </header>
  );
};
