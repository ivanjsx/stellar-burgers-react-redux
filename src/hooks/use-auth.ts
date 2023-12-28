// libraries
import { useCallback } from "react";

// actions
import { getUser } from "../services/user/user-thunks";
import { setUser, setAuthChecked } from "../services/user/user-slice";

// constants
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../utils/constants";

// hooks
import { useAppDispatch } from "../services/store";



type CheckUserAuthCallbackType = () => void;

function useAuth() {
  
  const dispatch = useAppDispatch();
  
  const checkUserAuth = useCallback<CheckUserAuthCallbackType>(
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
    [dispatch]
  );  
  
  return { checkUserAuth };
};

export default useAuth;
