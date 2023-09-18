// libraries
import PropTypes from "prop-types";

// components
import TabBar from "./tab-bar/tab-bar";
import Gallery from "./gallery/gallery";

// styles
import styles from "./burger-ingredients.module.css";

// utils
import { ingredientPropType } from "../../utils/prop-types";



export default function BurgerIngredients({ data }) {
  return (
    <section className={styles.ingredients}>
      <TabBar />
      <div className={styles.content}>
        <Gallery 
          id="bun"
          title="Булки"
          cards={
            data.filter(
              ingredient => ingredient.type === "bun"
            )
          }
        />
        <Gallery 
          id="sauce"
          title="Соусы"        
          cards={
            data.filter(
              ingredient => ingredient.type === "sauce"
            )
          }
        />
        <Gallery 
          id="main"
          title="Начинки"              
          cards={
            data.filter(
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
    data: PropTypes.arrayOf(
      ingredientPropType.isRequired      
    ).isRequired
  }
).isRequired;
