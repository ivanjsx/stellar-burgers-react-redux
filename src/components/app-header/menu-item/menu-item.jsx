// libraries
import React from "react";
import PropTypes from "prop-types";

// styles
import styles from "./menu-item.module.css";



export default function MenuItem({ text, value, IconComponent, onClick, currentlyActive }) {
  const MemoizedIcon = React.memo(IconComponent);

  function defineIconType() {
    return currentlyActive === value ? "primary" : "secondary";
  };
  
  function defineTextClass() {
    return  currentlyActive === value 
            ? styles.menuText 
            : `${styles.menuText} ${styles.inactive}`;
  };  

  return (
    <li>
      <button className={styles.menuLink} onClick={() => {onClick(value);}} >
        <MemoizedIcon type={defineIconType()} />
        <p className={defineTextClass()}>{text}</p> 
      </button>
    </li>  
  );
};



MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
  currentlyActive: PropTypes.string.isRequired
};
