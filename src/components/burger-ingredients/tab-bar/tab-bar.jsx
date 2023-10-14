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
          active={activeTab === this.value}
        />
        <ActionTab 
          value="sauce"
          title="Соусы"
          onClick={setActiveTab}
          active={activeTab === this.value}
        />
        <ActionTab 
          value="main"
          title="Начинки"
          onClick={setActiveTab}
          active={activeTab === this.value}
        />
      
      </ul>
    </nav>
  );
};

export default TabBar;
