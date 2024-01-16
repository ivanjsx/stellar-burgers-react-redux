// components
import OnlyAuthorizedAccess from "../only-authorized-access/only-authorized-access";



type PropsType = Readonly<{
  element: JSX.Element,
}>;



function OnlyUnauthorizedAccess({ element }: PropsType): JSX.Element {
  return (
    <OnlyAuthorizedAccess
      element={element} 
      reversed={true} 
    />
  );
};

export default OnlyUnauthorizedAccess;
