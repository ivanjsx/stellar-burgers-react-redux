// libraries
import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

// reducers
import { rootReducer } from "./reducer"



export const store = configureStore(
  { 
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => {
      let middleware = getDefaultMiddleware().concat(thunk);
      if (process.env.NODE_ENV !== "production") {
        middleware = middleware.concat(logger);
      }
      return middleware;
    }
  }
);
