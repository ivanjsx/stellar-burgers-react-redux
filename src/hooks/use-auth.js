// libraries
import { useCallback } from "react";
import { useDispatch } from "react-redux";

// actions
import { getUser } from "../services/user/user-thunks";
import { setUser, setAuthChecked } from "../services/user/user-slice";

// constants
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../utils/constants";



function useAuth() {
  
  const dispatch = useDispatch();
  
  const checkUserAuth = useCallback(
    () => {
      dispatch(setAuthChecked(false));
      if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
        dispatch(
          getUser()
        ).catch(
          () => {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            dispatch(setUser(null));
          }
        ).finally(
          () => {
            dispatch(setAuthChecked(true));
          }
        );
      } else {
        dispatch(setAuthChecked(true));
      };
    },
    []
  );  
  
  return { checkUserAuth };
};

export default useAuth;
