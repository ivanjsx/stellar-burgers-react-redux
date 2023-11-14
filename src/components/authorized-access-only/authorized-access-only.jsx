// libraries
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// constants 
import { HOME_PAGE_PATH, LOGIN_PAGE_ABSOLUTE_PATH } from "../../utils/constants";

// selectors
import { defaultUserSelector } from "../../services/selectors";



function AuthorizedAccessOnly({ element, reversed=false }) {
  
  const location = useLocation();
  const { currentUser, authChecked } = useSelector(defaultUserSelector);
  
  if (!authChecked) {
    return null;
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

AuthorizedAccessOnly.propTypes = {
  element: PropTypes.element.isRequired,
  reversed: PropTypes.bool
};

export default AuthorizedAccessOnly;
