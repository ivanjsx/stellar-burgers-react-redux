// libraries
import PropTypes from "prop-types";

// components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./action-tab.module.css";



function ActionTab({ value, title, onClick, currentlyActive }) {
  return (
    <a href={`#${value}`} className={styles.tabLink}> 
      <Tab value={value} active={currentlyActive === value} onClick={onClick}>
        {title}
      </Tab>  
    </a>   
  );
};

ActionTab.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  currentlyActive: PropTypes.string.isRequired
};

export default ActionTab;
