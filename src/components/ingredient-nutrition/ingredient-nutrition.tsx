// styles
import styles from "./ingredient-nutrition.module.css";



type PropsType = Readonly<{
  name: string,
  value: number,
}>;



function IngredientNutrition({ name, value }: PropsType): JSX.Element {
  return (
    <li className={styles.nutrition}>
      <p className={`${styles.text} ${styles.name}`}>{name}</p>
      <p className={`${styles.text} ${styles.value}`}>{value}</p>
    </li>
  );
};

export default IngredientNutrition;
