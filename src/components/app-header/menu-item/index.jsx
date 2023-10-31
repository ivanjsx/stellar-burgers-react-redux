// libraries
import React from "react";
import PropTypes from "prop-types";

// styles
import styles from "./menu-item.module.css";



function MenuItem({ text, value, IconComponent, setActiveTab, active }) {
  
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
      <button 
        className={styles.menuLink} 
        onClick={
          () => {
            setActiveTab(value);
          }
        }
      >
        <IconComponent type={iconType} />
        <p className={textClass}>{text}</p> 
      </button>
    </li>  
  );
};

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};

export default MenuItem;
