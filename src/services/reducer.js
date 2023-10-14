// libraries
import { combineReducers } from "redux";

// slices
import { modalSlice } from "./modal-slice";
import { burgerIngredientsSlice } from "./burger-ingredients-slice";
import { burgerConstructorSlice } from "./burger-constructor-slice";



export const rootReducer = combineReducers(
  {
    modal: modalSlice.reducer,
    burgerIngredients: burgerIngredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer
  }    
);
