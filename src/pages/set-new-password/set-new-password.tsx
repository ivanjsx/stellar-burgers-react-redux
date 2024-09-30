// libraries
import { useState, FC, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./set-new-password.module.css";

// urls 
import { LOGIN_PAGE_ABSOLUTE_PATH } from "../../utils/urls";

// actions
import { setNewPassword } from "../../services/user/user-thunks";

// hooks
import useForm from "../../hooks/use-form";
import { useAppDispatch } from "../../services/store";


const SetNewPasswordPage: FC = () => {
  
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isSecurityCodeValid, setIsSecurityCodeValid] = useState(false);
  
  const { onChange } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(
      setNewPassword({ password, securityCode })
    ).then(
      () => {
        navigate(LOGIN_PAGE_ABSOLUTE_PATH);
      }
    );
  };
  
  return (
    <>
      <h1 className={styles.heading}>
        Password Recovery
      </h1>            
      <form className={styles.form} onSubmit={onSubmit}>   
        <PasswordInput
          placeholder="Type in your new password"
          name="password"
          value={password}
          onChange={onChange(setPassword, setIsPasswordValid)}
        />
        <Input
          type="text"
          placeholder="Type in the security code"
          name="securityCode"
          value={securityCode}
          onChange={onChange(setSecurityCode, setIsSecurityCodeValid)}
        />          
        <Button 
          size="medium" 
          type="primary" 
          htmlType="submit" 
          disabled={!isPasswordValid || !isSecurityCodeValid}
          children="Save"
        />           
      </form>
      <div className={styles.tips}>
        <p className={styles.tip}>
          Recalled your password?&nbsp;
          <Link 
            to={LOGIN_PAGE_ABSOLUTE_PATH} 
            className={styles.link}
            children="Sign In"
          />
        </p>
      </div>
    </>
  );
};

export default SetNewPasswordPage;
