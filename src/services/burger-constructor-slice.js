// libraries
import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// utils
import { postRequest } from "../api/request";



const NAME = "burgerConstructor";



export const requestOrderPlacement = createAsyncThunk(
  `${NAME}/requestOrderPlacement`,
  arg => {
    return postRequest(
      "orders/", { ingredients: arg }
    );
  }
);



export const burgerConstructorSlice = createSlice(
  {
    name: NAME,
    initialState: {
      chosenBun: null,
      chosenToppings: [],
      canPlaceOrder: false,
      errorRequestingOrder: false,
      pendingRequestingOrder: false,
      previewableOrder: null
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
      resetPreviewableOrder: state => {
        state.previewableOrder = null;        
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
          state.previewableOrder = action.payload;
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
  resetPreviewableOrder,
  addTopping, 
  dragTopping 
} = burgerConstructorSlice.actions;
