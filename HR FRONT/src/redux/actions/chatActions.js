import axios from "axios";
import {
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILED,
} from "../constants/chatConstants";

const API = process.env.REACT_APP_NODE_API;

// get message
export const getMessage = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MESSAGE_REQUEST,
    });
    const config = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.get(
      `${API}/message/get-message/${id}`,
      config
    );
    dispatch({
      type: GET_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MESSAGE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
