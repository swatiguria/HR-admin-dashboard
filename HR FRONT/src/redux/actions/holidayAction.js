import axios from "axios";
import {
  ADD_HOLIDAY_REQUEST,
  ADD_HOLIDAY_SUCCESS,
  ADD_HOLIDAY_FAILED,
  EDIT_HOLIDAY_REQUEST,
  EDIT_HOLIDAY_SUCCESS,
  EDIT_HOLIDAY_FAILED,
  DELETE_HOLIDAY_REQUEST,
  DELETE_HOLIDAY_SUCCESS,
  DELETE_HOLIDAY_FAILED,
  SHOW_HOLIDAYS_REQUEST,
  SHOW_HOLIDAYS_SUCCESS,
  SHOW_HOLIDAYS_FAILED,
} from "../constants/holidayConstants";

const API = process.env.REACT_APP_NODE_API;

// add holiday
export const addHoliday = (date, occassion) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_HOLIDAY_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const body = {
      date,
      occassion,
    };
    const { data } = await axios.post(
      `${API}/holiday/add-holiday`,
      body,
      config
    );
    dispatch({
      type: ADD_HOLIDAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_HOLIDAY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// edit holiday
export const editHoliday = (id, date, occassion) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_HOLIDAY_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const body = {
      date,
      occassion,
    };
    const { data } = await axios.patch(
      `${API}/holiday/edit-holiday/${id}`,
      body,
      config
    );
    dispatch({
      type: EDIT_HOLIDAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_HOLIDAY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete holiday
export const deleteHoliday = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_HOLIDAY_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.delete(
      `${API}/holiday/delete-holiday/${id}`,
      config
    );
    dispatch({
      type: DELETE_HOLIDAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_HOLIDAY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// show holidays
export const showHolidays = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_HOLIDAYS_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(`${API}/holiday/all`, config);
    dispatch({
      type: SHOW_HOLIDAYS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOW_HOLIDAYS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
