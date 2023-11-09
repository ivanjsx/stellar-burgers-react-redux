// libraries
import React from "react";
import { useSelector } from "react-redux";

// components
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./profile.module.css";

// actions 
import { updateUserInfo } from "../../services/user-slice";



function ProfilePage() {
  
  const { currentUser } = useSelector(state => state.user);
  
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [password, setPassword] = React.useState(currentUser.password);
  
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
    updateUserInfo({ name, email, password });
  };
  
  return (
    <>
      <p className={styles.description}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            name="name"
            value={name}
            onChange={onNameChange}
            icon="EditIcon"
          />        
          <EmailInput
            name="email"
            value={email}
            onChange={onEmailChange}
            isIcon={true}
          />        
          <PasswordInput
            name="password"
            value={password}
            onChange={onPasswordChange}
            icon="EditIcon"
          />
          <Button
            size="medium" 
            type="primary" 
            htmlType="submit" 
            disabled={!isNameValid || !isEmailValid || !isPasswordValid}
            extraClass={styles.submit}
          >
            Сохранить
          </Button>           
        </form>      
      </div>
    </>
  );
};

export default ProfilePage;
