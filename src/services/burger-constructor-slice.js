// libraries
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// constants
import { BASE_URL } from "../utils/constants";
const ENDPOINT_PATH = "orders/";



export const fetchOrderPlacement = createAsyncThunk(
  "burgerConstructor/fetchOrderPlacement",
  (arg, thunkAPI) => {
    return fetch(
      BASE_URL+ENDPOINT_PATH, {
        method: "POST",
        body: JSON.stringify({ingredients: arg})
      }
    ).then(
      response => response.ok
                  ? response.json()
                  : Promise.reject(`error: ${response.status} ${response.statusText}`)
    ).then(
      object => (object.success && object.order.number)
                ? object
                : Promise.reject(`error: ${object}`)
    ).catch(
      error => {
        console.error("error:", error.message);
        return thunkAPI.rejectWithValue(error);
      }
    );
  }
);



export const burgerConstructorSlice = createSlice(
  {
    name: "burgerConstructor",
    initialState: {
      chosenBun: null,
      chosenToppings: [],
      errorFetchingOrder: false,
      pendingFetchingOrder: false,
      canPlaceOrder: false,
      placedOrder: null
    },
    reducers: {
      emptyCart: state => {
        state.chosenBun = null;
        state.chosenToppings = [];
        state.canPlaceOrder = false;
      },
      setChosenBun: (state, action) => {
        state.chosenBun = action.payload;
        state.canPlaceOrder = true;
      },
      addTopping: (state, action) => {
        state.chosenToppings.push(action.payload);
      },
      removeTopping: (state, action) => {
        state.chosenToppings.splice(action.payload, 1)
      }
    },
    extraReducers: builder => {
      builder.addCase(
        fetchOrderPlacement.pending, 
        state => {
          state.pendingFetchingOrder = true;
        }
      ).addCase(
        fetchOrderPlacement.rejected, 
        state => {
          state.errorFetchingOrder = true;
          state.pendingFetchingOrder = false;
        }
      ).addCase(
        fetchOrderPlacement.fulfilled, 
        (state, action) => {
          state.errorFetchingOrder = false;
          state.pendingFetchingOrder = false;
          state.placedOrder = action.payload;
        }
      ).addDefaultCase(
        state => state
      )
    }
  }
);

export const {emptyCart, setChosenBun, addTopping, removeTopping} = burgerConstructorSlice.actions;
