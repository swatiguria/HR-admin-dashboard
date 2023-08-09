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

// get all employee Leaves
const getAllEmployeeLeavesInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const getAllEmployeeLeavesReducer = (
  state = getAllEmployeeLeavesInitialState,
  action
) => {
  switch (action.type) {
    case SHOW_ALL_EMPLOYEE_LEAVES_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case SHOW_ALL_EMPLOYEE_LEAVES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case SHOW_ALL_EMPLOYEE_LEAVES_FAILED:
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

// add leaves for employee reducer
const addLeavesForEmployeeInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const addLeavesForEmployeeReducer = (
  state = addLeavesForEmployeeInitialState,
  action
) => {
  switch (action.type) {
    case ADD_LEAVES_FOR_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case ADD_LEAVES_FOR_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case ADD_LEAVES_FOR_EMPLOYEE_FAILED:
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

//delete leaves for employee reducer
const deleteLeavesForEmployeeInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const deleteLeavesForEmployeeReducer = (
  state = deleteLeavesForEmployeeInitialState,
  action
) => {
  switch (action.type) {
    case DELETE_LEAVES_FOR_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case DELETE_LEAVES_FOR_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_LEAVES_FOR_EMPLOYEE_FAILED:
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

// get all leaves for employees reducer

const getAllLeavesForEmployeInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const getAllLeavesForEmployeeReducer = (
  state = getAllLeavesForEmployeInitialState,
  action
) => {
  switch (action.type) {
    case GET_ALL_LEAVES_FOR_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case GET_ALL_LEAVES_FOR_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ALL_LEAVES_FOR_EMPLOYEES_FAILED:
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

// get single employee leave request reducer
const getIndivisualLeaveForEmployeeInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const getIndivisualLeaveForEmployeeReducer = (
  state = getIndivisualLeaveForEmployeeInitialState,
  action
) => {
  switch (action.type) {
    case GET_SINGLE_EMPLOYEE_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case GET_SINGLE_EMPLOYEE_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_SINGLE_EMPLOYEE_LEAVE_FAILED:
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

// edit employee reducer
const editLeavesForEmployeeInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const editLeavesForEmployeeReducer = (
  state = editLeavesForEmployeeInitialState,
  action
) => {
  switch (action.type) {
    case EDIT_LEAVES_FOR_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case EDIT_LEAVES_FOR_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case EDIT_LEAVES_FOR_EMPLOYEE_FAILED:
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

// get single employee leaves
const getSingleEmployeeLeavesInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const getSingleEmployeeLeavesReducer = (
  state = getSingleEmployeeLeavesInitialState,
  action
) => {
  switch (action.type) {
    case SHOW_SINGLE_EMPLOYEE_LEAVES_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case SHOW_SINGLE_EMPLOYEE_LEAVES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case SHOW_SINGLE_EMPLOYEE_LEAVES_FAILED:
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

// get single employee leaves
const changeApprovalStatusInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const changeApprovalStatusReducer = (
  state = changeApprovalStatusInitialState,
  action
) => {
  switch (action.type) {
    case CHANGE_APPROVAL_STATUS_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case CHANGE_APPROVAL_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case CHANGE_APPROVAL_STATUS_FAILED:
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
