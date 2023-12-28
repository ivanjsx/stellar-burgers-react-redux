// actions 
import { getUser } from "./user/user-thunks";

// types 
import { 
  Middleware,
  ActionCreatorWithPayload, 
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { RootStateType } from "./reducers";



type wsActionTypes = {
  connect: ActionCreatorWithPayload<string>,
  disconnect: ActionCreatorWithoutPayload,
  sendMessage?: ActionCreatorWithPayload<any>,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithoutPayload,
  onMessage: ActionCreatorWithPayload<any>,
}



const webSocketMiddleware = (baseUrl: string, wsActions: wsActionTypes): Middleware<{}, RootStateType> => store => {
  
  let socket: WebSocket | null = null;
  const { dispatch } = store;
  
  const {
    connect,
    disconnect,
    sendMessage,
    onOpen,
    onClose,
    onError,
    onMessage,
  } = wsActions;
  
  return next => action => {
    
    if (connect.match(action)) {
      const url = baseUrl.concat(action.payload);
      socket = new WebSocket(url);
      
      socket.onopen = () => {
        dispatch(onOpen());
      };
      
      socket.onclose = () => {
        dispatch(onClose());
      };
      
      socket.onerror = () => {
        dispatch(onError());
      };
      
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data && data.success) {
          dispatch(onMessage(data));
        } else if (data && data.message === "Invalid or missing token") {
          dispatch(getUser());
        } else {
          console.error(data);
        };
      };      
    };
    
    if (socket) {
      if (disconnect.match(action)) {
        socket.close();
      };
      if (sendMessage?.match(action)) {
        socket.send(JSON.stringify(action.payload));
      };
    };
    
    next(action);
    
  };
};



export default webSocketMiddleware;
