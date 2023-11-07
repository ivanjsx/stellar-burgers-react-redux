// libraries
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// styles
import styles from "./menu-link.module.css";



function MenuLink({ path, text, IconComponent, setActiveTab, active }) {
  
  const { iconType, textClass } = React.useMemo(
    () => {
      return {
        iconType: active ? "primary" : "secondary",
        textClass: `${styles.menuText} ${active ? "" : styles.inactive}`
      }
    },
    [active]
  );

  return (
    <li>
      <NavLink 
        to={path}
        className={styles.menuLink} 
        onClick={
          () => {
            setActiveTab(path);
          }
        }
      >
        <IconComponent type={iconType} />
        <p className={textClass}>{text}</p> 
      </NavLink>
    </li>  
  );
};

MenuLink.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};

export default MenuLink;
