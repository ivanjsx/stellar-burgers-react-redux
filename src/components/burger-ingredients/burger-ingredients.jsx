// libraries
import PropTypes from "prop-types";

// components
import TabBar from "./tab-bar/tab-bar";
import Gallery from "./gallery/gallery";

// styles
import styles from "./burger-ingredients.module.css";

// utils
import { ingredientPropType } from "../../utils/prop-types";



function BurgerIngredients({ available, addToCartHandler, cardClickHandler }) {
  return (
    <section className={styles.ingredients}>
      <TabBar />
      <div className={styles.content}>
        <Gallery 
          id="bun"
          title="Булки"
          addToCartHandler={addToCartHandler}
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
          addToCartHandler={addToCartHandler}
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
          addToCartHandler={addToCartHandler}
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

BurgerIngredients.propTypes = {
  available: PropTypes.arrayOf(
    PropTypes.shape(ingredientPropType)
  ).isRequired,
  addToCartHandler: PropTypes.func.isRequired,
  cardClickHandler: PropTypes.func.isRequired
};

export default BurgerIngredients;
