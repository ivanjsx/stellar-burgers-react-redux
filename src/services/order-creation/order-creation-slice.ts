// libraries
import { createSlice } from "@reduxjs/toolkit";

// constants 
import { ORDER_CREATION_STATE_NAME } from "../../utils/constants";

// actions
import { createOrder } from "./order-creation-thunks";

// images
import doneImage from "../../images/done.svg";
import failedImage from "../../images/failed.svg";
import pendingImage from "../../images/pending.svg";

// types 
import { CreatedOrderType } from "../../utils/types";



type InitialStateType = {
  createdOrder: CreatedOrderType | null,
  errorCreatingOrder: boolean,
  pendingCreatingOrder: boolean,      
  status: string,
  action: string,
  iconSrc: string,
  suggestion: string,
}

const initialState: InitialStateType = {
  createdOrder: null,
  errorCreatingOrder: false,
  pendingCreatingOrder: false,      
  status: "",
  action: "",
  iconSrc: "",
  suggestion: "",
}



const orderCreationSlice = createSlice(
  {
    name: ORDER_CREATION_STATE_NAME,
    initialState,
    
    reducers: {
      resetCreatedOrder: (state) => {
        state.createdOrder = null;        
      }
    },
    
    extraReducers: (builder) => {
      builder.addCase(
        createOrder.pending, (state) => {
          state.pendingCreatingOrder = true;
          state.createdOrder = {};
          state.status = "Creating an order";
          state.action = "We’ll start preparing the order soon";
          state.iconSrc = pendingImage;          
          state.suggestion = "It usually doesn’t take much time";
        }
      ).addCase(
        createOrder.rejected, (state, action) => {
          console.error(action.payload);
          state.errorCreatingOrder = true;
          state.pendingCreatingOrder = false;
          state.createdOrder = {};
          state.status = "Failed to create order";
          state.action = "Something went wrong";
          state.iconSrc = failedImage;             
          state.suggestion = "It would be best if you contact support";
        }
      ).addCase(
        createOrder.fulfilled, (state, action) => {
          state.errorCreatingOrder = false;
          state.pendingCreatingOrder = false;
          state.createdOrder = action.payload;
          state.status = "order id";
          state.action = "Your order has started being prepared";
          state.iconSrc = doneImage;               
          state.suggestion = "Wait for completion at the orbital station";
        }
      ).addDefaultCase(
        (state) => state
      );
    },
  }
);

export const { resetCreatedOrder } = orderCreationSlice.actions;

export const orderCreationReducer = orderCreationSlice.reducer;
