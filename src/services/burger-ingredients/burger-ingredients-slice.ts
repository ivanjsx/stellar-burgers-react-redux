// libraries
import { createSlice } from "@reduxjs/toolkit";

// constants 
import { BURGER_INGREDIENTS_STATE_NAME } from "../../utils/constants";

// actions
import { requestAvailableStock } from "./burger-ingredients-thunks";

// types 
import { IngredientType } from "../../utils/types";



type InitialStateType = {
  availableStock: Map<string, IngredientType>,
  errorRequestingIngredients: boolean,
  pendingRequestingIngredients: boolean,
}

const initialState: InitialStateType = {
  availableStock: new Map(),
  errorRequestingIngredients: false,
  pendingRequestingIngredients: false,
}



const burgerIngredientsSlice = createSlice(
  {
    name: BURGER_INGREDIENTS_STATE_NAME,
    initialState,
    reducers: {},
    
    extraReducers: (builder) => {
      builder.addCase(
        requestAvailableStock.pending, (state) => {
          state.pendingRequestingIngredients = true;
        }
      ).addCase(
        requestAvailableStock.rejected, (state, action) => {
          state.errorRequestingIngredients = true;
          state.pendingRequestingIngredients = false;
          console.error(action.payload);
        }
      ).addCase(
        requestAvailableStock.fulfilled, (state, action) => {
          state.errorRequestingIngredients = false;
          state.pendingRequestingIngredients = false;
          state.availableStock = action.payload;
        }
      ).addDefaultCase(
        (state) => state
      );
    },
  }
);

export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;
