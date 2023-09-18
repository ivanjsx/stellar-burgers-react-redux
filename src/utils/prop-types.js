import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape(
  {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired
  }
);

