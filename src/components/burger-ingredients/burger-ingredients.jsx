// libraries
import React from "react";
import { useSelector } from "react-redux";

// components
import Modal from "../modal/modal";
import Gallery from "../gallery/gallery";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./burger-ingredients.module.css";



function BurgerIngredients() {  
  
  const { modalIsVisible, modalMode } = useSelector(state => state.modal);
  
  const [activeTab, setActiveTab] = React.useState("bun");
  const wholeSectionRef = React.useRef();
  const bunsRef = React.useRef();
  const saucesRef = React.useRef();
  const mainsRef = React.useRef();
  
  const handleScroll = React.useCallback(
    () => {
      const bunsHeight = bunsRef.current.clientHeight;
      const saucesHeight = saucesRef.current.clientHeight;
      if (wholeSectionRef.current.scrollTop < bunsHeight) {
        setActiveTab("bun");
      } else if (wholeSectionRef.current.scrollTop < bunsHeight + saucesHeight) {
        setActiveTab("sauce");
      } else {
        setActiveTab("main");
      };
    },
    [wholeSectionRef, bunsRef, saucesRef]
  );
  
  return (
    <>
    <section className={styles.ingredients}>
      
        <div className={styles.content} ref={wholeSectionRef} onScroll={handleScroll}>
        <Gallery category="bun" title="Булки" ref={bunsRef} />
        <Gallery category="sauce" title="Соусы" ref={saucesRef} />
          <Gallery category="main" title="Начинки" ref={mainsRef} />            
      </div>
      
    </section>

      {
        modalIsVisible && 
        modalMode === "ingredient" &&
        <Modal children={<IngredientDetails />} />
      }    
    </>
  );
};

export default React.memo(BurgerIngredients);
