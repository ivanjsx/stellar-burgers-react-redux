// libraries
import React from "react";
import { Link } from "react-router-dom";

// components
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./forgot-password.module.css";

// constants 
import { LOGIN_PAGE_PATH } from "../../utils/constants";

// actions
import { resetPassword } from "../../services/user-slice";



function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");

  const [isEmailValid, setIsEmailValid] = React.useState(false);

  function onEmailChange(event) {
    setEmail(event.target.value);
    setIsEmailValid(event.target.validity.valid);
  };

  function onSubmit(event) {
    event.preventDefault();
    resetPassword({ email });
  };

  return (
    <>
      <h1 className={styles.heading}>
        Восстановление пароля
      </h1>            
      <form className={styles.form} onSubmit={onSubmit}>   
        <EmailInput
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Укажите e-mail"
        />        
        <Button 
          size="medium" 
          type="primary" 
          htmlType="submit" 
          disabled={!isEmailValid}
        >
          Восстановить
        </Button>           
      </form>
      <div className={styles.tips}>
        <p className={styles.tip}>
          Вспомнили пароль?&nbsp;
          <Link to={LOGIN_PAGE_PATH} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
