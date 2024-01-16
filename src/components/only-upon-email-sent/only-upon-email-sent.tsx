// libraries
import { Navigate, useLocation } from "react-router-dom";

// urls 
import { FORGOT_PASSWORD_PAGE_ABSOLUTE_PATH } from "../../utils/urls";

// constants 
import { PASSWORD_RESET_EMAIL_SENT_KEY } from "../../utils/constants";



type PropsType = Readonly<{
  element: JSX.Element,
}>;



function OnlyUponEmailSent({ element }: PropsType): JSX.Element {
  
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

export default OnlyUponEmailSent;
