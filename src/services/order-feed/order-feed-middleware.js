// constants 
import { ACCESS_TOKEN_KEY, BASE_WS_URL } from "../../utils/constants";

// actions 
import {
  
  setData,
  setDataErrorMessage,
  
  connect, 
  disconnect, 
  
  connecting, 
  opened, 
  closed, 
  closedWithError, 
  
} from "./order-feed-slice";
import { updateAccessToken } from "../../utils/api";



const orderFeedMiddleware = store => {
  
  let socket = null;
  
  return next => action => {
    
    const { dispatch } = store;
    
    if (action.type === connect.type) {
      const url = BASE_WS_URL.concat(action.payload);
      socket = new WebSocket(url);
      dispatch(connecting());
    };
    
    if (socket) {
      if (action.type === disconnect.type) {
        socket.close();
      };
      
      socket.onopen = () => {
        dispatch(opened());
      };
      
      socket.onclose = () => {
        dispatch(closed());
      };
      
      socket.onerror = (event) => {
        dispatch(closedWithError());
      };
      
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data && data.success) {
          dispatch(setData(data));
        } else if (data && data.message === "Invalid or missing token") {
          updateAccessToken().then(
            () => {
              dispatch(disconnect());
              const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY).split(" ")[1];
              dispatch(connect(`orders?token=${accessToken}`));              
            }
          );
        } else {
          dispatch(setDataErrorMessage(data.message));
        };
      };
    };
    
    next(action);
    
  };
};



export default orderFeedMiddleware;
