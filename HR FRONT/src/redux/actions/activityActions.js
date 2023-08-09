import axios from "axios";
import {
  GET_ALL_NOTIFICATIONS_REQUEST,
  GET_ALL_NOTIFICATIONS_SUCCESS,
  GET_ALL_NOTIFICATIONS_FAILED,
  GET_SINGLE_NOTIFICATIONS_REQUEST,
  GET_SINGLE_NOTIFICATIONS_SUCCESS,
  GET_SINGLE_NOTIFICATIONS_FAILED,
  DELETE_SINGLE_NOTIFICATIONS_REQUEST,
  DELETE_SINGLE_NOTIFICATIONS_SUCCESS,
  DELETE_SINGLE_NOTIFICATIONS_FAILED,
  MARK_SINGLE_AS_READ_REQUEST,
  MARK_SINGLE_AS_READ_SUCCESS,
  MARK_SINGLE_AS_READ_FAILED,
  MARK_ALL_AS_READ_REQUEST,
  MARK_ALL_AS_READ_SUCCESS,
  MARK_ALL_AS_READ_FAILED,
} from "../constants/activityConstants";

const API = process.env.REACT_APP_NODE_API;
// all notifications
export const getAllNotifications = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_NOTIFICATIONS_REQUEST,
    });

    const config = {
      Content_Type: "application/json",
    };
    const { data } = await axios.get(
      `${API}/activity-log/get-notification`,
      config
    );
    dispatch({
      type: GET_ALL_NOTIFICATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_NOTIFICATIONS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//single notification
export const getSingleNotification = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_NOTIFICATIONS_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(
      `${API}/activity-log/get-single-notification/${id}`,
      config
    );

    dispatch({
      type: GET_SINGLE_NOTIFICATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_NOTIFICATIONS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete notification
export const deleteSingleNotification = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SINGLE_NOTIFICATIONS_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.delete(
      `${API}/activity-log/delete-single-notification/${id}`,
      config
    );
    dispatch({
      type: DELETE_SINGLE_NOTIFICATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SINGLE_NOTIFICATIONS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// mark single notification as read
export const markSingleNotificationAsRead = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MARK_SINGLE_AS_READ_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.patch(
      `${API}/activity-log/mark-single-as-read/${id}`,
      config
    );
    dispatch({
      type: MARK_SINGLE_AS_READ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARK_SINGLE_AS_READ_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// mark single notification as read
export const markAllNotificationAsRead = () => async (dispatch) => {
  try {
    dispatch({
      type: MARK_ALL_AS_READ_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.patch(
      `${API}/activity-log/mark-all-as-read/`,
      config
    );
    dispatch({
      type: MARK_ALL_AS_READ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARK_ALL_AS_READ_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
