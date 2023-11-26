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
      dataErrorMessage: false,
      connectionStatus: OFFLINE,
    },
    
    reducers: {
      setData: (state, action) => {
        state.allTimeTotal = action.payload.total;
        state.todaysTotal = action.payload.totalToday;
        state.orders = new Map(
          action.payload.orders.map(
            order => [order.number, order]
          )
        );
      },
      setDataErrorMessage: (state, action) => {
        state.dataErrorMessage = action.payload;
      },
      
      connect: state => state,
      disconnect: state => {
        state.orders = new Map();
      },
      
      connecting: state => {
        state.connectionStatus = CONNECTING;
      },
      opened: state => {
        state.connectionError = false;
        state.connectionStatus = ONLINE;
      },
      closed: state => {
        state.connectionError = false;
        state.connectionStatus = OFFLINE;
      },
      closedWithError: state => {
        state.connectionError = true;
      },
    },
  }
);

export const { 
  
  setData,
  setDataErrorMessage,
  
  connect, 
  disconnect, 
  
  connecting, 
  opened, 
  closed, 
  closedWithError, 
  
} = orderFeedSlice.actions;

export const orderFeedReducer = orderFeedSlice.reducer;
