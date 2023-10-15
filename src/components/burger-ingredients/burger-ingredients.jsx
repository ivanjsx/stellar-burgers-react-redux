// libraries
import React from "react";

// components
import TabBar from "./tab-bar/tab-bar";
import Gallery from "./gallery/gallery";

// styles
import styles from "./burger-ingredients.module.css";



function BurgerIngredients() {  
  
  const [activeTab, setActiveTab] = React.useState("bun");
  const sectionRef = React.useRef();
  const bunsRef = React.useRef();
  const saucesRef = React.useRef();
  
  React.useEffect(
    () => {
      const currentSectionRef = sectionRef.current;      
      const bunsHeight = bunsRef.current.clientHeight;
      const saucesHeight = saucesRef.current.clientHeight;
      
      const handleScroll = () => {
        if (currentSectionRef.scrollTop <= bunsHeight) {
          setActiveTab("bun");
        } else if (currentSectionRef.scrollTop <= bunsHeight + saucesHeight) {
          setActiveTab("sauce");
        } else {
          setActiveTab("main");
        };
      };
      
      currentSectionRef.addEventListener("scroll", handleScroll);
      
      return () => {
        currentSectionRef.removeEventListener("scroll", handleScroll);
      };
    }, 
    [sectionRef, bunsRef, saucesRef]
  );
  
  return (
    <section className={styles.ingredients}>
      
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className={styles.content} ref={sectionRef}>
        <Gallery category="bun" title="Булки" ref={bunsRef} />
        <Gallery category="sauce" title="Соусы" ref={saucesRef} />
        <Gallery category="main" title="Начинки" />            
      </div>
      
    </section>
  );
};

export default React.memo(BurgerIngredients);
