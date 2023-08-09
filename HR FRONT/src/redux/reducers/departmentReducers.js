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

//    ADD DEPARTMENT REDUCER
const addDepartmentInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const addDepartmentReducer = (
  state = addDepartmentInitialState,
  action
) => {
  switch (action.type) {
    case ADD_DEPARTMENT_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case ADD_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_DEPARTMENT_FAILED:
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

//    GET ALL DEPARTMENTS REDUCER
const getAllDepartmentsInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const getAllDepartmentsReducer = (
  state = getAllDepartmentsInitialState,
  action
) => {
  switch (action.type) {
    case GET_ALL_DEPARTMENTS_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case GET_ALL_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_ALL_DEPARTMENTS_FAILED:
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

//    EDIT DEPARTMENT REDUCER
const editDepartmentInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const editDepartmentReducer = (
  state = editDepartmentInitialState,
  action
) => {
  switch (action.type) {
    case UPDATE_DEPARTMENT_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case UPDATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case UPDATE_DEPARTMENT_FAILED:
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

//   DELETE DEPARTMENT
const deleteDepartmentInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const deleteDepartmentReducer = (
  state = deleteDepartmentInitialState,
  action
) => {
  switch (action.type) {
    case DELETE_DEPARTMENT_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case DELETE_DEPARTMENT_FAILED:
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

//    TRANSFER EMPLOYEES REDUCER
const transferEmployeesInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const transferEmployeesReducer = (
  state = transferEmployeesInitialState,
  action
) => {
  switch (action.type) {
    case TRANSFER_EMPLOYEES_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case TRANSFER_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case TRANSFER_EMPLOYEES_FAILED:
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
