import axios from "axios";
import {
  ADD_POLICY_REQUEST,
  ADD_POLICY_SUCCESS,
  ADD_POLICY_FAILED,
  GET_ALL_POLICY_REQUEST,
  GET_ALL_POLICY_SUCCESS,
  GET_ALL_POLICY_FAILED,
  UPDATE_POLICY_REQUEST,
  UPDATE_POLICY_SUCCESS,
  UPDATE_POLICY_FAILED,
  DELETE_POLICY_REQUEST,
  DELETE_POLICY_SUCCESS,
  DELETE_POLICY_FAILED,
} from "../constants/companyPolicyConstants";

const API = process.env.REACT_APP_NODE_API;

// add department
export const addPolicy = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_POLICY_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const body = formData;

    const { data } = await axios.post(
      `${API}/company-policy/add-policy`,
      body,
      config
    );
    dispatch({
      type: ADD_POLICY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_POLICY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// edit department
export const editPolicy = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_POLICY_REQUEST,
    });
    const config = {
      "Content-Type": "application/json",
    };
    const body = formData;

    const { data } = await axios.patch(
      `${API}/company-policy/edit-policy/${id}`,
      body,
      config
    );
    dispatch({
      type: UPDATE_POLICY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POLICY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE DEPARTMENT
export const deletePolicy = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_POLICY_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.delete(
      `${API}/company-policy/delete-policy/${id}`,
      config
    );
    dispatch({
      type: DELETE_POLICY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POLICY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   GET ALL DEPARTMENT
export const getAllPolicy = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_POLICY_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(`${API}/company-policy/all`, config);
    dispatch({
      type: GET_ALL_POLICY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_POLICY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
