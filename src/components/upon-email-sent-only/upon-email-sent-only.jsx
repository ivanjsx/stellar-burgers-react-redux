// libraries
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

// constants 
import { 
  PASSWORD_RESET_EMAIL_SENT_KEY,
  FORGOT_PASSWORD_PAGE_ABSOLUTE_PATH, 
} from "../../utils/constants";



function UponEmailSentOnly({ element }) {
  
  const location = useLocation();  
  
  if (!localStorage.getItem(PASSWORD_RESET_EMAIL_SENT_KEY)) {
    return (
      <Navigate
        to={{ pathname: FORGOT_PASSWORD_PAGE_ABSOLUTE_PATH }} 
        state={{ from: location }}
        replace={true}
      />
    );
  };  
  
  return element;
};

UponEmailSentOnly.propTypes = {
  element: PropTypes.element.isRequired,
};

export default UponEmailSentOnly;
