// libraries
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";



function AuthorizedAccessOnly({ element, onlyUnauthorized = false }) {
  const location = useLocation();
  const { currentUser, isAuthChecked } = useSelector(store => store.user);
  if (!isAuthChecked) {
    return null;
  };
  if (onlyUnauthorized && currentUser) {
    return <Navigate to={location.state.from || { pathname: "/" }} />;
  };
  if (!onlyUnauthorized && !currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  };
  return element;
};

function UnauthorizedAccessOnly({ element }) {
  return (
    <AuthorizedAccessOnly
      element={element} 
      onlyUnauthorized={true} 
    />
  );
};

AuthorizedAccessOnly.propTypes = {
  element: PropTypes.element.isRequired,
};

UnauthorizedAccessOnly.propTypes = {
  element: PropTypes.element.isRequired
};

export { AuthorizedAccessOnly, UnauthorizedAccessOnly };
