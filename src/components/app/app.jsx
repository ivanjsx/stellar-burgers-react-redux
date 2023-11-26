// libraries
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// components
import Modal from "../modal/modal";
import Logout from "../logout/logout";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OnlyUponEmailSent from "../only-upon-email-sent/only-upon-email-sent";
import OnlyAuthorizedAccess from "../only-authorized-access/only-authorized-access";
import OnlyUnauthorizedAccess from "../only-unauthorized-access/only-unauthorized-access";

// layouts
import { RootLayout, AccountLayout } from "../../layouts";

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
  ForgotPasswordPage,
  SetNewPasswordPage,
} from "../../pages";

// constants 
import { 
  HOME_PAGE_PATH,
  FEED_PAGE_RELATIVE_PATH,
  LOGIN_PAGE_RELATIVE_PATH,
  LOGOUT_PAGE_RELATIVE_PATH,
  PROFILE_PAGE_RELATIVE_PATH,
  HISTORY_PAGE_RELATIVE_PATH,
  REGISTER_PAGE_RELATIVE_PATH,
  OWN_ORDER_PAGE_RELATIVE_PATH,
  OWN_ORDER_PAGE_ABSOLUTE_PATH,
  INGREDIENT_PAGE_RELATIVE_PATH,
  INGREDIENT_PAGE_ABSOLUTE_PATH,
  COMMON_ORDER_PAGE_RELATIVE_PATH,
  COMMON_ORDER_PAGE_ABSOLUTE_PATH,
  FORGOT_PASSWORD_PAGE_RELATIVE_PATH,
  SET_NEW_PASSWORD_PAGE_RELATIVE_PATH,
} from "../../utils/constants";

// actions
import { requestAvailableStock } from "../../services/burger-ingredients/burger-ingredients-thunks";

// hooks 
import useAuth from "../../hooks/use-auth";



function App() {
  
  const dispatch = useDispatch();

  const { checkUserAuth } = useAuth();
  
  useEffect(
    () => {
      dispatch(
        requestAvailableStock()
      ).then(
        () => {
          checkUserAuth();
        }
      );
    },
    [checkUserAuth]
  );    
  
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
          path={HOME_PAGE_PATH}
          element={<RootLayout />} 
        >
          <Route 
            index
            element={<HomePage />} 
          />
          <Route 
            path={FEED_PAGE_RELATIVE_PATH} 
            element={<FeedPage />} 
          />
          <Route 
            path={OWN_ORDER_PAGE_RELATIVE_PATH}
            element={<OrderPage />}            
          />
          <Route 
            path={COMMON_ORDER_PAGE_RELATIVE_PATH}
            element={<OrderPage />}            
          />
          <Route 
            path={INGREDIENT_PAGE_RELATIVE_PATH}
            element={<IngredientPage />} 
          />        
          <Route
            path={LOGIN_PAGE_RELATIVE_PATH}
            element={
              <OnlyUnauthorizedAccess element={<LoginPage />} />
            }
          />
          <Route
            path={LOGOUT_PAGE_RELATIVE_PATH}
            element={
              <OnlyAuthorizedAccess element={<Logout />} />
            }
          />               
          <Route 
            path={REGISTER_PAGE_RELATIVE_PATH}
            element={
              <OnlyUnauthorizedAccess element={<RegisterPage />} />
            }             
          />
          <Route 
            path={FORGOT_PASSWORD_PAGE_RELATIVE_PATH}
            element={
              <OnlyUnauthorizedAccess element={<ForgotPasswordPage />} />
            }
          />            
          <Route 
            path={SET_NEW_PASSWORD_PAGE_RELATIVE_PATH}
            element={
              <OnlyUnauthorizedAccess 
                element={
                  <OnlyUponEmailSent element={<SetNewPasswordPage />}/>
                } 
              />
            }             
          />     
          <Route 
            path={PROFILE_PAGE_RELATIVE_PATH}
            element={
              <OnlyAuthorizedAccess element={<AccountLayout />} />
            } 
          >
            <Route 
              index 
              element={
                <OnlyAuthorizedAccess element={<ProfilePage />} />
              } 
            />          
            <Route 
              path={HISTORY_PAGE_RELATIVE_PATH}
              element={
                <OnlyAuthorizedAccess element={<HistoryPage />} />
              } 
            />
          </Route>        
          <Route 
            path="*" 
            element={<ErrorPage title="Упс! Такой страницы нет" showTips={true} />}
          />        
        </Route>
      </Routes>
      
      {
        background && (
          <Routes>
            <Route
              path={INGREDIENT_PAGE_ABSOLUTE_PATH}
              element={
                <Modal 
                  closeHandler={handleModalClose}
                  children={<IngredientDetails />} 
                />
              }
            />
            <Route
              path={COMMON_ORDER_PAGE_ABSOLUTE_PATH}
              element={
                <Modal 
                  closeHandler={handleModalClose}
                  children={<OrderDetails />} 
                />
              }
            />
            <Route
              path={OWN_ORDER_PAGE_ABSOLUTE_PATH}
              element={
                <Modal 
                  closeHandler={handleModalClose}
                  children={<OrderDetails />} 
                />
              }
            />                        
          </Routes>
        )
      }        
    </>
  );
};

export default App;
