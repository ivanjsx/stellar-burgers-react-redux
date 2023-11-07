// libraries
import React from "react";

// components
import MenuLink from "./menu-link/menu-link";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./app-header.module.css";

// memoization
const MemoizedLogo = React.memo(Logo);



function AppHeader() {
  
  const [activeTab, setActiveTab] = React.useState("/");
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <nav className={styles.menuArea}>
          <ul className={styles.menu}>
            
            <MenuLink 
              path="/"
              text="Конструктор"
              IconComponent={BurgerIcon}
              setActiveTab={setActiveTab}
              active={activeTab === "/"}
            />
            
            <MenuLink 
              path="/feed"
              text="Лента&nbsp;заказов"
              IconComponent={ListIcon}
              setActiveTab={setActiveTab}
              active={activeTab === "/feed"}
            />
            
          </ul>
        </nav>
        
        <div className={styles.logoArea}>
          <MemoizedLogo />
        </div>  
        
        <nav className={styles.profileArea}>
          <ul className={styles.profile}>
            
            <MenuLink 
              path="/profile"
              text="Личный&nbsp;кабинет"
              IconComponent={ProfileIcon}
              setActiveTab={setActiveTab}
              active={activeTab === "/profile"}
            />          
            
          </ul>
        </nav>      
        
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
