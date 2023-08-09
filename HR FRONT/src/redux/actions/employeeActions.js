import axios from "axios";
import {
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILED,
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
  GET_ALL_EMPLOYEES_FAILED,
  GET_SINGLE_EMPLOYEE_REQUEST,
  GET_SINGLE_EMPLOYEE_SUCCESS,
  GET_SINGLE_EMPLOYEE_FAILED,
  EDIT_EMPLOYEE_REQUEST,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_FAILED,
  SEARCH_EMPLOYEE_REQUEST,
  SEARCH_EMPLOYEE_SUCCESS,
  SEARCH_EMPLOYEE_FAILED,
  GET_EMPLOYEE_BY_DEPARTMENT_REQUEST,
  GET_EMPLOYEE_BY_DEPARTMENT_SUCCESS,
  GET_EMPLOYEE_BY_DEPARTMENT_FAILED,
  PROMOTE_TO_ADMIN_REQUEST,
  PROMOTE_TO_ADMIN_SUCCESS,
  PROMOTE_TO_ADMIN_FAILED,
} from "../constants/employeeConstants";

const API = process.env.REACT_APP_NODE_API;

// add Employee
export const addEmployee = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_EMPLOYEE_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const body = formData;
    const { data } = await axios.post(
      `${API}/employees/add-employee`,
      body,
      config
    );
    dispatch({
      type: ADD_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EMPLOYEE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   get all employees
export const getAllEmployees = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_EMPLOYEES_REQUEST,
    });
    const config = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.get(`${API}/employees/show-employee`, config);
    dispatch({
      type: GET_ALL_EMPLOYEES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEES_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get single employee
export const getSingleEmployee = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_REQUEST,
    });
    const config = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.get(
      `${API}/employees/show-individual-employee/${id}`,
      config
    );
    dispatch({
      type: GET_SINGLE_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// edit employee
export const editEmployee = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_EMPLOYEE_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const body = formData;

    const { data } = await axios.patch(
      `${API}/employees/edit-individual-employee/${id}`,
      body,
      config
    );
    dispatch({
      type: EDIT_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_EMPLOYEE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   search employee
export const searchEmployee =
  (employeeID, name, designation) => async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_EMPLOYEE_REQUEST,
      });

      const config = {
        "Content-Type": "application/json",
      };

      const { data } = await axios.get(
        `${API}/employees/search?employeeID=${employeeID}&name=${name}&department=${designation}`,
        config
      );
      dispatch({
        type: SEARCH_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_EMPLOYEE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//   search employee
export const getEmployeeByDepartment = (department) => async (dispatch) => {
  try {
    dispatch({
      type: GET_EMPLOYEE_BY_DEPARTMENT_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(
      `${API}/employees/get-by-department?department=${department}`,
      config
    );
    dispatch({
      type: GET_EMPLOYEE_BY_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEE_BY_DEPARTMENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// edit employee
export const promoteToAdmin = (id, role) => async (dispatch) => {
  try {
    dispatch({
      type: PROMOTE_TO_ADMIN_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const body = {
      role,
    };
    const { data } = await axios.patch(
      `${API}/employees/edit-individual-employee/${id}`,
      body,
      config
    );
    dispatch({
      type: PROMOTE_TO_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROMOTE_TO_ADMIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
