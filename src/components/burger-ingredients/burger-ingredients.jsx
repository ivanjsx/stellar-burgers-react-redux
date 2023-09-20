// libraries
import PropTypes from "prop-types";

// components
import TabBar from "./tab-bar/tab-bar";
import Gallery from "./gallery/gallery";

// styles
import styles from "./burger-ingredients.module.css";

// utils
import { ingredientPropType } from "../../utils/prop-types";



export default function BurgerIngredients({ available, cardClickHandler }) {
  return (
    <section className={styles.ingredients}>
      <TabBar />
      <div className={styles.content}>
        <Gallery 
          id="bun"
          title="Булки"
          cardClickHandler={cardClickHandler}
          ingredients={
            available.filter(
              ingredient => ingredient.type === "bun"
            )
          }
        />
        <Gallery 
          id="sauce"
          title="Соусы"   
          cardClickHandler={cardClickHandler}
          ingredients={
            available.filter(
              ingredient => ingredient.type === "sauce"
            )
          }
        />
        <Gallery 
          id="main"
          title="Начинки"     
          cardClickHandler={cardClickHandler}
          ingredients={
            available.filter(
              ingredient => ingredient.type === "main"
            )
          }
        />            
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = PropTypes.exact(
  {
    available: PropTypes.arrayOf(
      ingredientPropType.isRequired      
    ).isRequired
  }
).isRequired;
