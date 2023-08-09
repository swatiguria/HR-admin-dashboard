import axios from "axios";
import {
  ADD_DEPARTMENT_REQUEST,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_FAILED,
  GET_ALL_DEPARTMENTS_REQUEST,
  GET_ALL_DEPARTMENTS_SUCCESS,
  GET_ALL_DEPARTMENTS_FAILED,
  UPDATE_DEPARTMENT_REQUEST,
  UPDATE_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_FAILED,
  DELETE_DEPARTMENT_REQUEST,
  DELETE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_FAILED,
  TRANSFER_EMPLOYEES_REQUEST,
  TRANSFER_EMPLOYEES_SUCCESS,
  TRANSFER_EMPLOYEES_FAILED,
} from "../constants/departmentConstants";

const API = process.env.REACT_APP_NODE_API;

// add department
export const addDepartment =
  (departmentName, departmentDescription) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_DEPARTMENT_REQUEST,
      });

      const config = {
        "Content-Type": "application/json",
      };
      const body = {
        departmentName,
        departmentDescription,
      };
      const { data } = await axios.post(
        `${API}/department/add-department`,
        body,
        config
      );
      dispatch({
        type: ADD_DEPARTMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_DEPARTMENT_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// edit department
export const editDepartment =
  (id, departmentName, departmentDescription) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_DEPARTMENT_REQUEST,
      });

      const config = {
        "Content-Type": "application/json",
      };
      const body = {
        departmentName,
        departmentDescription,
      };
      const { data } = await axios.patch(
        `${API}/department/edit/${id}`,
        body,
        config
      );
      dispatch({
        type: UPDATE_DEPARTMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DEPARTMENT_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//   GET ALL DEPARTMENT
export const getAllDepartments = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_DEPARTMENTS_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(`${API}/department/all`, config);
    dispatch({
      type: GET_ALL_DEPARTMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_DEPARTMENTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE DEPARTMENT
export const deleteDepartment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DEPARTMENT_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.delete(
      `${API}/department/delete/${id}`,
      config
    );
    dispatch({
      type: DELETE_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DEPARTMENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const transferEmployees =
  (employees, department) => async (dispatch) => {
    try {
      dispatch({
        type: TRANSFER_EMPLOYEES_REQUEST,
      });

      const config = {
        "Content-Type": "application/json",
      };
      const body = {
        employees,
        department,
      };
      const { data } = await axios.post(
        `${API}/department/transfer`,
        body,
        config
      );
      dispatch({
        type: TRANSFER_EMPLOYEES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRANSFER_EMPLOYEES_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
