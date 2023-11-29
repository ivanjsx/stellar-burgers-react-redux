// libraries
import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

// reducers
import { rootReducer } from "./reducers"

// middleware
import webSocketMiddleware from "./middleware";

// actions
import {
  connect,
  disconnect,
  onOpen,
  onClose,
  onError,
  onMessage,
} from "./order-feed/order-feed-slice";

// constants 
import { BASE_WS_URL } from "../utils/constants";



const orderFeedMiddleware = webSocketMiddleware(
  BASE_WS_URL, {
    connect,
    disconnect,
    onOpen,
    onClose,
    onError,
    onMessage,
  }
);



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
