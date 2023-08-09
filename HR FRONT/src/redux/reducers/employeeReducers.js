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

//    ADD EMPLOYEE REDUCER
const addEmployeeInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const addEmployeeReducer = (state = addEmployeeInitialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_EMPLOYEE_FAILED:
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

//   GET ALL EMPLOYEES
const getAllEmployeesInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const getAllEmployeesReducer = (
  state = getAllEmployeesInitialState,
  action
) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEES_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case GET_ALL_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_ALL_EMPLOYEES_FAILED:
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

//   GET SINGLE EMPLOYEE
const getSingleEmployeeInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const getSingleEmployeeReducer = (
  state = getSingleEmployeeInitialState,
  action
) => {
  switch (action.type) {
    case GET_SINGLE_EMPLOYEE_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case GET_SINGLE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_SINGLE_EMPLOYEE_FAILED:
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


// EDIT EMPLOYEE
const editEmployeeInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const editEmployeeReducer = (
  state = editEmployeeInitialState,
  action
) => {
  switch (action.type) {
    case EDIT_EMPLOYEE_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case EDIT_EMPLOYEE_FAILED:
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

// SEARCH EMPLOYEE
const searchEmployeeInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const searchEmployeeReducer = (
  state = searchEmployeeInitialState,
  action
) => {
  switch (action.type) {
    case SEARCH_EMPLOYEE_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case SEARCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case SEARCH_EMPLOYEE_FAILED:
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

// GET EMPLOYEE BY DEPARTMENT
const getEmployeeByDepartmentInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const getEmployeeByDepartmentReducer = (
  state = getEmployeeByDepartmentInitialState,
  action
) => {
  switch (action.type) {
    case GET_EMPLOYEE_BY_DEPARTMENT_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case GET_EMPLOYEE_BY_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_EMPLOYEE_BY_DEPARTMENT_FAILED:
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

// PROMOTE TO ADMIN
const promoteToAdminInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const promoteToAdminReducer = (
  state = promoteToAdminInitialState,
  action
) => {
  switch (action.type) {
    case PROMOTE_TO_ADMIN_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case PROMOTE_TO_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case PROMOTE_TO_ADMIN_FAILED:
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

