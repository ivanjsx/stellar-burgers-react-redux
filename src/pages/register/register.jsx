// libraries
import React from "react";
import { Link } from "react-router-dom";

// components
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./register.module.css";

// constants 
import { LOGIN_PAGE_ABSOLUTE_PATH } from "../../utils/constants";

// actions
import { createUser } from "../../services/user-slice";



function RegisterPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  function onNameChange(event) {
    setName(event.target.value);
    setIsNameValid(event.target.validity.valid);
  };

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
    createUser({ name, email, password });
  };

  return (
    <>
      <h1 className={styles.heading}>
        Регистрация
      </h1>            
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={name}
          onChange={onNameChange}
        />        
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
          disabled={!isNameValid || !isEmailValid || !isPasswordValid}
          children="Зарегистрироваться"
        />           
      </form>
      <div className={styles.tips}>
        <p className={styles.tip}>
          Уже зарегистрированы?&nbsp;
          <Link 
            to={LOGIN_PAGE_ABSOLUTE_PATH} 
            className={styles.link}
            children="Войти"
          />
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
