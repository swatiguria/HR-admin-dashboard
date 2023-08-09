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

  // ADD HOLIDAY REDUCER
  const addHolidayInitialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const addHolidayReducer = (
    state = addHolidayInitialState,
    action
  ) => {
    switch (action.type) {
        case ADD_HOLIDAY_REQUEST:
            return {
                ...state,
                loading: true,
                data: null,
                error: null,
            };
        case ADD_HOLIDAY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ADD_HOLIDAY_FAILED:
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

  // EDIT HOLIDAY REDUCER
  const editHolidayInitialState = {
    loading: false,
    data: null,
    error: null,
  };

  export const editHolidayReducer = (
    state = editHolidayInitialState,
    action
  ) => {
    switch (action.type) {
        case EDIT_HOLIDAY_REQUEST:
            return {
                ...state,
                loading: true,
                data: null,
                error: null,
            };
        case EDIT_HOLIDAY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case EDIT_HOLIDAY_FAILED:
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

  // DELETE HOLIDAY REDUCER
  const deleteHolidayInitialState = {
    loading: false,
    data: null,
    error: null,
  };

  export const deleteHolidayReducer = (
    state = deleteHolidayInitialState,
    action
  ) => {
    switch (action.type) {
        case DELETE_HOLIDAY_REQUEST:
            return {
                ...state,
                loading: true,
                data: null,
                error: null,
            };
        case DELETE_HOLIDAY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case DELETE_HOLIDAY_FAILED:
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

  // SHOW HOLIDAYS REDUCER
  const showHolidaysInitialState = {
    loading: false,
    data: null,
    error: null,
  };

  export const showHolidaysReducer = (
    state = showHolidaysInitialState,
    action
  ) => {
    switch (action.type) {
        case SHOW_HOLIDAYS_REQUEST:
            return {
                ...state,
                loading: true,
                data: null,
                error: null,
            };
        case SHOW_HOLIDAYS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case SHOW_HOLIDAYS_FAILED:
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