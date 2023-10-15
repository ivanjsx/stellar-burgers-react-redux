// libraries
import React from "react";
import { useDispatch } from "react-redux";

// components
import TabBar from "./tab-bar/tab-bar";
import Gallery from "./gallery/gallery";

// styles
import styles from "./burger-ingredients.module.css";

// actions
import { setActiveTab } from "../../services/burger-ingredients-slice";



function BurgerIngredients() {  
  
  const sectionRef = React.useRef();
  const dispatch = useDispatch();
  
  React.useEffect(
    () => {
      const currentRef = sectionRef.current;
      const handleScroll = () => {
        const getActiveTab = () => {
          // some logic TBD
        }
        const activetab = getActiveTab();
        dispatch(setActiveTab(activetab));
      };
      currentRef.addEventListener("scroll", handleScroll);
      return () => {
        currentRef.removeEventListener("scroll", handleScroll);
      };
    }, 
    [sectionRef]
  );
  
  return (
    <section className={styles.ingredients}>
      <TabBar />
      <div className={styles.content} ref={sectionRef}>
        <Gallery category="bun" title="Булки" />
        <Gallery category="sauce" title="Соусы" />
        <Gallery category="main" title="Начинки" />            
      </div>
    </section>
  );
};

export default React.memo(BurgerIngredients);
