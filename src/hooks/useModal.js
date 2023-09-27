// libraries
import React from "react";



function useModal() {
  const [isModalVisible, setIsVisible] = React.useState(false);

  const openModal = React.useCallback(
    () => {
      setIsVisible(true);
    }, 
    []
  );

  const closeModal = React.useCallback(
    () => {
      setIsVisible(false);
    }, 
    []
  );

  return {
    isModalVisible,
    openModal,
    closeModal
  };
};

export default useModal;
