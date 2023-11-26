// libraries
import { memo, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";

// components
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
const MemoizedLogo = memo(Logo);



function AppHeader() {
  
  const location = useLocation();

  const isActive = useCallback(
    (absPath, exact) => {
      if (exact) {
        return location.pathname === absPath;
      };
      return location.pathname.startsWith(absPath);
    },
    [location]
  );

  const textClass = useCallback(
    isActive => [
      styles.text,
      isActive ? "" : styles.inactive
    ].join(" "),
    []
  );
  
  const iconType = useCallback(
    isActive => isActive ? "primary" : "secondary",
    []
  );  
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <nav className={styles.menuArea}>
          <ul className={styles.section}>
            
            <li>
              <Link 
                to={HOME_PAGE_PATH}
                className={styles.link} 
                children={
                  <p className={textClass(isActive(HOME_PAGE_PATH, true))}>
                    <BurgerIcon type={iconType(isActive(HOME_PAGE_PATH, true))} />
                    Конструктор
                  </p>
                }
              />
            </li>  
            
            <li>
              <Link 
                to={FEED_PAGE_ABSOLUTE_PATH}
                className={styles.link} 
                children={
                  <p className={textClass(isActive(FEED_PAGE_ABSOLUTE_PATH, false))}>
                    <ListIcon type={iconType(isActive(FEED_PAGE_ABSOLUTE_PATH, false))} />
                    Лента&nbsp;заказов
                  </p>
                }
              />
            </li>              
            
          </ul>
        </nav>
        
        <div className={styles.logoArea}>
          <MemoizedLogo />
        </div>  
        
        <nav className={styles.profileArea}>
          <ul className={`${styles.section} ${styles.stickToRight}`}>
            
            <li>
              <Link 
                to={PROFILE_PAGE_ABSOLUTE_PATH}
                className={styles.link} 
                children={
                  <p className={textClass(isActive(PROFILE_PAGE_ABSOLUTE_PATH, false))}>
                    <ProfileIcon type={iconType(isActive(PROFILE_PAGE_ABSOLUTE_PATH, false))} />
                    Личный&nbsp;кабинет
                  </p>
                }
              />
            </li>                            
            
          </ul>
        </nav>      
        
      </div>
    </header>
  );
};

export default memo(AppHeader);
