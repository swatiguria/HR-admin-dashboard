import axios from "axios";
import {
  ADD_LEAVE_REQUEST,
  ADD_LEAVE_SUCCESS,
  ADD_LEAVE_FAILED,
  SHOW_LEAVE_REQUEST,
  SHOW_LEAVE_SUCCESS,
  SHOW_LEAVE_FAILED,
  DELETE_LEAVE_REQUEST,
  DELETE_LEAVE_SUCCESS,
  DELETE_LEAVE_FAILED,
  EDIT_LEAVE_REQUEST,
  EDIT_LEAVE_SUCCESS,
  EDIT_LEAVE_FAILED,
} from "../constants/leaveSettingsConstants";

const API = process.env.REACT_APP_NODE_API;

export const addLeaveSettings =
  (leaveType, noOfDays, canItBeForwarded, forwardedDays, status) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_LEAVE_REQUEST });
      const config = {
        "Content-Type": "application/json",
      };
      const body = {
        leaveType,
        noOfDays,
        canItBeForwarded,
        forwardedDays,
        status,
      };
      const { data } = await axios.post(
        `${API}/leave-settings/add-leave`,
        body,
        config
      );
      dispatch({ type: ADD_LEAVE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_LEAVE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const showLeaveSettings = () => async (dispatch) => {
  try {
    dispatch({ type: SHOW_LEAVE_REQUEST });
    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(`${API}/leave-settings/all-leave`, config);
    dispatch({ type: SHOW_LEAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHOW_LEAVE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteLeaveSettings = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LEAVE_REQUEST });
    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.delete(
      `${API}/leave-settings//delete-leave/${id}`,
      config
    );
    dispatch({ type: DELETE_LEAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_LEAVE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editLeaveSettings =
  (id, leaveType, noOfDays, canItBeForwarded, forwardedDays, status) =>
  async (dispatch) => {
    try {
      dispatch({ type: EDIT_LEAVE_REQUEST });
      const config = {
        "Content-Type": "application/json",
      };
      const body = {
        leaveType,
        noOfDays,
        canItBeForwarded,
        forwardedDays,
        status,
      };
      const { data } = await axios.patch(
        `${API}/leave-settings/edit-leave/${id}`,
        body,
        config
      );

      dispatch({ type: EDIT_LEAVE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EDIT_LEAVE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
