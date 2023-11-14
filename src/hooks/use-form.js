// libraries
import { useCallback } from "react";



function useForm() {
  
  const onChange = useCallback(
    (valueSetter, validitySetter) => event => {
      valueSetter(event.target.value);
      validitySetter(event.target.validity.valid);
    },
    []
  );
  
  return { onChange };
};

export default useForm;
