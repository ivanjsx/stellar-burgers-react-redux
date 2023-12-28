// libraries
import { createSlice } from "@reduxjs/toolkit";

// constants 
import { 
  ONLINE, 
  OFFLINE,
  CONNECTING,
  ORDER_FEED_STATE_NAME,
} from "../../utils/constants";



const orderFeedSlice = createSlice(
  {
    name: ORDER_FEED_STATE_NAME,
    
    initialState: {
      todaysTotal: 0,
      allTimeTotal: 0,
      orders: new Map(),
      connectionError: false,
      connectionStatus: OFFLINE,
    },
    
    reducers: {
      connect: (state, action) => {
        state.connectionStatus = CONNECTING;
      },
      disconnect: state => {
        state.orders = new Map();
      },
      onOpen: state => {
        state.connectionError = false;
        state.connectionStatus = ONLINE;
      },
      onClose: state => {
        state.connectionError = false;
        state.connectionStatus = OFFLINE;
      },
      onError: state => {
        state.connectionError = true;
      },
      onMessage: (state, action) => {
        state.allTimeTotal = action.payload.total;
        state.todaysTotal = action.payload.totalToday;
        state.orders = new Map(
          action.payload.orders.map(
            order => [order.number, order]
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
