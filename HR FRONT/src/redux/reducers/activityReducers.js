import {
  GET_ALL_NOTIFICATIONS_REQUEST,
  GET_ALL_NOTIFICATIONS_SUCCESS,
  GET_ALL_NOTIFICATIONS_FAILED,
  GET_SINGLE_NOTIFICATIONS_REQUEST,
  GET_SINGLE_NOTIFICATIONS_SUCCESS,
  GET_SINGLE_NOTIFICATIONS_FAILED,
  DELETE_SINGLE_NOTIFICATIONS_REQUEST,
  DELETE_SINGLE_NOTIFICATIONS_SUCCESS,
  DELETE_SINGLE_NOTIFICATIONS_FAILED,
  MARK_SINGLE_AS_READ_REQUEST,
  MARK_SINGLE_AS_READ_SUCCESS,
  MARK_SINGLE_AS_READ_FAILED,
  MARK_ALL_AS_READ_REQUEST,
  MARK_ALL_AS_READ_SUCCESS,
  MARK_ALL_AS_READ_FAILED,
} from "../constants/activityConstants";

// get all notifications
const getAllNotificationsInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const getAllNotificationsReducer = (
  state = getAllNotificationsInitialState,
  action
) => {
  switch (action.type) {
    case GET_ALL_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case GET_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_ALL_NOTIFICATIONS_FAILED:
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
// get single notification
const getSingleNotificationInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const getSingleNotificationReducer = (
  state = getSingleNotificationInitialState,
  action
) => {
  switch (action.type) {
    case GET_SINGLE_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case GET_SINGLE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    case GET_SINGLE_NOTIFICATIONS_FAILED:
      return {
        ...state,
        error: action.payload,
        data: null,
        loading: false,
      };
    default:
      return state;
  }
};
// delete single notification
const deleteSingleNotificationInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const deleteSingleNotificationReducer = (
  state = deleteSingleNotificationInitialState,
  action
) => {
  switch (action.type) {
    case DELETE_SINGLE_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case DELETE_SINGLE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    case DELETE_SINGLE_NOTIFICATIONS_FAILED:
      return {
        ...state,
        error: action.payload,
        data: null,
        loading: false,
      };
    default:
      return state;
  }
};

// mark single notification as read
const markSingleNotificationAsReadInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const markSingleNotificationAsReadReducer = (
  state = markSingleNotificationAsReadInitialState,
  action
) => {
  switch (action.type) {
    case MARK_SINGLE_AS_READ_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case MARK_SINGLE_AS_READ_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    case MARK_SINGLE_AS_READ_FAILED:
      return {
        ...state,
        error: action.payload,
        data: null,
        loading: false,
      };
    default:
      return state;
  }
};

// mark all notification as read
const markAllNotificationAsReadInitialState = {
  loading: false,
  data: null,
  error: null,
};
export const markAllNotificationAsReadReducer = (
  state = markAllNotificationAsReadInitialState,
  action
) => {
  switch (action.type) {
    case MARK_ALL_AS_READ_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case MARK_ALL_AS_READ_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    case MARK_ALL_AS_READ_FAILED:
      return {
        ...state,
        error: action.payload,
        data: null,
        loading: false,
      };
    default:
      return state;
  }
};
