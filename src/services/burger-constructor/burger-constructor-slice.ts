// libraries
import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// constants 
import { BURGER_CONSTRUCTOR_STATE_NAME } from "../../utils/constants";
import { IngredientType } from "../../utils/types";



type InitialStateType = {
  chosenBun: IngredientType | null,
  chosenToppings: Array<IngredientType>,
  canPlaceOrder: boolean,
}

const initialState: InitialStateType = {
  chosenBun: null,
  chosenToppings: [],
  canPlaceOrder: false,
}

const burgerConstructorSlice = createSlice(
  {
    name: BURGER_CONSTRUCTOR_STATE_NAME,
    initialState,
    
    reducers: {
      emptyCart: state => {
        state.chosenBun = null;
        state.chosenToppings = [];
        state.canPlaceOrder = false;
      },
      setChosenBun: (state, action: PayloadAction<IngredientType>) => {
        state.chosenBun = action.payload;
        state.canPlaceOrder = true;
      },
      removeTopping: (state, action: PayloadAction<number>) => {
        state.chosenToppings.splice(action.payload, 1)
      },
      
      addTopping: {
        prepare: (topping: IngredientType) => {
          const _uuidv4 = uuidv4();
          return {
            payload: { _uuidv4, ...topping }
          };
        },        
        reducer: (state, action: PayloadAction<IngredientType>) => {
          state.chosenToppings.push(action.payload);
        }
      },
      
      dragTopping: {
        prepare: (fromIndex: number, toIndex: number) => {
          return {
            payload: { fromIndex, toIndex }
          }
        },
        reducer: (state, action: PayloadAction<{ fromIndex: number, toIndex: number }>) => {
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
