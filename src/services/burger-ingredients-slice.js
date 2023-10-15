// libraries
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// constants
import { BASE_URL } from "../utils/constants";
const ENDPOINT_PATH = "ingredients/";



export const fetchAvailableIngredientsStock = createAsyncThunk(
  "burgerIngredients/fetchAvailableIngredientsStock",
  (arg, thunkAPI) => {
    return fetch(
      BASE_URL+ENDPOINT_PATH, {
        method: "GET"
      }
    ).then(
      response => response.ok
                  ? response.json()
                  : Promise.reject(`error: ${response.status} ${response.statusText}`)
    ).then(
      object => (object.success && object.data.length)
                ? object.data
                : Promise.reject(`error: ${object}`)
    ).catch(
      error => {
        console.error("error:", error.message);
        return thunkAPI.rejectWithValue(error);
      }
    );        
  }
);



export const burgerIngredientsSlice = createSlice(
  {
    name: "burgerIngredients",
    initialState: {
      activeTab: "bun",
      availableIngredientsStock: null,
      errorFetchingIngredients: false,
      pendingFetchingIngredients: false,
    },
    reducers: {
      setActiveTab: (state, action) => {
        state.activeTab = action.payload
      }
    },
    extraReducers: builder => {
      builder.addCase(
        fetchAvailableIngredientsStock.pending, 
        state => {
          state.pendingFetchingIngredients = true;
        }
      ).addCase(
        fetchAvailableIngredientsStock.rejected, 
        state => {
          state.errorFetchingIngredients = true;
          state.pendingFetchingIngredients = false;
        }
      ).addCase(
        fetchAvailableIngredientsStock.fulfilled, 
        (state, action) => {
          state.errorFetchingIngredients = false;
          state.pendingFetchingIngredients = false;
          state.availableIngredientsStock = action.payload;
        }
      ).addDefaultCase(
        state => state
      )
    }
  }
);

export const { setActiveTab } = burgerIngredientsSlice.actions;
