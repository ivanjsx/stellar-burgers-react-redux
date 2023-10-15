// libraries
import PropTypes from "prop-types";

// components
import ActionTab from "./action-tab/action-tab";

// styles
import styles from "./tab-bar.module.css";



function TabBar ({ activeTab, setActiveTab }) {  
  return (
    <nav>
      <ul className={styles.tabBar}>
        
        <ActionTab 
          value="bun" 
          title="Булки" 
          active={activeTab === "bun"} 
          setActiveTab={setActiveTab} 
        />
        <ActionTab 
          value="sauce" 
          title="Соусы" 
          active={activeTab === "sauce"} 
          setActiveTab={setActiveTab} 
        />
        <ActionTab 
          value="main" 
          title="Начинки" 
          active={activeTab === "main"} 
          setActiveTab={setActiveTab} 
        />

      </ul>
    </nav>
  );
};

TabBar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

export default TabBar;
