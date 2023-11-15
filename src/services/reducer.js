// libraries
import { combineReducers } from "redux";

// constants 
import { 
  USER_STATE_NAME,
  CREATE_ORDER_STATE_NAME,
  BURGER_INGREDIENTS_STATE_NAME,
  BURGER_CONSTRUCTOR_STATE_NAME,
} from "../utils/constants";

// reducers
import { userReducer } from "./user/user-slice";
import { createOrderReducer } from "./create-order/create-order-slice";
import { burgerIngredientsReducer } from "./burger-ingredients/burger-ingredients-slice";
import { burgerConstructorReducer } from "./burger-constructor/burger-constructor-slice";



export const rootReducer = combineReducers(
  {
    [USER_STATE_NAME]: userReducer,
    [CREATE_ORDER_STATE_NAME]: createOrderReducer,
    [BURGER_INGREDIENTS_STATE_NAME]: burgerIngredientsReducer,
    [BURGER_CONSTRUCTOR_STATE_NAME]: burgerConstructorReducer
  }    
);
