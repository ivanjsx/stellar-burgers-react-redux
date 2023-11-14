// libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// utils
import request from "../../api/request";

// constants 
import { USER_STATE_NAME } from "../../utils/constants";



export const getUser = createAsyncThunk(
  `${USER_STATE_NAME}/getUser`,  
  () => {
    return request(
      {
        method: "GET",
        withToken: true,
        path: "auth/user/",
        refreshCallback: updateAccessToken
      }
    ).then(
      response => response.user
    );
  }
);

export const updateUser = createAsyncThunk(
  `${USER_STATE_NAME}/updateUser`,  
  ({ email, password, name }) => {
    return request(
      {
        method: "PATCH",
        withToken: true,
        path: "auth/user/",
        refreshCallback: updateAccessToken,
        body: { email, password, name }
      }
    ).then(
      response => response.user
    );
  }
);

export const loginUser = createAsyncThunk(
  `${USER_STATE_NAME}/loginUser`,
  ({ email, password }) => {
    return request(
      {
        method: "POST",
        path: "auth/login/",
        body: { email, password }
      }
    ).then(
      response => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        return response.user;
      }
    );
  }
);

export const registerUser = createAsyncThunk(
  `${USER_STATE_NAME}/registerUser`,
  ({ email, password, name }) => {
    return request(
      {
        method: "POST",
        path: "auth/register/",
        body: { email, password, name }
      }
    ).then(
      response => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
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
        body: { token: localStorage.getItem("refreshToken") }
      }
    ).then(
      response => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    );
  }
);

export const updateAccessToken = createAsyncThunk(
  `${USER_STATE_NAME}/updateAccessToken`,  
  () => {
    return request(
      {
        method: "POST",
        path: "auth/token/", 
        body: { token: localStorage.getItem("refreshToken") }      
      }
    ).then(
      response => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
      }      
    )
  }
);

export const resetPassword = createAsyncThunk(
  `${USER_STATE_NAME}/resetPassword`,  
  ({ email }) => {
    return null;
  }
);

export const setNewPassword = createAsyncThunk(
  `${USER_STATE_NAME}/setNewPassword`,  
  ({ password, securityCode }) => {
    return null;
  }
);
