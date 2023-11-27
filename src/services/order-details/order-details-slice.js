// libraries
import { createSlice } from "@reduxjs/toolkit";

// constants 
import { ORDER_DETAILS_STATE_NAME } from "../../utils/constants";

// actions
import { getOrderByNumber } from "./order-details-thunks";



const orderDetailsSlice = createSlice(
  {
    name: ORDER_DETAILS_STATE_NAME,
    
    initialState: {
      fetchedOrder: null,
      errorRequestingOrder: false,
      pendingRequestingOrder: false,
    },
    
    reducers: {},
    
    extraReducers: builder => {
      builder.addCase(
        getOrderByNumber.pending, state => {
          state.pendingRequestingOrder = true;
        }
      ).addCase(
        getOrderByNumber.rejected, (state, action) => {
          state.errorRequestingOrder = true;
          state.pendingRequestingOrder = false;
          console.error(action.payload);
        }
      ).addCase(
        getOrderByNumber.fulfilled, (state, action) => {
          state.errorRequestingOrder = false;
          state.pendingRequestingOrder = false;
          state.fetchedOrder = action.payload;
        }
      ).addDefaultCase(
        state => state
      );
    },
  }
);

export const orderDetailsReducer = orderDetailsSlice.reducer;
