// libraries
import React from "react";
import { useLocation } from "react-router-dom";

// components
import MenuLink from "./menu-link/menu-link";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./app-header.module.css";

// constants
import { 
  HOME_PAGE_PATH,
  FEED_PAGE_ABSOLUTE_PATH,
  PROFILE_PAGE_ABSOLUTE_PATH
} from "../../utils/constants";

// memoization
const MemoizedLogo = React.memo(Logo);



function AppHeader() {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <nav className={styles.menuArea}>
          <ul className={styles.menu}>
            
            <MenuLink 
              path={HOME_PAGE_PATH}
              text="Конструктор"
              IconComponent={BurgerIcon}
              active={location.pathname === HOME_PAGE_PATH}
            />
            
            <MenuLink 
              path={FEED_PAGE_ABSOLUTE_PATH}
              text="Лента&nbsp;заказов"
              IconComponent={ListIcon}
              active={location.pathname === FEED_PAGE_ABSOLUTE_PATH}
            />
            
          </ul>
        </nav>
        
        <div className={styles.logoArea}>
          <MemoizedLogo />
        </div>  
        
        <nav className={styles.profileArea}>
          <ul className={styles.profile}>
            
            <MenuLink 
              path={PROFILE_PAGE_ABSOLUTE_PATH}
              text="Личный&nbsp;кабинет"
              IconComponent={ProfileIcon}
              active={location.pathname.startsWith(PROFILE_PAGE_ABSOLUTE_PATH)}
            />          
            
          </ul>
        </nav>      
        
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
