// libraries
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";


// components
import AuthorizedAccessOnly from "./authorized-access-only/authorized-access-only";
import UnauthorizedAccessOnly from "./unauthorized-access-only/unauthorized-access-only";

// layouts
import RootLayout from "../layouts/root/root";

// pages
import { 
  HomePage,
  ErrorPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  IngredientPage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from "../pages";

// constants 
import { 
  HOME_PAGE_PATH,
  LOGIN_PAGE_PATH,
  PROFILE_PAGE_PATH,
  REGISTER_PAGE_PATH,
  RESET_PASSWORD_PAGE_PATH,
  FORGOT_PASSWORD_PAGE_PATH
} from "../utils/constants";



function App() {
  const dispatch = useDispatch();

  // useEffect(
  //   () => {
  //     dispatch(checkUserAuth());
  //   }, 
  //   []
  // );  

  return (
    <Routes>
      <Route 
        path={HOME_PAGE_PATH}
        element={<RootLayout />} 
      >
        <Route 
          index 
          element={<HomePage />} 
        />
        <Route 
          path="ingredients/:ingredientId" 
          element={<IngredientPage />} 
        />        
        <Route 
          path={PROFILE_PAGE_PATH}
          element={
            <ProfilePage />
            // <AuthorizedAccessOnly element={<ProfilePage />} />
          } 
        />
        <Route
          path={LOGIN_PAGE_PATH}
          element={
            <LoginPage />
            // <UnauthorizedAccessOnly element={<LoginPage />} />
          }
        />
        <Route 
          path={REGISTER_PAGE_PATH}
          element={
            <RegisterPage />
            // <UnauthorizedAccessOnly element={<RegisterPage />} />
          }             
        />
        <Route 
          path={RESET_PASSWORD_PAGE_PATH}
          element={
            <ResetPasswordPage />
            // <UnauthorizedAccessOnly element={<ResetPasswordPage />} />
          }             
        />
        <Route 
          path={FORGOT_PASSWORD_PAGE_PATH}
          element={
            <ForgotPasswordPage />
            // <UnauthorizedAccessOnly element={<ForgotPasswordPage />} />
          }
        />
      </Route>
      <Route 
        path="*" 
          element={<ErrorPage title={"Упс! Такой страницы нет"} showTips={true} />}
      />
    </Routes>
  );
};

export default App;
