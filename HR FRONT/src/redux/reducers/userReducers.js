import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILED,
  USER_LOGOUT,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_ON_LOGIN_REQUEST,
  RESET_PASSWORD_ON_LOGIN_SUCCESS,
  RESET_PASSWORD_ON_LOGIN_FAILED,
  TOKEN_VALIDATION_REQUEST,
  TOKEN_VALIDATION_SUCCESS,
  TOKEN_VALIDATION_FAILED,
} from "../constants/userConstants";

//    SIGNIN REDUCER
const signInInitialState = {
  loading: false,
  userInfo: null,
  error: null,
};
export const signInUserReducer = (state = signInInitialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        userInfo: null,
        error: null,
        loading: true,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: action.payload,
      };
    case USER_SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        userInfo: null,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};
// forgot password
const forgotPasswordInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const forgotPasswordReducer = (
  state = forgotPasswordInitialState,
  action
) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reset Password
const resetPasswordInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const resetPasswordReducer = (
  state = resetPasswordInitialState,
  action
) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reset Password When LOgged in
const resetPasswordOnLoginInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const ResetPasswordOnLoginReducer = (
  state = resetPasswordOnLoginInitialState,
  action
) => {
  switch (action.type) {
    case RESET_PASSWORD_ON_LOGIN_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case RESET_PASSWORD_ON_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    case RESET_PASSWORD_ON_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Token Validation
const tokenValidationInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const tokenValidationReducer = (
  state = tokenValidationInitialState,
  action
) => {
  switch (action.type) {
    case TOKEN_VALIDATION_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case TOKEN_VALIDATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    case TOKEN_VALIDATION_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

// LogOut
const logOutInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const logOutReducer = (state = logOutInitialState, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    default:
      return state;
  }
};
