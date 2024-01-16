// libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// api
import { request, refreshingRequest } from "../../utils/api";

// constants 
import { 
  USER_STATE_NAME,
  ACCESS_TOKEN_KEY, 
  REFRESH_TOKEN_KEY, 
  PASSWORD_RESET_EMAIL_SENT_KEY, 
} from "../../utils/constants";

// types
import { UserInfoType } from "../../utils/types";



export const getUser = createAsyncThunk(
  `${USER_STATE_NAME}/getUser`,  
  () => {
    return refreshingRequest(
      {
        method: "GET",
        withToken: true,
        path: "auth/user/"
      }
    ).then(
      (response) => response.user
    );
  }
);

export const updateUser = createAsyncThunk(
  `${USER_STATE_NAME}/updateUser`,  
  ({ email, password, name }: Omit<UserInfoType, "securityCode">) => {
    return refreshingRequest(
      {
        method: "PATCH",
        withToken: true,
        path: "auth/user/",
        body: { email, password, name }
      }
    ).then(
      (response) => response.user
    );
  }
);

export const loginUser = createAsyncThunk(
  `${USER_STATE_NAME}/loginUser`,
  ({ email, password }: Pick<UserInfoType, "email" | "password">) => {
    return request(
      {
        method: "POST",
        path: "auth/login/",
        body: { email, password }
      }
    ).then(
      (response) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, response[ACCESS_TOKEN_KEY]);
        localStorage.setItem(REFRESH_TOKEN_KEY, response[REFRESH_TOKEN_KEY]);
        return response.user;
      }
    );
  }
);

export const registerUser = createAsyncThunk(
  `${USER_STATE_NAME}/registerUser`,
  ({ email, password, name }: Omit<UserInfoType, "securityCode">) => {
    return request(
      {
        method: "POST",
        path: "auth/register/",
        body: { email, password, name }
      }
    ).then(
      (response) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, response[ACCESS_TOKEN_KEY]);
        localStorage.setItem(REFRESH_TOKEN_KEY, response[REFRESH_TOKEN_KEY]);
        return response.user;
      }
    );
  }
);

export const logoutUser = createAsyncThunk(
  `${USER_STATE_NAME}/logoutUser`,  
  () => {
    return request(
      {
        method: "POST",
        path: "auth/logout/", 
        body: { token: localStorage.getItem(REFRESH_TOKEN_KEY)}
      }
    ).then(
      () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    );
  }
);

export const resetPassword = createAsyncThunk(
  `${USER_STATE_NAME}/resetPassword`,  
  ({ email }: Pick<UserInfoType, "email">) => {
    return request(
      {
        method: "POST",
        path: "password-reset/", 
        body: { email }
      }      
    ).then(
      () => {
        localStorage.setItem(PASSWORD_RESET_EMAIL_SENT_KEY, "true");
      }      
    );
  }
);

export const setNewPassword = createAsyncThunk(
  `${USER_STATE_NAME}/setNewPassword`,  
  ({ password, securityCode }: Omit<UserInfoType, "email" | "name">) => {
    return request(
      {
        method: "POST",
        path: "password-reset/reset/", 
        body: { password, token: securityCode }
      }
    ).then(
      () => {
        localStorage.removeItem(PASSWORD_RESET_EMAIL_SENT_KEY);
      }            
    );
  }
);
