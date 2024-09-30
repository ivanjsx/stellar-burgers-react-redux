// libraries
import { FC, useMemo } from "react";
import { NavLink, Outlet, useMatch } from "react-router-dom";

// styles
import styles from "./account.module.css";

// urls
import { 
  LOGOUT_PAGE_ABSOLUTE_PATH, 
  HISTORY_PAGE_ABSOLUTE_PATH, 
  PROFILE_PAGE_ABSOLUTE_PATH,
} from "../../utils/urls";



const AccountLayout: FC = () => {
  
  const profileMatch = useMatch(PROFILE_PAGE_ABSOLUTE_PATH);
  const historyMatch = useMatch(HISTORY_PAGE_ABSOLUTE_PATH);
  
  const description = useMemo(
    () => {
      if (profileMatch) {
        return "In this section, you can edit your personal information";
      };      
      if (historyMatch) {
        return "In this section, you can view your order history";
      };          
      return "";
    },
    [profileMatch, historyMatch]
  );  
  
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <nav>
          <NavLink 
            end
            to={PROFILE_PAGE_ABSOLUTE_PATH} 
            className={
              ({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`
            }
            children={
              <p className={styles.text}>
                My Profile
              </p>            
            }
          />
          <NavLink 
            end
            to={HISTORY_PAGE_ABSOLUTE_PATH} 
            className={
              ({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`
            }
            children={
              <p className={styles.text}>
                Order History
              </p>            
            }
          />        
          <NavLink 
            to={LOGOUT_PAGE_ABSOLUTE_PATH} 
            className={styles.link}
            children={
              <p className={styles.text}>
                Sign Out
              </p>            
            }
          />       
        </nav>
        
        <p className={styles.description}>{description}</p> 
        
      </aside>
      
      <Outlet />
      
    </div>
  );
};

export default AccountLayout;
