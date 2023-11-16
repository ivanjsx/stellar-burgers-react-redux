// libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// api
import { refreshingRequest } from "../../utils/api";

// constants 
import { CREATE_ORDER_STATE_NAME } from "../../utils/constants";



export const requestOrderPlacement = createAsyncThunk(
  `${CREATE_ORDER_STATE_NAME}/requestOrderPlacement`,
  arg => {
    return refreshingRequest(
      {
        method: "POST",
        withToken: true,
        path: "orders/",
        body: { ingredients: arg }
      }
    );
  }
);
