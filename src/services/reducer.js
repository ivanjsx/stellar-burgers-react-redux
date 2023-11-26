// libraries
import { combineReducers } from "redux";

// constants 
import { 
  USER_STATE_NAME,
  ORDER_FEED_STATE_NAME,
  ORDER_CREATION_STATE_NAME,
  BURGER_INGREDIENTS_STATE_NAME,
  BURGER_CONSTRUCTOR_STATE_NAME,
} from "../utils/constants";

// reducers
import { userReducer } from "./user/user-slice";
import { orderFeedReducer } from "./order-feed/order-feed-slice";
import { orderCreationReducer } from "./order-creation/order-creation-slice";
import { burgerIngredientsReducer } from "./burger-ingredients/burger-ingredients-slice";
import { burgerConstructorReducer } from "./burger-constructor/burger-constructor-slice";



export const rootReducer = combineReducers(
  {
    [USER_STATE_NAME]: userReducer,
    [ORDER_FEED_STATE_NAME]: orderFeedReducer,
    [ORDER_CREATION_STATE_NAME]: orderCreationReducer,
    [BURGER_INGREDIENTS_STATE_NAME]: burgerIngredientsReducer,
    [BURGER_CONSTRUCTOR_STATE_NAME]: burgerConstructorReducer
  }    
);
