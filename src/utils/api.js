// constants
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants";



function checkResponseOk(response) {
  if (response && !response.ok && response.status === 403) {
    return response.json();
  };
  if (response && response.ok) {
    return response.json();
  };
  return Promise.reject(response);
};

function checkResponseSuccess(response) {
  if (response && response.success) {
    return response;
  };
  return Promise.reject(response);
};



const BASE_URL = "https://norma.nomoreparties.space/api/";

function request({ path, method, body, withToken }) {
  
  const url = BASE_URL.concat(path);
  const options = {
    method,
    body: JSON.stringify(body),
    headers: { 
      "Content-Type": "application/json;charset=utf-8"
    }
  };
  
  if (withToken) {
    options.headers.Authorization = localStorage.getItem(ACCESS_TOKEN_KEY);
  };
  
  return fetch(url, options).then(checkResponseOk).then(checkResponseSuccess);
};



function updateAccessToken() {
  return request(
    {
      method: "POST",
      path: "auth/token/", 
      body: { token: localStorage.getItem(REFRESH_TOKEN_KEY) }      
    }
  ).then(
    response => {
      localStorage.setItem(ACCESS_TOKEN_KEY, response[ACCESS_TOKEN_KEY]);
      localStorage.setItem(REFRESH_TOKEN_KEY, response[REFRESH_TOKEN_KEY]);
    }      
  );
};



function refreshingRequest(params) {
  return request(params).catch(
    response => {
      if (response.message === "jwt expired") {
        return updateAccessToken().then(
          () => request(params)
        );
      };
    }
  );
};




function getOrder(orderNumber) {
  return request(
    {
      method: "GET",
      path: `orders/${orderNumber}/`, 
    }
  ).then(
    response => response.orders[0]
  );
};



export { request, refreshingRequest, getOrder };
