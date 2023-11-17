// libraries
import { createSlice } from "@reduxjs/toolkit";

// constants 
import { BURGER_INGREDIENTS_STATE_NAME } from "../../utils/constants";

// actions
import { requestAvailableStock } from "./burger-ingredients-thunks";



const burgerIngredientsSlice = createSlice(
  {
    name: BURGER_INGREDIENTS_STATE_NAME,
    
    initialState: {
      availableStock: [],
      errorRequestingIngredients: false,
      pendingRequestingIngredients: false,
    },
    
    reducers: {},
    
    extraReducers: builder => {
      builder.addCase(
        requestAvailableStock.pending, state => {
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
        state => state
      );
    },
  }
);

export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;
