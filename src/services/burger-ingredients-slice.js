// libraries
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// utils
import { getRequest } from "../api/request";



const NAME = "burgerIngredients";



export const requestAvailableIngredientsStock = createAsyncThunk(
  `${NAME}/requestAvailableIngredientsStock`,
  () => {
    return getRequest(
      "ingredients/"
    ).then(
      response => response.data
    );
  }
);



export const burgerIngredientsSlice = createSlice(
  {
    name: NAME,
    initialState: {
      availableIngredientsStock: [],
      errorRequestingIngredients: false,
      pendingRequestingIngredients: false,
    },
    reducers: {},
    extraReducers: builder => {
      builder.addCase(
        requestAvailableIngredientsStock.pending, 
        state => {
          state.pendingRequestingIngredients = true;
        }
      ).addCase(
        requestAvailableIngredientsStock.rejected, 
        (state, action) => {
          state.errorRequestingIngredients = true;
          state.pendingRequestingIngredients = false;
          console.error(action.payload);
        }
      ).addCase(
        requestAvailableIngredientsStock.fulfilled, 
        (state, action) => {
          state.errorRequestingIngredients = false;
          state.pendingRequestingIngredients = false;
          state.availableIngredientsStock = action.payload;
        }
      ).addDefaultCase(
        state => state
      )
    }
  }
);
