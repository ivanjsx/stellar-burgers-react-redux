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



function AppHeader() {
  
  const [currentlyActive, setCurrentlyActive] = React.useState("constructor");

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <nav className={styles.menuArea}>
          <ul className={styles.menu}>

            <MenuItem 
              text="Конструктор"
              value="constructor"
              IconComponent={BurgerIcon}
              onClick={setCurrentlyActive}
              currentlyActive={currentlyActive}
            />

            <MenuItem 
              text="Лента&nbsp;заказов"
              value="feed"            
              IconComponent={ListIcon}
              onClick={setCurrentlyActive}
              currentlyActive={currentlyActive}
            />
          
          </ul>
        </nav>

        <div className={styles.logoArea}>
          <Logo />
        </div>  
        
        <nav className={styles.profileArea}>
          <ul className={styles.profile}>
            
            <MenuItem 
              text="Личный&nbsp;кабинет"
              value="profile"
              IconComponent={ProfileIcon}
              onClick={setCurrentlyActive}
              currentlyActive={currentlyActive}
            />          

          </ul>
        </nav>      

      </div>
    </header>
  );
};

export default AppHeader;
