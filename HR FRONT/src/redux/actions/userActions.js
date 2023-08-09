import axios from "axios";
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

const localStorage = window.localStorage;
const API = process.env.REACT_APP_NODE_API;

// signIn user
export const signInUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const body = {
      email,
      password,
    };
    const { data } = await axios.post(`${API}/user/login`, body, config);
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    if (data?.success) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// user logout
export const logoutUser = () => (dispatch) => {
  if (localStorage.getItem("userInfo")) {
    localStorage.removeItem("userInfo");
  }
  dispatch({
    type: USER_LOGOUT,
  });
};

// forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const body = {
      email,
    };
    const { data } = await axios.post(
      `${API}/user/forgot-password`,
      body,
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword = (id, password) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const body = {
      password,
    };
    const { data } = await axios.post(
      `${API}/user/reset-password/${id}`,
      body,
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const tokenValidation = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: TOKEN_VALIDATION_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.post(
      `${API}/user/token-validation/${id}/${token}`,
      config
    );

    dispatch({
      type: TOKEN_VALIDATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOKEN_VALIDATION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPasswordOnLogin =
  (id, oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_ON_LOGIN_REQUEST,
      });

      const config = {
        "Content-Type": "application/json",
      };
      const body = {
        oldPassword,
        newPassword,
      };
      const { data } = await axios.post(
        `${API}/user/reset-password-on-login/${id}`,
        body,
        config
      );

      dispatch({
        type: RESET_PASSWORD_ON_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_ON_LOGIN_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
