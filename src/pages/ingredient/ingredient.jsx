// libraries
import { useSelector } from "react-redux";

// components
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

// styles
import styles from "./ingredient.module.css";



function IngredientPage() {
  
  // const { previewableIngredient } = useSelector(state => state.modal);
  
  const previewableIngredient = {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Детали ингредиента</h2>
      <IngredientDetails />
    </div> 
  );
};

export default IngredientPage;
