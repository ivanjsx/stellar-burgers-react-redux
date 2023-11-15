// libraries
import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

// constants 
import { BURGER_CONSTRUCTOR_STATE_NAME } from "../../utils/constants";



const burgerConstructorSlice = createSlice(
  {
    name: BURGER_CONSTRUCTOR_STATE_NAME,
    
    initialState: {
      chosenBun: null,
      chosenToppings: [],
      canPlaceOrder: false,
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
  }
);

export const { 
  emptyCart, 
  setChosenBun, 
  removeTopping, 
  addTopping, 
  dragTopping 
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
