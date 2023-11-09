// libraries
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// styles
import styles from "./menu-link.module.css";



function MenuLink({ path, text, IconComponent, active }) {
  
  const { iconType, textClass } = React.useMemo(
    () => {
      return {
        iconType: active ? "primary" : "secondary",
        textClass: `${styles.text} ${active ? "" : styles.inactive}`
      }
    },
    [active]
  );

  return (
    <li>
      <Link 
        to={path}
        className={styles.link} 
      >
        <IconComponent type={iconType} />
        <p className={textClass}>{text}</p> 
      </Link>
    </li>  
  );
};

MenuLink.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType.isRequired,
  active: PropTypes.bool.isRequired
};

export default MenuLink;
