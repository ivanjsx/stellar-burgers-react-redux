// libraries
import PropTypes from "prop-types";

// styles 
import styles from "./modal-overlay.module.css";



function ModalOverlay({ closeHandler, children }) {
  
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closeHandler();
    };
  };      
  
  return (
    <div 
      className={styles.overlay}
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default ModalOverlay;
