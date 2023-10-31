// libraries
import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// utils
import request from "../api/request";



export const requestOrderPlacement = createAsyncThunk(
  "burgerConstructor/requestOrderPlacement",
  arg => {
    return request(
      "orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },        
        body: JSON.stringify(
          { ingredients: arg }
        )
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
      errorRequestingOrder: false,
      pendingRequestingOrder: false,
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
        requestOrderPlacement.pending, 
        state => {
          state.pendingRequestingOrder = true;
        }
      ).addCase(
        requestOrderPlacement.rejected, 
        (state, action) => {
          state.errorRequestingOrder = true;
          state.pendingRequestingOrder = false;
          console.error(action.payload);
        }
      ).addCase(
        requestOrderPlacement.fulfilled, 
        (state, action) => {
          state.errorRequestingOrder = false;
          state.pendingRequestingOrder = false;
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
