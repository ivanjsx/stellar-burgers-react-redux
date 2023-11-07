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



function baseRequest(endpointPath, options) {
  const url = BASE_URL + endpointPath;
  return fetch(url, options).then(checkResponseOk).then(checkResponseSuccess)
};

function refreshingRequest(endpointPath, options, refreshAccessTokenCallback) {
  return baseRequest(endpointPath, options).catch(
    error => {
      if (error.message === "jwt expired") {
        return refreshAccessTokenCallback().then(
          () => {
            baseRequest(endpointPath, options);
          }
        );
      };
    }
  );
};



function getRequest(endpointPath) {
  const options = {
    method: "GET",
  };
  return baseRequest(endpointPath, options);
};

function postRequest(endpointPath, requestBody, provideToken = false) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },   
    body: JSON.stringify(
      requestBody
    )
  };
  if (provideToken) {
    options.headers.authorization = localStorage.getItem("accessToken");
  };
  return refreshingRequest(endpointPath, options);
};

function patchRequest(endpointPath, requestBody, provideToken = false) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },   
    body: JSON.stringify(
      requestBody
    )
  };
  if (provideToken) {
    options.headers.authorization = localStorage.getItem("accessToken");
  };
  return refreshingRequest(endpointPath, options);
};



export { getRequest, postRequest, patchRequest };
