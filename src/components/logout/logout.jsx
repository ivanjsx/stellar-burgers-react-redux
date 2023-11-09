// libraries
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// constants 
import { LOGIN_PAGE_ABSOLUTE_PATH } from "../../utils/constants";

// actions
import { logoutUser } from "../../services/user-slice";



function Logout() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  React.useEffect(
    () => {
      dispatch(logoutUser());
    },
    []
  );
  
  return (
    <Navigate 
      to={{ pathname: LOGIN_PAGE_ABSOLUTE_PATH }} 
      state={{ from: location }} 
      replace={true} 
    />
  );
};



export default Logout;
