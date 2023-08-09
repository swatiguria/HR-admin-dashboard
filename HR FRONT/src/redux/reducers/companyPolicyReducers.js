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

//    ADD POLICY REDUCER
const addPolicyInitialState = {
    loading: false,
    data: null,
    error: null,
  };
  export const addPolicyReducer = (
    state = addPolicyInitialState,
    action
  ) => {
    switch (action.type) {
      case ADD_POLICY_REQUEST:
        return {
          ...state,
          data: null,
          error: null,
          loading: true,
        };
      case ADD_POLICY_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          data: action.payload,
        };
      case ADD_POLICY_FAILED:
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
  
  //    GET ALL POLICY REDUCER
  const getAllPolicyInitialState = {
    loading: false,
    data: null,
    error: null,
  };
  export const getAllPolicyReducer = (
    state = getAllPolicyInitialState,
    action
  ) => {
    switch (action.type) {
      case GET_ALL_POLICY_REQUEST:
        return {
          ...state,
          data: null,
          error: null,
          loading: true,
        };
      case GET_ALL_POLICY_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          data: action.payload,
        };
      case GET_ALL_POLICY_FAILED:
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
  
  //    EDIT POLICY REDUCER
  const editPolicyInitialState = {
    loading: false,
    data: null,
    error: null,
  };
  export const editPolicyReducer = (
    state = editPolicyInitialState,
    action
  ) => {
    switch (action.type) {
      case UPDATE_POLICY_REQUEST:
        return {
          ...state,
          data: null,
          error: null,
          loading: true,
        };
      case UPDATE_POLICY_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          data: action.payload,
        };
      case UPDATE_POLICY_FAILED:
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
  
  //   DELETE POLICY
  const deletePolicyInitialState = {
    loading: false,
    data: null,
    error: null,
  };
  export const deletePolicyReducer = (
    state = deletePolicyInitialState,
    action
  ) => {
    switch (action.type) {
      case DELETE_POLICY_REQUEST:
        return {
          ...state,
          data: null,
          error: null,
          loading: true,
        };
      case DELETE_POLICY_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          data: action.payload,
        };
      case DELETE_POLICY_FAILED:
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
  