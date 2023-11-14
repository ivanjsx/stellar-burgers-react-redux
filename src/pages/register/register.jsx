// libraries
import { useState } from "react";
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
import { registerUser } from "../../services/user/user-thunks";

// hooks
import useForm from "../../hooks/use-form";



function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  
  const { onChange } = useForm();
  
  function onSubmit(event) {
    event.preventDefault();
    registerUser({ name, email, password });
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
          onChange={onChange(setName, setIsNameValid)}
        />        
        <EmailInput
          name="email"
          value={email}
          onChange={onChange(setEmail, setIsEmailValid)}
        />        
        <PasswordInput
          name="password"
          value={password}
          onChange={onChange(setPassword, setIsPasswordValid)}
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
