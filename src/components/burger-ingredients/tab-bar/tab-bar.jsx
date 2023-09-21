// libraries
import React from "react";

// components
import ActionTab from "./action-tab/action-tab";

// styles
import styles from "./tab-bar.module.css";



function TabBar () {
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

export default TabBar;
