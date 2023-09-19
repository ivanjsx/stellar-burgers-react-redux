// libraries
import React from "react";
import PropTypes from "prop-types";

// components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./tab-bar.module.css";



function ActionTab({ value, title, onClick, currentlyActive }) {
  return (
    <Tab value={value} active={currentlyActive === value} onClick={onClick}>
      <a href={`#${value}`} className={styles.tabLink}>{title}</a>
    </Tab>  
  );
};

ActionTab.propTypes = PropTypes.exact(
  {
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    currentlyActive: PropTypes.string.isRequired
  }
).isRequired;



export default function TabBar () {
  const [currentlyActive, setCurrentlyActive] = React.useState("bun");
  return (
    <nav>
      <ul className={styles.tabBar}>
        <ActionTab 
          value="bun"
          title="Булки"
          onClick={setCurrentlyActive}
          currentlyActive={currentlyActive}
        />
        <ActionTab 
          value="sauce"
          title="Соусы"
          onClick={setCurrentlyActive}
          currentlyActive={currentlyActive}
        />
        <ActionTab 
          value="main"
          title="Начинки"
          onClick={setCurrentlyActive}
          currentlyActive={currentlyActive}
        />
      </ul>
    </nav>
  );
};
