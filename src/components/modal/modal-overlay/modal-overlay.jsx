// libraries
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

// styles 
import styles from "./modal-overlay.module.css";

// actions 
import { closeModal } from "../../../services/modal-slice";

function ModalOverlay({ children }) {

  const dispatch = useDispatch();
  const modalIsVisible = useSelector(state => state.modal.modalIsVisible);  

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      dispatch(closeModal());
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
  children: PropTypes.element.isRequired
};

export default ModalOverlay;
