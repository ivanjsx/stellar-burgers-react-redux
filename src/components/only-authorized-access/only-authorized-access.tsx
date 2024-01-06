// libraries
import { Navigate, useLocation } from "react-router-dom";

// urls 
import { 
  HOME_PAGE_PATH, 
  LOGIN_PAGE_ABSOLUTE_PATH 
} from "../../utils/urls";

// selectors
import { defaultUserSelector } from "../../services/selectors";

// pages
import { LoadingPage } from "../../pages";

// hooks
import { useAppSelector } from "../../services/store";



type PropsType = Readonly<{
  element: JSX.Element,
  reversed?: boolean
}>;



function OnlyAuthorizedAccess({ element, reversed=false }: PropsType): JSX.Element {
  
  const location = useLocation();
  const { currentUser, authChecked } = useAppSelector(defaultUserSelector);
  
  if (!authChecked) {
    return <LoadingPage />;
  };
  
  if (!reversed && !currentUser) {
    return (
      <Navigate
        to={{ pathname: LOGIN_PAGE_ABSOLUTE_PATH }} 
        state={{ from: location }}
      />
    );
  };
  
  if (reversed && currentUser) {
    return (
      <Navigate
        to={location.state?.from || { pathname: HOME_PAGE_PATH }}
        state={{ from: location }}
        replace={true}
      />
    );
  };  
  
  return element;
};

export default OnlyAuthorizedAccess;
