// libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// utils
import request from "../../api/request";

// constants 
import { BURGER_INGREDIENTS_STATE_NAME } from "../../utils/constants";



export const requestAvailableIngredientsStock = createAsyncThunk(
  `${BURGER_INGREDIENTS_STATE_NAME}/requestAvailableIngredientsStock`,
  () => {
    return request(
      { path: "ingredients/" }
    ).then(
      response => response.data
    );
  }
);
