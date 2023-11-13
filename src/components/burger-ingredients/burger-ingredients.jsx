// libraries
import React from "react";

// components
import Gallery from "../gallery/gallery";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./burger-ingredients.module.css";



function BurgerIngredients() {  
  
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
  
  const scrollIntoGallery = React.useCallback(
    (tabValue, galleryRef) => {
      return () => {
        setActiveTab(tabValue);
        galleryRef.current.scrollIntoView({ behavior: "smooth" });
      };
    },
    []
  );
  
  return (
    <>
      <section className={styles.ingredients}>
        
        <nav>
          <ul className={styles.tabsBar}>
            
            <Tab 
              value="bun"
              active={activeTab === "bun"}
              onClick={scrollIntoGallery("bun", bunsRef)}
              children="Булки"
            />
            <Tab 
              value="sauce" 
              active={activeTab === "sauce"} 
              onClick={scrollIntoGallery("sauce", saucesRef)}
              children="Соусы" 
            />
            <Tab 
              value="main" 
              active={activeTab === "main"} 
              onClick={scrollIntoGallery("main", mainsRef)}
              children="Начинки" 
            />
            
          </ul>
        </nav>
        
        <div className={styles.content} ref={wholeSectionRef} onScroll={handleScroll}>
          <Gallery category="bun" title="Булки" ref={bunsRef} />
          <Gallery category="sauce" title="Соусы" ref={saucesRef} />
          <Gallery category="main" title="Начинки" ref={mainsRef} />            
        </div>
        
      </section>
    </>
  );
};

export default React.memo(BurgerIngredients);
