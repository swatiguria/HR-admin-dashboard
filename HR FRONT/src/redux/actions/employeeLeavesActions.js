import axios from "axios";
import {
  SHOW_ALL_EMPLOYEE_LEAVES_REQUEST,
  SHOW_ALL_EMPLOYEE_LEAVES_SUCCESS,
  SHOW_ALL_EMPLOYEE_LEAVES_FAILED,
  ADD_LEAVES_FOR_EMPLOYEE_REQUEST,
  ADD_LEAVES_FOR_EMPLOYEE_SUCCESS,
  ADD_LEAVES_FOR_EMPLOYEE_FAILED,
  DELETE_LEAVES_FOR_EMPLOYEE_REQUEST,
  DELETE_LEAVES_FOR_EMPLOYEE_SUCCESS,
  DELETE_LEAVES_FOR_EMPLOYEE_FAILED,
  GET_ALL_LEAVES_FOR_EMPLOYEES_REQUEST,
  GET_ALL_LEAVES_FOR_EMPLOYEES_SUCCESS,
  GET_ALL_LEAVES_FOR_EMPLOYEES_FAILED,
  GET_SINGLE_EMPLOYEE_LEAVE_REQUEST,
  GET_SINGLE_EMPLOYEE_LEAVE_SUCCESS,
  GET_SINGLE_EMPLOYEE_LEAVE_FAILED,
  EDIT_LEAVES_FOR_EMPLOYEE_REQUEST,
  EDIT_LEAVES_FOR_EMPLOYEE_SUCCESS,
  EDIT_LEAVES_FOR_EMPLOYEE_FAILED,
  SHOW_SINGLE_EMPLOYEE_LEAVES_REQUEST,
  SHOW_SINGLE_EMPLOYEE_LEAVES_SUCCESS,
  SHOW_SINGLE_EMPLOYEE_LEAVES_FAILED,
  CHANGE_APPROVAL_STATUS_REQUEST,
  CHANGE_APPROVAL_STATUS_SUCCESS,
  CHANGE_APPROVAL_STATUS_FAILED,
} from "../constants/employeeLeaveConstants";

const API = process.env.REACT_APP_NODE_API;

export const getAllEmployeeLeaves = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_ALL_EMPLOYEE_LEAVES_REQUEST,
    });

    const config = {
      Content_Type: "application/json",
    };
    const { data } = await axios.get(`${API}/leaves/all`, config);

    dispatch({
      type: SHOW_ALL_EMPLOYEE_LEAVES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOW_ALL_EMPLOYEE_LEAVES_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// add leaves for employee
export const addLeavesForEmployee =
  (
    employeeName,
    leaveType,
    dateRange,
    user,
    totalNoOfDays,
    reason,
    approvedBy,
    isHalfDay,
    leavesAvailable,
    approvalStatus
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_LEAVES_FOR_EMPLOYEE_REQUEST,
      });

      const config = {
        "Content-Type": "application/json",
      };

      const body = {
        employeeName,
        leaveType,
        dateRange,
        user,
        totalNoOfDays,
        reason,
        approvedBy,
        isHalfDay,
        leavesAvailable,
        approvalStatus,
      };
      const { data } = await axios.post(
        `${API}/leaves/add-employees-on-leave`,
        body,
        config
      );
      dispatch({
        type: ADD_LEAVES_FOR_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_LEAVES_FOR_EMPLOYEE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// delete leaves for employee
export const deleteLeavesForEmployee = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_LEAVES_FOR_EMPLOYEE_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.delete(
      `${API}/leaves/delete-employees-on-leave/${id}`,
      config
    );
    dispatch({
      type: DELETE_LEAVES_FOR_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LEAVES_FOR_EMPLOYEE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get all leaves for employees
export const getAllLeavesForEmployee = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_LEAVES_FOR_EMPLOYEES_REQUEST,
    });

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(`${API}/leaves/all`, config);
    dispatch({
      type: GET_ALL_LEAVES_FOR_EMPLOYEES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_LEAVES_FOR_EMPLOYEES_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get single employee leave request
export const getIndivisualLeaveForEmployee = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_LEAVE_REQUEST,
    });
    const config = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.get(
      `${API}/leaves/get-individual-leaves/${id}`,
      config
    );
    dispatch({
      type: GET_SINGLE_EMPLOYEE_LEAVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_LEAVE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// edit employee
export const editLeavesForEmployee =
  (
    id,
    employeeName,
    leaveType,
    dateRange,
    totalNoOfDays,
    reason,
    approvedBy,
    approvalStatus
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: EDIT_LEAVES_FOR_EMPLOYEE_REQUEST,
      });

      const config = {
        "Content-Type": "application/json",
      };
      const body = {
        employeeName,
        leaveType,
        dateRange,
        totalNoOfDays,
        reason,
        approvedBy,
        approvalStatus,
      };
      const { data } = await axios.patch(
        `${API}/leaves/edit-employees-on-leave/${id}`,
        body,
        config
      );
      dispatch({
        type: EDIT_LEAVES_FOR_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_LEAVES_FOR_EMPLOYEE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSingleEmployeeLeaves = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_SINGLE_EMPLOYEE_LEAVES_REQUEST,
    });

    const config = {
      Content_Type: "application/json",
    };
    const { data } = await axios.get(`${API}/leaves/user-leaves/${id}`, config);

    dispatch({
      type: SHOW_SINGLE_EMPLOYEE_LEAVES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOW_SINGLE_EMPLOYEE_LEAVES_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeApprovalStatus =
  (id, approvalStatus) => async (dispatch) => {
    try {
      dispatch({
        type: CHANGE_APPROVAL_STATUS_REQUEST,
      });

      const config = {
        Content_Type: "application/json",
      };
      const { data } = await axios.get(
        `${API}/leaves/change-approval-status/${id}?approvalStatus=${approvalStatus}`,
        config
      );

      dispatch({
        type: CHANGE_APPROVAL_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_APPROVAL_STATUS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
