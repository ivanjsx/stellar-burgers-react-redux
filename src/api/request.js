// constants
import { BASE_URL } from "../utils/constants";



function checkResponseOk(response) {
  return response && response.ok 
         ? response.json() 
         : Promise.reject(`error: ${response.status}`);
};

function checkResponseSuccess(response) {
  return response && response.success 
         ? response 
         : Promise.reject(`error: ${response}`);
};

export default function request(endpointPath, options) {
  const url = BASE_URL + endpointPath;
  return fetch(
    url, options
  ).then(
    checkResponseOk
  ).then(
    checkResponseSuccess
  );
};
