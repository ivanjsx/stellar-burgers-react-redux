// libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// utils
import request from "../../api/request";

// constants 
import { BURGER_CONSTRUCTOR_STATE_NAME } from "../../utils/constants";



export const requestOrderPlacement = createAsyncThunk(
  `${BURGER_CONSTRUCTOR_STATE_NAME}/requestOrderPlacement`,
  arg => {
    return request(
      {
        path: "orders/",
        body: { ingredients: arg }
      }
    );
  }
);
