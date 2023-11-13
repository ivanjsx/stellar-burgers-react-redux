// libraries
import { combineReducers } from "redux";

// slices
import { userSlice } from "./user-slice";
import { burgerIngredientsSlice } from "./burger-ingredients-slice";
import { burgerConstructorSlice } from "./burger-constructor-slice";



export const rootReducer = combineReducers(
  {
    user: userSlice.reducer,
    burgerIngredients: burgerIngredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer
  }    
);
