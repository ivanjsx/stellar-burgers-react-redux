// styles
import styles from "./ingredient-icon.module.css";



type PropsType = Readonly<{
  imageSrc: string | undefined,
  isConcealed?: boolean,
  concealedCount?: number,
}>;



function IngredientIcon({ imageSrc, isConcealed, concealedCount }: PropsType): JSX.Element {
  return (
    <div className={styles.border}>
      <div 
        className={
          [
            styles.background,
            isConcealed ? styles.concealedBackground : ""
          ].join(" ")
        }
      >
        <img 
          src={imageSrc}
          alt="ingredient icon" 
          className={
            [
              styles.image,
              isConcealed ? styles.concealedImage : ""
            ].join(" ")            
          } 
        />
      </div>
      {
        isConcealed && 
        <p className={styles.concealedCount}>+{concealedCount}</p>
      }      
    </div>    
  );
};

export default IngredientIcon;
