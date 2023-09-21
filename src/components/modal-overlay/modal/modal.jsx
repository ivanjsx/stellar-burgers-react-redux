// libraries
import React from "react";
import PropTypes from "prop-types";

// components
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./modal.module.css";



export default function Modal({ heading, closeHandler, children }) {
  const MemoizedIcon = React.memo(CloseIcon);
  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <button className={styles.close} onClick={closeHandler} type="button">
          <MemoizedIcon type="primary" />
        </button>
      </div>
      {children}
    </div>
  );
};



Modal.propTypes = {
  heading: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
};
