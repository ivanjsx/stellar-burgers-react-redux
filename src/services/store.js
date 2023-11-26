// libraries
import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

// reducers
import { rootReducer } from "./reducer"

// middleware
import orderFeedMiddleware from "./order-feed/order-feed-middleware";



export const store = configureStore(
  { 
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => {
      let middleware = getDefaultMiddleware({ serializableCheck: false });
      middleware = middleware.concat(thunk, orderFeedMiddleware);
      if (process.env.NODE_ENV !== "production") {
        middleware = middleware.concat(logger);
      }
      return middleware;
    }
  }
);
