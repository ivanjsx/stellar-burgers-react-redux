// libraries
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";


// components
import { AuthorizedAccessOnly, UnauthorizedAccessOnly } from "./protected-route/protected-route"

// layouts
import RootLayout from "../layouts/root/root";

// pages
import { 
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  NotFoundPage,
  IngredientPage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from "../pages";



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
        path="/" 
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
          path="profile" 
          element={
            <ProfilePage />
            // <AuthorizedAccessOnly element={<ProfilePage />} />
          } 
        />
        <Route
          path="login" 
          element={
            <LoginPage />
            // <UnauthorizedAccessOnly element={<LoginPage />} />
          }
        />
        <Route 
          path="register" 
          element={
            <RegisterPage />
            // <UnauthorizedAccessOnly element={<RegisterPage />} />
          }             
        />
        <Route 
          path="reset-password" 
          element={
            <ResetPasswordPage />
            // <UnauthorizedAccessOnly element={<ResetPasswordPage />} />
          }             
        />
        <Route 
          path="forgot-password" 
          element={
            <ForgotPasswordPage />
            // <UnauthorizedAccessOnly element={<ForgotPasswordPage />} />
          }
        />
      </Route>
      <Route 
        path="*" 
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default App;
