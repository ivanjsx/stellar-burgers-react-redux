// libraries
import PropTypes from "prop-types";

// styles
import styles from "./nutrition.module.css";



export default function Nutrition({ name, value }) {
  return (
    <li className={styles.nutrition}>
      <p className={`${styles.text} ${styles.name}`}>{name}</p>
      <p className={`${styles.text} ${styles.value}`}>{value}</p>
    </li>
  );
};

Nutrition.propTypes = PropTypes.exact(
  {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }
).isRequired;
