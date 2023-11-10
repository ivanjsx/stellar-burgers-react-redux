// libraries
import React from "react";
import { Link } from "react-router-dom";

// components
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./login.module.css";

// constants 
import { REGISTER_PAGE_ABSOLUTE_PATH, FORGOT_PASSWORD_PAGE_ABSOLUTE_PATH } from "../../utils/constants";

// actions
import { loginUser } from "../../services/user-slice";



function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  function onEmailChange(event) {
    setEmail(event.target.value);
    setIsEmailValid(event.target.validity.valid);
  };

  function onPasswordChange(event) {
    setPassword(event.target.value);
    setIsPasswordValid(event.target.validity.valid);
  };  

  function onSubmit(event) {
    event.preventDefault();
    loginUser({ email, password });
  };

  return (
    <>
      <h1 className={styles.heading}>
        Вход
      </h1>            
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput
          name="email"
          value={email}
          onChange={onEmailChange}
        />        
        <PasswordInput
          name="password"
          value={password}
          onChange={onPasswordChange}
        />
        <Button 
          size="medium" 
          type="primary" 
          htmlType="submit" 
          disabled={!isEmailValid || !isPasswordValid}
          children="Войти"
        />           
      </form>
      <div className={styles.tips}>
        <p className={styles.tip}>
          Вы — новый пользователь?&nbsp;
          <Link 
            to={REGISTER_PAGE_ABSOLUTE_PATH} 
            className={styles.link}
            children="Зарегистрироваться"
          />
        </p>
        <p className={styles.tip}>
          Забыли пароль?&nbsp;
          <Link 
            to={FORGOT_PASSWORD_PAGE_ABSOLUTE_PATH} 
            className={styles.link}
            children="Восстановить"
          />
        </p>
      </div>
    </>
  );
};

export default LoginPage;
