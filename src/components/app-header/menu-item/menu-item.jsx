// libraries
import React from "react";
import PropTypes from "prop-types";

// styles
import styles from "./menu-item.module.css";



export default function MenuItem({ text, IconComponent, iconType, textClass, clickHandler }) {
  const MemoizedIcon = React.memo(IconComponent);
  return (
    <li>
      <button className={styles.menuLink} onClick={clickHandler}>
        <MemoizedIcon type={iconType} />
        <p className={textClass}>{text}</p> 
      </button>
    </li>  
  );
};

MenuItem.propTypes = PropTypes.exact(
  {
    text: PropTypes.string.isRequired,
    IconComponent: PropTypes.elementType.isRequired,
    iconType: PropTypes.string.isRequired,
    textClass: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired
  }
).isRequired;
