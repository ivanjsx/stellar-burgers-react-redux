// libraries
import { combineReducers } from "redux";

// slices
import { modalSlice } from "./modal-slice";
import { burgerIngredientsSlice } from "./burger-ingredients-slice";
import { burgerConstructorSlice } from "./burger-constructor-slice";
import { userSlice } from "./user-slice";



export const rootReducer = combineReducers(
  {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    burgerIngredients: burgerIngredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer
  }    
);
