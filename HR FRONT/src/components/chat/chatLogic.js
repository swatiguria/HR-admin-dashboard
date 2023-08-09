import { useState, useRef, useEffect } from "react";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import { getMessage } from "../../redux/actions/chatActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { socket } from "../../utils/socketConnection";

const ChatLogic = (leaveId) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: getMessages,
    loading,
    error,
  } = useSelector((state) => state.getMessage);
  const { userInfo } = useSelector((state) => state.signInUser);
  const inputMessage = useRef(null);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [lineThrough, setLineThrough] = useState(false);
  const [spread, setSpread] = useState(true);
  const [upperCase, setUpperCase] = useState(null);
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState([]);
  const [response, setResponse] = useState(null);
  //emoji
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const [logData, setLogData] = useState([]);

  // copy text
  function copyToClipboard(e) {
    inputMessage.current.select();
    document.execCommand("copy");
    e.target.focus();
  }

  useEffect(() => {
    if (currentEmoji !== null) {
      setMessage(message + currentEmoji);
    }
  }, [currentEmoji]);

  useEffect(() => {
    if (error) SweetAlertComponent("error", error?.message);
  }, [error]);

  // handling chat in progress
  function handleAddMessage() {
    let style = [bold, italic, lineThrough, upperCase];
    socket.emit("send_message", {
      sender: userInfo?._id,
      text: message,
      leaveID: id !== undefined ? id : leaveId,
      style: style,
    });

    setMessage("");

    setBold(false);
    setItalic(false);
    setLineThrough(false);
    setUpperCase(false);
  }

  useEffect(() => {
    let uniqueId = id !== undefined ? id : leaveId;

    socket.on(uniqueId, (data) => {
      setResponse(data);
    });
  });

  useEffect(() => {
    if (response?.data.allMessages[0].success) {
      if (response?.data.allMessages[0].data.leaveID === id ? id : leaveId) {
        setMessageRecieved([
          ...messageRecieved,
          response?.data.allMessages[0].data,
        ]);
        setLogData([...logData, response.data.data[0]]);
      }
    }
  }, [response]);

  useEffect(() => {
    if (id) {
      dispatch(getMessage(id));
    }
  }, [id]);

  useEffect(() => {
    if (leaveId) {
      dispatch(getMessage(leaveId));
    }
  }, [leaveId]);

  useEffect(() => {
    if (upperCase) {
      setMessage(message.toUpperCase());
    } else {
      setMessage(message.toLowerCase());
    }
  }, [upperCase]);

  useEffect(() => {
    if (getMessages !== null) {
      setMessageRecieved([...getMessages.data.allMessages]);
      setLogData([...getMessages?.data.data]);
    }
  }, [getMessages]);

  return {
    inputMessage,
    bold,
    setBold,
    italic,
    setItalic,
    lineThrough,
    setLineThrough,
    spread,
    setSpread,
    upperCase,
    setUpperCase,
    isPickerVisible,
    setPickerVisible,
    setCurrentEmoji,
    copyToClipboard,
    handleAddMessage,
    logData,
    messageRecieved,
    message,
    setMessage,
    loading
  };
};

export default ChatLogic;
