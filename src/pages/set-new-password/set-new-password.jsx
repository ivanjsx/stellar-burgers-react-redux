// libraries
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

// components
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./set-new-password.module.css";

// constants 
import { LOGIN_PAGE_ABSOLUTE_PATH } from "../../utils/constants";

// actions
import { setNewPassword } from "../../services/user/user-thunks";

// hooks
import useForm from "../../hooks/use-form";



function SetNewPasswordPage() {
  
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isSecurityCodeValid, setIsSecurityCodeValid] = useState(false);
  
  const { onChange } = useForm();
  const dispatch = useDispatch();
  
  function onSubmit(event) {
    event.preventDefault();
    dispatch(setNewPassword({ password, securityCode }));
  };
  
  return (
    <>
      <h1 className={styles.heading}>
        Восстановление пароля
      </h1>            
      <form className={styles.form} onSubmit={onSubmit}>   
        <PasswordInput
          placeholder="Введите новый пароль"
          name="password"
          value={password}
          onChange={onChange(setPassword, setIsPasswordValid)}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          name="securityCode"
          value={securityCode}
          onChange={onChange(setSecurityCode, setIsSecurityCodeValid)}
        />          
        <Button 
          size="medium" 
          type="primary" 
          htmlType="submit" 
          disabled={!isPasswordValid || !isSecurityCodeValid}
          children="Сохранить"
        />           
      </form>
      <div className={styles.tips}>
        <p className={styles.tip}>
          Вспомнили пароль?&nbsp;
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

export default SetNewPasswordPage;
