import PropTypes from "prop-types";

export const ingredientPropType = {
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_large: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
};

export const orderPropType = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  number: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
