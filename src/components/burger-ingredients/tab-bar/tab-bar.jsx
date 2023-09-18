// libraries
import React from "react";
import PropTypes from "prop-types";

// components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./tab-bar.module.css";



function ActionTab({ value, title, activeValue, clickHandler }) {
  return (
    <Tab value={value} active={activeValue === value} onClick={clickHandler}>
      <a href={`#${value}`} className={styles.tabLink}>{title}</a>
    </Tab>  
  );
};

ActionTab.propTypes = PropTypes.exact(
  {
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    activeValue: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired
  }
).isRequired;



export default function TabBar () {
  const [active, setActive] = React.useState("bun");
  return (
    <nav>
      <ul className={styles.tabBar}>
        <ActionTab 
          value="bun"
          title="Булки"
          activeValue={active}
          clickHandler={setActive}
        />
        <ActionTab 
          value="sauce"
          title="Соусы"
          activeValue={active}
          clickHandler={setActive}
        />
        <ActionTab 
          value="main"
          title="Начинки"
          activeValue={active}
          clickHandler={setActive}
        />
      </ul>
    </nav>
  );
};
