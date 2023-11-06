// libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import { ProtectedRouteElement } from "./protected-route-element"

// layouts
import { RootLayout } from "../layouts";

// pages
import { 
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  IngredientPage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from "../pages";



function App() {
  

  return (
    <Router>
      <Routes>
        <Route 
          index 
          element={<RootLayout />} 
        >
          <Route 
            index 
            element={<HomePage />} 
          />
          <Route
            path="login" 
            element={
              <ProtectedRouteElement element={<LoginPage />} />
            }
          />
          <Route 
            path="profile" 
            element={
              <ProtectedRouteElement element={<ProfilePage />} />
            } 
          />
          <Route 
            path="register" 
            element={
              <ProtectedRouteElement element={<RegisterPage />} />
            }             
          />
          <Route 
            path="reset-password" 
            element={
              <ProtectedRouteElement element={<ResetPasswordPage />} />
            }             
          />
          <Route 
            path="forgot-password" 
            element={
              <ProtectedRouteElement element={<ForgotPasswordPage />} />
            }             
          />
          <Route 
            path="ingredients/:ingredientId" 
            element={<IngredientPage />} 
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
