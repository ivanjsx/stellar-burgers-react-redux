// libraries
import PropTypes from "prop-types";

// components
import Card from "../card/card";

// styles
import styles from "./gallery.module.css";

// utils
import { ingredientPropType } from "../../../utils/prop-types";

// constants
import { DEFAULT_INGREDIENT_QUANTITY } from "../../../utils/constants";



export default function Gallery({ id, title, cards }) {
  return (
    <>
      <h2 className={styles.heading} id={id}>
        {title}
      </h2>    
      <ul className={styles.gallery}>
        {
          cards.map(
            card => <Card info={card} count={DEFAULT_INGREDIENT_QUANTITY} key={card._id} />
          )
        }
      </ul>
    </>
  );
};

Gallery.propTypes = PropTypes.exact(
  {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      ingredientPropType.isRequired      
    ).isRequired
  }
).isRequired;
