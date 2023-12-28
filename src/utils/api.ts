// constants
import { 
  BASE_API_URL, 
  ACCESS_TOKEN_KEY, 
  REFRESH_TOKEN_KEY,
} from "./constants";



const checkResponseOk = <Type>(response: Response): Promise<Type> => {
  if (!response.ok && response.status === 403) {
    return response.json();
  };
  if (response.ok) {
    return response.json();
  };
  return Promise.reject(response);
};

const checkDataSuccess = (data: any) => {
  if (data.success) {
    return data;
  };
  return Promise.reject(data);
};



type RequestParamsType = {
  path: string, 
  method: string, 
  body?: any,
  withToken?: boolean,
}

type FetchOptionsType = {
  method: string,
  body: string,
  headers: {
    "Content-Type": string,
    Authorization?: string,
  }
}



function request({ path, method, body, withToken }: RequestParamsType) {
  
  const url = BASE_API_URL.concat(path);
  const options: FetchOptionsType = {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    }
  };
  
  if (withToken) {
    options.headers.Authorization = localStorage.getItem(ACCESS_TOKEN_KEY) as string;
  };
  
  return fetch(url, options).then(checkResponseOk).then(checkDataSuccess);
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



function refreshingRequest(params: RequestParamsType) {
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



export { request, refreshingRequest, updateAccessToken };
