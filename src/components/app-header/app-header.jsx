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

// memoization
const MemoizedLogo = React.memo(Logo);



function AppHeader() {
  
  const [activeTab, setActiveTab] = React.useState("constructor");
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <nav className={styles.menuArea}>
          <ul className={styles.menu}>
            
            <MenuItem 
              text="Конструктор"
              value="constructor"
              IconComponent={BurgerIcon}
              setActiveTab={setActiveTab}
              active={activeTab === this.value}
            />
            
            <MenuItem 
              text="Лента&nbsp;заказов"
              value="feed"            
              IconComponent={ListIcon}
              setActiveTab={setActiveTab}
              active={activeTab === this.value}
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
              value="profile"
              IconComponent={ProfileIcon}
              setActiveTab={setActiveTab}
              active={activeTab === this.value}
            />          
            
          </ul>
        </nav>      
        
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
