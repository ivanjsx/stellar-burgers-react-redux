// libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// utils
import { refreshingRequest } from "../../utils/api";

// constants 
import { BURGER_CONSTRUCTOR_STATE_NAME } from "../../utils/constants";



export const requestOrderPlacement = createAsyncThunk(
  `${BURGER_CONSTRUCTOR_STATE_NAME}/requestOrderPlacement`,
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
