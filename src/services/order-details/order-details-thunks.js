// libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// api
import { request } from "../../utils/api";

// constants 
import { ORDER_DETAILS_STATE_NAME } from "../../utils/constants";



export const getOrderByNumber = createAsyncThunk(
  `${ORDER_DETAILS_STATE_NAME}/getOrderByNumber`,
  (orderNumber) => {
    return request(
      { 
        method: "GET",
        path: `orders/${orderNumber}/`, 
      }
    ).then(
      response => response.orders[0]
    );
  }
);
