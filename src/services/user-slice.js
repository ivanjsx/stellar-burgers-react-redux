// libraries
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../api/request";

// import {setUser, setAuthChecked} from "./user";
// import {api} from "../utils/api";

// export const getUser = () => {
//     return (dispatch) => {
//         return api.getUser().then((res) => {
//             dispatch(setUser(res.user));
//         });
//     };
// };

// export const checkUserAuth = () => {
//     return (dispatch) => {
//         if (localStorage.getItem("accessToken")) {
//             dispatch(getUser())
//                 .catch(() => {
//                     localStorage.removeItem("accessToken");
//                     localStorage.removeItem("refreshToken");
//                     dispatch(setUser(null));
//                 })
//                 .finally(() => dispatch(setAuthChecked(true)));
//         } else {
//             dispatch(setAuthChecked(true));
//         }
//     };
// };



const NAME = "user";



export const loginUser = createAsyncThunk(
  `${NAME}/loginUser`,
  ({ email, password }) => {
    return postRequest(
      "auth/login/", { email, password }
    ).then(
      response => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        return response.user;
      }
    );
  }
);

export const createUser = createAsyncThunk(
  `${NAME}/createUser`,
  ({ name, email, password }) => {
    return postRequest(
      "auth/register/", { name, email, password }
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
  `${NAME}/logoutUser`,  
  () => {
    return postRequest(
      "auth/logout/", {
        token: localStorage.getItem("refreshToken"),
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
  `${NAME}/updateAccessToken`,  
  () => {
    return postRequest(
      "auth/token/", {
        token: localStorage.getItem("refreshToken"),
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
  `${NAME}/resetPassword`,  
  ({ email }) => {
    return null;
  }
);

export const setNewPassword = createAsyncThunk(
  `${NAME}/setNewPassword`,  
  ({ password, securityCode }) => {
    return null;
  }
);

export const getUserInfo = createAsyncThunk(
  `${NAME}/getUserInfo`,  
  () => {
    return null;
  }
);

export const updateUserInfo = createAsyncThunk(
  `${NAME}/updateUserInfo`,  
  () => {
    return null;
  }
);

export const userSlice = createSlice(
  {
    name: NAME,
    initialState: {
      // currentUser: null,
      currentUser: {
        name: "kyle",
        email: "kyle@smyle.com",
        password: "42069"
      },
      // isAuthorized: false,
      errorAuthorizingUser: false,
      pendingAuthorizingUser: false,
      errorDeauthorizingUser: false,
      pendingDeauthorizingUser: false,
    },
    reducers: {
      resetUser: state => {
        state.currentUser = null;
        // state.isAuthorized = false;
      },
    },
    extraReducers: builder => {
      builder.addCase(
        loginUser.pending,
        state => {
          state.pendingAuthorizingUser = true;
        }
      ).addCase(
        loginUser.rejected,
        (state, action) => {
          state.errorAuthorizingUser = true;
          state.pendingAuthorizingUser = false;
          console.error(action.payload);
        }
      ).addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.errorAuthorizingUser = false;
          state.pendingAuthorizingUser = false;
          state.currentUser = action.payload;
        }
      ).addCase(
        createUser.pending,
        state => {
          state.pendingAuthorizingUser = true;
        }
      ).addCase(
        createUser.rejected,
        (state, action) => {
          state.errorAuthorizingUser = true;
          state.pendingAuthorizingUser = false;
          console.error(action.payload);
        }
      ).addCase(
        createUser.fulfilled,
        (state, action) => {
          state.errorAuthorizingUser = false;
          state.pendingAuthorizingUser = false;
          state.currentUser = action.payload;
        }
      ).addCase(
        logoutUser.pending,
        state => {
          state.pendingDeauthorizingUser = true;
        }
      ).addCase(
        logoutUser.rejected,
        (state, action) => {
          state.errorDeauthorizingUser = true;
          state.pendingDeauthorizingUser = false;
          console.error(action.payload);
        }
      ).addCase(
        logoutUser.fulfilled,
        state => {
          state.errorDeauthorizingUser = false;
          state.pendingDeauthorizingUser = false;
          state.currentUser = null;
        }
      ).addDefaultCase(
        state => state
      );
    }
  }
);

export const { resetUser } = userSlice.actions;
