// libraries
import { useNavigate } from "react-router-dom";

// components  
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./error.module.css";

// constants 
import { HOME_PAGE_PATH } from "../../utils/constants";



function ErrorPage({ title, showTips }) {
  let navigate = useNavigate();
  
  function goBack() {
    navigate(-1);
  };

  function goHome() {
    navigate(HOME_PAGE_PATH);
  };

  return (
    <>
      <h1 className={styles.title}>
        {title}
      </h1>
      {
        showTips && 
        <div className={styles.tip}>
          <p>
            Но вы всегда можете&nbsp;
          </p>
          <Button 
            onClick={goBack} 
            htmlType="button" 
            type="secondary" 
            size="medium"
            children="вернуться назад"
          />
          <p>
            &nbsp;или перейти на&nbsp;
          </p>  
          <Button 
            onClick={goHome} 
            htmlType="button" 
            type="secondary" 
            size="medium"
            children="главную страницу"
          />
        </div>
      }
    </>
  );
};

export default ErrorPage;
