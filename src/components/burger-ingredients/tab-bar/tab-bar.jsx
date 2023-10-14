// libraries 
import React from "react";

// components
import ActionTab from "./action-tab/action-tab";

// styles
import styles from "./tab-bar.module.css";



function TabBar () {

  const [activeTab, setActiveTab] = React.useState("bun");
  
  return (
    <nav>
      <ul className={styles.tabBar}>
        
        <ActionTab 
          value="bun"
          title="Булки"
          onClick={setActiveTab}
          active={activeTab === "bun"}
        />
        <ActionTab 
          value="sauce"
          title="Соусы"
          onClick={setActiveTab}
          active={activeTab === "sauce"}
        />
        <ActionTab 
          value="main"
          title="Начинки"
          onClick={setActiveTab}
          active={activeTab === "main"}
        />
      
      </ul>
    </nav>
  );
};

export default TabBar;
