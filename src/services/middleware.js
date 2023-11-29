// actions 
import { getUser } from "./user/user-thunks";



const webSocketMiddleware = (baseUrl, wsActions) => store => {
  
  let socket = null;
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
    
    if (action.type === connect.type) {
      const url = baseUrl.concat(action.payload);
      socket = new WebSocket(url);
    };
    
    if (socket) {
      if (action.type === disconnect.type) {
        socket.close();
      };
      
      if (sendMessage && action.type === sendMessage.type) {
        socket.send(JSON.stringify(action.payload));
      };
      
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
    
    next(action);
    
  };
};



export default webSocketMiddleware;
