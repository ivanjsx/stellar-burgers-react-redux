// libraries
import PropTypes from "prop-types";

// components
import OnlyAuthorizedAccess from "../only-authorized-access/only-authorized-access";



function OnlyUnauthorizedAccess({ element }) {
  return (
    <OnlyAuthorizedAccess
      element={element} 
      reversed={true} 
    />
  );
};

OnlyUnauthorizedAccess.propTypes = {
  element: PropTypes.element.isRequired
};

export default OnlyUnauthorizedAccess;
