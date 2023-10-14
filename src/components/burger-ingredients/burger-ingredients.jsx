// libraries
import React from "react";

// components
import TabBar from "./tab-bar/tab-bar";
import Gallery from "./gallery/gallery";

// styles
import styles from "./burger-ingredients.module.css";



function BurgerIngredients() {  
  return (
    <section className={styles.ingredients}>
      <TabBar />
      <div className={styles.content}>
        <Gallery category="bun" title="Булки" />
        <Gallery category="sauce" title="Соусы" />
        <Gallery category="main" title="Начинки" />            
      </div>
    </section>
  );
};

export default React.memo(BurgerIngredients);
