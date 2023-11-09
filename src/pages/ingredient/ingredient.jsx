// libraries
import { useSelector } from "react-redux";

// components
import Nutrition from "../../components/modal/ingredient-details/nutrition/nutrition";

// styles
import styles from "./ingredient.module.css";



function IngredientPage() {
  
  // const { previewableContent } = useSelector(state => state.modal);
  
  const previewableContent = {
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
      
      <div className={styles.content}>
      
        <figure className={styles.figure}>
          <img 
            src={previewableContent.image_large} 
            alt={`фото ингредиента ${previewableContent.name} энергетической ценностью ${previewableContent.calories}`}
            className={styles.image} 
            />
          <figcaption className={styles.caption}>
            {previewableContent.name}
          </figcaption>
        </figure>
        
        <ul className={styles.details}>
          <Nutrition name="Калории, ккал" value={previewableContent.calories} />
          <Nutrition name="Белки, г" value={previewableContent.proteins} />
          <Nutrition name="Жиры, г" value={previewableContent.fat} />
          <Nutrition name="Углеводы, г" value={previewableContent.carbohydrates} />
        </ul>
        
      </div>
    </div> 
  );
};

export default IngredientPage;
