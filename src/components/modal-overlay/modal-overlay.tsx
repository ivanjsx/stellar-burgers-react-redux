// libraries
import { MouseEventHandler } from "react";

// styles 
import styles from "./modal-overlay.module.css";



type PropsType = Readonly<{
  children: JSX.Element,
  closeHandler: () => void,
}>



function ModalOverlay({ closeHandler, children }: PropsType): JSX.Element {
  
  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
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

export default ModalOverlay;
