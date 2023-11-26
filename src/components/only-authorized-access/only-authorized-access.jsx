// libraries
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// urls 
import { 
  HOME_PAGE_PATH, 
  LOGIN_PAGE_ABSOLUTE_PATH 
} from "../../utils/urls";

// selectors
import { defaultUserSelector } from "../../services/selectors";



function OnlyAuthorizedAccess({ element, reversed=false }) {
  
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

OnlyAuthorizedAccess.propTypes = {
  element: PropTypes.element.isRequired,
  reversed: PropTypes.bool
};

export default OnlyAuthorizedAccess;
