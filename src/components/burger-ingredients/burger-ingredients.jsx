// libraries
import React from "react";

// components
import TabBar from "./tab-bar/tab-bar";
import Gallery from "./gallery/gallery";

// styles
import styles from "./burger-ingredients.module.css";



function BurgerIngredients() {  
  
  const [activeTab, setActiveTab] = React.useState("bun");
  const wholeSectionRef = React.useRef();
  const bunsRef = React.useRef();
  const saucesRef = React.useRef();
  
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
    <section className={styles.ingredients}>
      
        <div className={styles.content} ref={wholeSectionRef} onScroll={handleScroll}>
        <Gallery category="bun" title="Булки" ref={bunsRef} />
        <Gallery category="sauce" title="Соусы" ref={saucesRef} />
        <Gallery category="main" title="Начинки" />            
      </div>
      
    </section>
  );
};

export default React.memo(BurgerIngredients);
