import {
  ADD_LEAVE_REQUEST,
  ADD_LEAVE_SUCCESS,
  ADD_LEAVE_FAILED,
  EDIT_LEAVE_REQUEST,
  EDIT_LEAVE_SUCCESS,
  EDIT_LEAVE_FAILED,
  SHOW_LEAVE_REQUEST,
  SHOW_LEAVE_SUCCESS,
  SHOW_LEAVE_FAILED,
  DELETE_LEAVE_REQUEST,
  DELETE_LEAVE_SUCCESS,
  DELETE_LEAVE_FAILED
} from "../constants/leaveSettingsConstants";


const addLeaveInitialState = {
  loading: false,
  data: null,
  error: null,
}

export const addLeaveSettingsReducer = (state = addLeaveInitialState, action) => {
  switch (action.type) {
    case ADD_LEAVE_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case ADD_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_LEAVE_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  };
}

// Edit Leave

const editLeaveInitialState = {
  loading: false,
  data: null,
  error: null,
}

export const editLeaveSettingsReducer = (state = editLeaveInitialState, action) => {
  switch (action.type) {
    case EDIT_LEAVE_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case EDIT_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case EDIT_LEAVE_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  };
}


// Show All

const showLeaveInitialState = {
  loading: false,
  data: null,
  error: null,
}



export const showLeaveSettingsReducer = (state = showLeaveInitialState, action) => {
  switch (action.type) {
    case SHOW_LEAVE_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case SHOW_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case SHOW_LEAVE_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  };
}


// Delete Leave

const deleteLeaveInitialState = {
  loading: false,
  data: null,
  error: null,
}



export const deleteLeaveSettingsReducer = (state = deleteLeaveInitialState, action) => {
  switch (action.type) {
    case DELETE_LEAVE_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case DELETE_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case DELETE_LEAVE_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  };
}

