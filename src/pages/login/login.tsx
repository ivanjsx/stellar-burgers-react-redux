// libraries
import { FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// components
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./login.module.css";

// urls 
import { 
  REGISTER_PAGE_ABSOLUTE_PATH, 
  FORGOT_PASSWORD_PAGE_ABSOLUTE_PATH,
} from "../../utils/urls";

// actions
import { loginUser } from "../../services/user/user-thunks";

// hooks
import useForm from "../../hooks/use-form";
import { useAppDispatch } from "../../services/store";



const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  
  const { onChange } = useForm();
  const dispatch = useAppDispatch();
  
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
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
