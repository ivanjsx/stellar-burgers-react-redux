// libraries 
import { useSelector, useDispatch } from "react-redux";

// components
import ActionTab from "./action-tab/action-tab";

// styles
import styles from "./tab-bar.module.css";

// actions
import { setActiveTab } from "../../../services/burger-ingredients-slice";



function TabBar () {
  
  const dispatch = useDispatch();
  const { activeTab } = useSelector(state => state.burgerIngredients);
  
  return (
    <nav>
      <ul className={styles.tabBar}>
        
        <ActionTab 
          value="bun"
          title="Булки"
          active={activeTab === "bun"}
          onClick={
            () => {
              dispatch(setActiveTab("bun"))
            }
          }
        />
        <ActionTab 
          value="sauce"
          title="Соусы"
          active={activeTab === "sauce"}
          onClick={
            () => {
              dispatch(setActiveTab("sauce"))
            }            
          }
        />
        <ActionTab 
          value="main"
          title="Начинки"
          active={activeTab === "main"}
          onClick={
            () => {
              dispatch(setActiveTab("main"))
            }            
          }
        />
      
      </ul>
    </nav>
  );
};

export default TabBar;
