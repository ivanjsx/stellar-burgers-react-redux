// libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// components
import Modal from "./modal/modal";
import Logout from "./logout/logout";
import IngredientDetails from "./ingredient-details/ingredient-details";
import AuthorizedAccessOnly from "./authorized-access-only/authorized-access-only";
import UnauthorizedAccessOnly from "./unauthorized-access-only/unauthorized-access-only";

// layouts
import { RootLayout, AccountLayout } from "../layouts";

// pages
import { 
  HomePage,
  FeedPage,  
  ErrorPage,
  LoginPage,
  OrderPage,
  HistoryPage,
  ProfilePage,
  RegisterPage,
  IngredientPage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from "../pages";

// constants 
import { 
  HOME_PAGE_PATH,
  FEED_PAGE_RELATIVE_PATH,
  LOGIN_PAGE_RELATIVE_PATH,
  ORDER_PAGE_RELATIVE_PATH,
  LOGOUT_PAGE_RELATIVE_PATH,
  PROFILE_PAGE_RELATIVE_PATH,
  HISTORY_PAGE_RELATIVE_PATH,
  REGISTER_PAGE_RELATIVE_PATH,
  INGREDIENT_PAGE_RELATIVE_PATH,
  INGREDIENT_PAGE_ABSOLUTE_PATH,
  RESET_PASSWORD_PAGE_RELATIVE_PATH,
  FORGOT_PASSWORD_PAGE_RELATIVE_PATH,
} from "../utils/constants";

// actions
import { requestAvailableIngredientsStock } from "../services/burger-ingredients-slice";




function App() {
  
  const dispatch = useDispatch();
  
  React.useEffect(
    () => {
      dispatch(requestAvailableIngredientsStock());
    },
    []
  );    
  
  // React.useEffect(
  //   () => {
  //     dispatch(checkUserAuth());
  //   }, 
  //   []
  // );    
  
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  
  const handleModalClose = () => {
    navigate(-1);
  };
    
  return (
    <>
      <Routes location={background || location}>
        <Route 
          path={HOME_PAGE_PATH.concat("*")}
          element={<RootLayout />} 
        >
          <Route 
            path="/*"
            element={<HomePage />} 
          />
          <Route 
            path={FEED_PAGE_RELATIVE_PATH} 
            element={<FeedPage />} 
          />        
          <Route 
            path={INGREDIENT_PAGE_RELATIVE_PATH}
            element={<IngredientPage />} 
          />        
          <Route
            path={LOGIN_PAGE_RELATIVE_PATH}
            element={
              <LoginPage />
              // <UnauthorizedAccessOnly element={<LoginPage />} />
            }
          />
          <Route
            path={LOGOUT_PAGE_RELATIVE_PATH}
            element={
              <Logout />
              // <AuthorizedAccessOnly element={<Logout />} />
            }
          />               
          <Route 
            path={REGISTER_PAGE_RELATIVE_PATH}
            element={
              <RegisterPage />
              // <UnauthorizedAccessOnly element={<RegisterPage />} />
            }             
          />
          <Route 
            path={FORGOT_PASSWORD_PAGE_RELATIVE_PATH}
            element={
              <ForgotPasswordPage />
              // <UnauthorizedAccessOnly element={<ForgotPasswordPage />} />
            }
          />            
          <Route 
            path={RESET_PASSWORD_PAGE_RELATIVE_PATH}
            element={
              <ResetPasswordPage />
              // <UnauthorizedAccessOnly element={<ResetPasswordPage />} />
            }             
          />     
          <Route 
            path={PROFILE_PAGE_RELATIVE_PATH}
            element={
              <AccountLayout />
              // <AuthorizedAccessOnly element={<AccountLayout />} />
            } 
          >
            <Route 
              index 
              element={
                <ProfilePage />
                // AuthorizedAccessOnly ??
              } 
            />          
            <Route 
              path={HISTORY_PAGE_RELATIVE_PATH}
              element={
                <HistoryPage />
                // AuthorizedAccessOnly ??
              } 
            >
              <Route 
                path={ORDER_PAGE_RELATIVE_PATH}
                element={
                  <OrderPage />
                  // AuthorizedAccessOnly ??
                }             
              />
            </Route>
          </Route>        
          <Route 
            path="*" 
            element={<ErrorPage title={"Упс! Такой страницы нет"} showTips={true} />}
          />        
        </Route>
      </Routes>

      {
        background && (
          <Routes>
            <Route
              path={INGREDIENT_PAGE_ABSOLUTE_PATH}
              element={
                <Modal children={<IngredientDetails />} onClose={handleModalClose} />
              }
            />
          </Routes>
        )
      }        
    </>
  );
};

export default App;
