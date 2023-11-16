// libraries
import { createSlice } from "@reduxjs/toolkit";

// constants 
import { BURGER_INGREDIENTS_STATE_NAME } from "../../utils/constants";

// actions
import { requestAvailableIngredientsStock } from "./burger-ingredients-thunks";



const burgerIngredientsSlice = createSlice(
  {
    name: BURGER_INGREDIENTS_STATE_NAME,
    
    initialState: {
      availableIngredientsStock: [],
      errorRequestingIngredients: false,
      pendingRequestingIngredients: false,
    },
    
    reducers: {},
    
    extraReducers: builder => {
      builder.addCase(
        requestAvailableIngredientsStock.pending, state => {
          state.pendingRequestingIngredients = true;
        }
      ).addCase(
        requestAvailableIngredientsStock.rejected, (state, action) => {
          state.errorRequestingIngredients = true;
          state.pendingRequestingIngredients = false;
          console.error(action.payload);
        }
      ).addCase(
        requestAvailableIngredientsStock.fulfilled, (state, action) => {
          state.errorRequestingIngredients = false;
          state.pendingRequestingIngredients = false;
          state.availableIngredientsStock = action.payload;
        }
      ).addDefaultCase(
        state => state
      );
    },
  }
);

export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;
