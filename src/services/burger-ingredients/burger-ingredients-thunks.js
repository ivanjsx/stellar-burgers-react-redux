// libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// api
import { request } from "../../utils/api";

// constants 
import { BURGER_INGREDIENTS_STATE_NAME } from "../../utils/constants";



export const requestAvailableStock = createAsyncThunk(
  `${BURGER_INGREDIENTS_STATE_NAME}/requestAvailableStock`,
  () => {
    return request(
      { 
        method: "GET",
        path: "ingredients/" 
      }
    ).then(
      response => new Map(
        response.data.map(
          ingredient => [ingredient._id, ingredient]
        )
      )
    );
  }
);
