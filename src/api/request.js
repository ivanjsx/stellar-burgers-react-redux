// constants
import { ACCESS_TOKEN_KEY } from "../utils/constants";

const BASE_URL = "https://norma.nomoreparties.space/api/";




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

function refreshingRequest(endpointPath, options, refreshCallback) {
  return baseRequest(endpointPath, options).catch(
    error => {
      if (error.message === "jwt expired" && refreshCallback) {
        return refreshCallback().then(
          () => {
            baseRequest(endpointPath, options);
          }
        );
      };
    }
  );
};



function request(params) {
  
  const { path, method, body, withToken, refreshCallback } = params;
  
  const options = {
    method: method,
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json;charset=utf-8" }
  };
  
  if (withToken) {
    options.headers.Authorization = localStorage.getItem(ACCESS_TOKEN_KEY);
  };  
  
  return refreshingRequest(path, options, refreshCallback);
};



export default request;
