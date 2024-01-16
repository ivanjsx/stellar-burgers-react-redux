// libraries
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// constants 
import {
  ORDER_FEED_STATE_NAME,
  WS_CONNECTION_STATUSES,
} from "../../utils/constants";

// types 
import { FeedMessageType, FetchedOrderType } from "../../utils/types";



type InitialStateType = {
  todaysTotal: number,
  allTimeTotal: number,
  orders: Map<number, FetchedOrderType>,
  connectionError: boolean,
  connectionStatus: WS_CONNECTION_STATUSES
}

const initialState: InitialStateType = {
  todaysTotal: 0,
  allTimeTotal: 0,
  orders: new Map(),
  connectionError: false,
  connectionStatus: WS_CONNECTION_STATUSES.OFFLINE,
}



const orderFeedSlice = createSlice(
  {
    name: ORDER_FEED_STATE_NAME,
    initialState,
    
    reducers: {
      connect: (state, action: PayloadAction<string>) => {
        state.connectionStatus = WS_CONNECTION_STATUSES.CONNECTING;
      },
      disconnect: (state) => {
        state.orders = new Map();
      },
      onOpen: (state) => {
        state.connectionError = false;
        state.connectionStatus = WS_CONNECTION_STATUSES.ONLINE;
      },
      onClose: (state) => {
        state.connectionError = false;
        state.connectionStatus = WS_CONNECTION_STATUSES.OFFLINE;
      },
      onError: (state) => {
        state.connectionError = true;
      },
      onMessage: (state, action: PayloadAction<FeedMessageType>) => {
        state.allTimeTotal = action.payload.total;
        state.todaysTotal = action.payload.totalToday;
        state.orders = new Map(
          action.payload.orders.map(
            (order) => [order.number, order]
          )
        );
      },
    },
  }
);

export const { 
  connect,
  disconnect, 
  onOpen, 
  onClose, 
  onError, 
  onMessage, 
} = orderFeedSlice.actions;

export const orderFeedReducer = orderFeedSlice.reducer;
