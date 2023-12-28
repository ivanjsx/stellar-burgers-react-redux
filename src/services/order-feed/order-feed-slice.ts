// libraries
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// constants 
import { 
  ONLINE, 
  OFFLINE,
  CONNECTING,
  ORDER_FEED_STATE_NAME,
} from "../../utils/constants";

// types 
import { FeedMessageType, OrderType } from "../../utils/types";



type InitialStateType = {
  todaysTotal: number,
  allTimeTotal: number,
  orders: Map<number, OrderType>,
  connectionError: boolean,
  connectionStatus: typeof ONLINE 
                  | typeof OFFLINE 
                  | typeof CONNECTING 
                  | typeof ORDER_FEED_STATE_NAME
}

const initialState: InitialStateType = {
  todaysTotal: 0,
  allTimeTotal: 0,
  orders: new Map(),
  connectionError: false,
  connectionStatus: OFFLINE,
}



const orderFeedSlice = createSlice(
  {
    name: ORDER_FEED_STATE_NAME,
    initialState,
    
    reducers: {
      connect: (state, action: PayloadAction<string>) => {
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
      onMessage: (state, action: PayloadAction<FeedMessageType>) => {
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
