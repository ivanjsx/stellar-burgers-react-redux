// libraries
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// actions
import { logoutUser } from "../../services/user/user-thunks";



function Logout() {
  const dispatch = useDispatch();  
  useEffect(
    () => {
      dispatch(logoutUser());
    },
    []
  );
  return null;
};

export default Logout;
