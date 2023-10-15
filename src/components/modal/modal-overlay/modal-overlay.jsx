// libraries
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// styles 
import styles from "./modal-overlay.module.css";



function ModalOverlay({ closePopup, children }) {
  
  const modalIsVisible = useSelector(state => state.modal.modalIsVisible);  
  
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closePopup();
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
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default ModalOverlay;
