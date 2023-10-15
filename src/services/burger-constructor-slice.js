// libraries
import { v4 as uuidv4 } from 'uuid';
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
        headers: {
          "Content-Type": "application/json"
        },        
        body: JSON.stringify(
          {
            ingredients: arg
          }
        )
      }
    ).then(
      response => response.ok
                  ? response.json()
                  : Promise.reject(`error: ${response.status}`)
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
      canPlaceOrder: false,
      errorFetchingOrder: false,
      pendingFetchingOrder: false,
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
      removeTopping: (state, action) => {
        state.chosenToppings.splice(action.payload, 1)
      },
      addTopping: {
        prepare: topping => {
          const _uuidv4 = uuidv4();
          return {
            payload: { _uuidv4, ...topping }
          };
        },        
        reducer: (state, action) => {
          state.chosenToppings.push(action.payload);
        }
      },
      dragTopping: {
        prepare: (fromIndex, toIndex) => {
          return {
            payload: { fromIndex, toIndex }
          }
        },
        reducer: (state, action) => {
          state.chosenToppings.splice(
            action.payload.toIndex,
            0,
            state.chosenToppings.splice(
              action.payload.fromIndex, 
              1
            )[0]
          )
        }
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

export const { 
  emptyCart, 
  setChosenBun, 
  removeTopping, 
  addTopping, 
  dragTopping 
} = burgerConstructorSlice.actions;
