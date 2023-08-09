import {
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILED,
} from "../constants/chatConstants";

// get message reducer
const getMessageInitialState = {
    loading: false,
    data: null,
    error: null,
};
export const getMessageReducer = (
    state = getMessageInitialState,
    action
) => {
    switch(action.type) {
        case GET_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
                data: null,
                error: null,
            };
        case GET_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case GET_MESSAGE_FAILED:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload,
            };
        default:
            return state;
    }
}