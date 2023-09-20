// libraries
import PropTypes from "prop-types";

// components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./action-tab.module.css";



export default function ActionTab({ value, title, onClick, currentlyActive }) {
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
