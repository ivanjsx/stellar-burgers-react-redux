// libraries
import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

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

// types 
import { RootStateType } from "./reducers";
import type {} from "redux-thunk/extend-redux";



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



const store = configureStore(
  { 
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
      { serializableCheck: false }
    ).concat(logger, thunk, orderFeedMiddleware)
  }
);



type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector; 



export default store;
