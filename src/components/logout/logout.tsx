// libraries
import { FC, useEffect } from "react";

// actions
import { logoutUser } from "../../services/user/user-thunks";

// hooks
import { useAppDispatch } from "../../services/store";



const Logout: FC = () => {
  const dispatch = useAppDispatch();  
  useEffect(
    () => {
      dispatch(logoutUser());
    },
    [dispatch]
  );
  return null;
};

export default Logout;
