// libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// api
import { request } from "../../utils/api";

// constants 
import { BURGER_INGREDIENTS_STATE_NAME } from "../../utils/constants";

// types
import { IngredientType } from "../../utils/types";



export const requestAvailableStock = createAsyncThunk(
  `${BURGER_INGREDIENTS_STATE_NAME}/requestAvailableStock`,
  () => {
    return request(
      { 
        method: "GET",
        path: "ingredients/" 
      }
    ).then(
      (response) => new Map<string, IngredientType>(
        response.data.map(
          (ingredient: IngredientType) => [ingredient._id, ingredient]
        )
      )
    );
  }
);
