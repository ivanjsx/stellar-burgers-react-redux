// libraries
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// styles 
import styles from "./modal-overlay.module.css";



function ModalOverlay({ closeCallback, children }) {
  
  const { modalIsVisible } = useSelector(state => state.modal);  
  
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closeCallback();
    };
  };      
  
  return (
    <div 
      className={`${styles.overlay} ${modalIsVisible ? styles.visible : ""}`}
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  closeCallback: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default ModalOverlay;
