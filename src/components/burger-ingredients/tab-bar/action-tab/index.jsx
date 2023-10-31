// libraries
import PropTypes from "prop-types";

// components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./action-tab.module.css";



function ActionTab({ value, title, active, setActiveTab }) {
  return (
    <a href={`#${value}`} className={styles.tabLink}> 
      <Tab 
        value={value}
        active={active}
        onClick={setActiveTab}
      >
        {title}
      </Tab>  
    </a>   
  );
};

ActionTab.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

export default ActionTab;
