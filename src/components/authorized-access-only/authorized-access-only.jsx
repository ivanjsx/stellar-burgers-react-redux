// libraries
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// constants 
import { HOME_PAGE_PATH, LOGIN_PAGE_ABSOLUTE_PATH } from "../../utils/constants";



function AuthorizedAccessOnly({ element, onlyUnauthorized = false }) {
  const location = useLocation();

  const { currentUser, isAuthChecked } = useSelector(store => store.user);
  
  if (!isAuthChecked) {
    return null;
  };
  
  if (onlyUnauthorized && currentUser) {
    return (
      <Navigate
        to={location.state?.from || { pathname: HOME_PAGE_PATH }} 
        state={{ from: location }} 
        replace={true} 
      />
    );
  };
  
  if (!onlyUnauthorized && !currentUser) {
    return (
      <Navigate 
        to={LOGIN_PAGE_ABSOLUTE_PATH} 
        state={{ from: location }} 
      />
    );
  };
  
  return element;
};



AuthorizedAccessOnly.propTypes = {
  element: PropTypes.element.isRequired,
};


export default AuthorizedAccessOnly;
