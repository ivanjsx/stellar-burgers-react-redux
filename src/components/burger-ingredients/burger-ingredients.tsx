// libraries
import { memo, useRef, useState, useCallback, FC } from "react";

// components
import IngredientGallery from "../ingredient-gallery/ingredient-gallery";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

// styles
import styles from "./burger-ingredients.module.css";



const BurgerIngredients: FC = () => {
  
  const [activeTab, setActiveTab] = useState("bun");
  
  const wholeSectionRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = useCallback(
    () => {
      const bunsHeight = bunsRef.current!.clientHeight;
      const saucesHeight = saucesRef.current!.clientHeight;
      if (wholeSectionRef.current!.scrollTop < bunsHeight) {
        setActiveTab("bun");
      } else if (wholeSectionRef.current!.scrollTop < bunsHeight + saucesHeight) {
        setActiveTab("sauce");
      } else {
        setActiveTab("main");
      };
    },
    [wholeSectionRef, bunsRef, saucesRef]
  );
  
  const scrollIntoGallery = useCallback(
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
      <nav>
        <ul className={styles.tabs}>
          
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
        <IngredientGallery category="bun" title="Булки" ref={bunsRef} />
        <IngredientGallery category="sauce" title="Соусы" ref={saucesRef} />
        <IngredientGallery category="main" title="Начинки" ref={mainsRef} />            
      </div>
    </>
  );
};

export default memo(BurgerIngredients);
