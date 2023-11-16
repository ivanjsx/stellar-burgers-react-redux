// libraries
import PropTypes from "prop-types";

// components
import AuthorizedAccessOnly from "../authorized-access-only/authorized-access-only";



function UnauthorizedAccessOnly({ element }) {
  return (
    <AuthorizedAccessOnly
      element={element} 
      reversed={true} 
    />
  );
};

UnauthorizedAccessOnly.propTypes = {
  element: PropTypes.element.isRequired
};

export default UnauthorizedAccessOnly;
