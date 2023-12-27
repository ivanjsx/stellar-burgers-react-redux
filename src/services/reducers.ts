// libraries
import { combineReducers } from "@reduxjs/toolkit"

// constants 
import { 
  USER_STATE_NAME,
  ORDER_FEED_STATE_NAME,
  ORDER_DETAILS_STATE_NAME,
  ORDER_CREATION_STATE_NAME,
  BURGER_INGREDIENTS_STATE_NAME,
  BURGER_CONSTRUCTOR_STATE_NAME,
} from "../utils/constants";

// reducers
import { userReducer } from "./user/user-slice";
import { orderFeedReducer } from "./order-feed/order-feed-slice";
import { orderDetailsReducer } from "./order-details/order-details-slice";
import { orderCreationReducer } from "./order-creation/order-creation-slice";
import { burgerIngredientsReducer } from "./burger-ingredients/burger-ingredients-slice";
import { burgerConstructorReducer } from "./burger-constructor/burger-constructor-slice";



export const rootReducer = combineReducers(
  {
    [USER_STATE_NAME]: userReducer,
    [ORDER_FEED_STATE_NAME]: orderFeedReducer,
    [ORDER_DETAILS_STATE_NAME]: orderDetailsReducer,
    [ORDER_CREATION_STATE_NAME]: orderCreationReducer,
    [BURGER_INGREDIENTS_STATE_NAME]: burgerIngredientsReducer,
    [BURGER_CONSTRUCTOR_STATE_NAME]: burgerConstructorReducer,
  }    
);

export type RootStateType = ReturnType<typeof rootReducer>;
