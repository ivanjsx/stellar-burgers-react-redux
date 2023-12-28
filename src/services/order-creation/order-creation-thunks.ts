// libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// api
import { refreshingRequest } from "../../utils/api";

// constants 
import { ORDER_CREATION_STATE_NAME } from "../../utils/constants";



export const createOrder = createAsyncThunk(
  `${ORDER_CREATION_STATE_NAME}/createOrder`,
  (arg: Array<string>) => {
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
