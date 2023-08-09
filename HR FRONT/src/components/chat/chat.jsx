import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import classnames from "classnames";
import "./chat.scss";
import ChatLogic from "./chatLogic";
import MessageComponent from "../MessageComponent/MessageComponent";
import { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


const Chat = ({ leaveId }) => {
  const {
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
  } = ChatLogic(leaveId);

  const location = useLocation();
  const [state, setState] = useState();
  const [isMobile, setIsMobile] = useState(false);

  const updateIsAtBottomState = (result) => {
    setState({
      isAtBottom: result,
    });
  };

  const handleMobile = () => {
    if (document.body.clientWidth < 450) {
      setIsMobile(true);
      setSpread(false);
    } else {
      setIsMobile(false);
      setSpread(true);
    }
  };

  useEffect(() => {
    handleMobile();
  }, [location]);

  window.addEventListener("resize", function (event) {
    handleMobile();
  });

  window.addEventListener("load", function (event) {
    handleMobile();
  });

  useEffect(() => {
    updateIsAtBottomState();
  }, [messageRecieved]);

  return (
    <div className="relative ">
      {loading ? (
        <div className="flex justify-center w-[20%] py-8">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className="chatBox sm:m-5 mt-4 p-5 pt-0" id="box" >
          <ScrollableFeed onScroll={isAtBottom => updateIsAtBottomState(isAtBottom)}>
            {messageRecieved?.length !== 0 && (

              messageRecieved?.map((item, index) => {
                return (
                  <MessageComponent key={index} item={item} logData={logData} />
                );
              }
              ))
            }</ScrollableFeed>
        </div>)}

      <div className="border m-5 pt-3 ps-5 rounded-md bg-white">
        <div className="showText flex justify-between ps-3">
          <input
            type="text"
            placeholder="Reply ..."
            className={classnames("w-full overflow-auto text-[0.8rem]", {
              "font-bold": bold,
              italic: italic,
              "line-through": lineThrough,
            })}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddMessage();
              }
            }}
            ref={inputMessage}
          />
        </div>

        <div
          className={`flex justify-between mt-4 ${
            isMobile ? (spread ? "flex-col" : "flex-row ") : "flex-row"
          }`}
        >
          <div className="flex flex-row gap-2">
            {spread ? (
              <div className="grid grid-cols-6">
                <button
                  className="p-1"
                  onClick={() => {
                    setBold(!bold);
                    inputMessage.current.focus();
                  }}
                >
                  <FormatBoldIcon
                    fontSize="small"
                    style={{ color: bold ? "black" : "grey" }}
                  />
                </button>
                <button
                  className="p-1"
                  onClick={() => {
                    setItalic(!italic);
                    inputMessage.current.focus();
                  }}
                >
                  <FormatItalicIcon
                    fontSize="small"
                    style={{ color: italic ? "black" : "grey" }}
                  />
                </button>
                <button
                  className="p-1"
                  onClick={() => {
                    setLineThrough(!lineThrough);
                    inputMessage.current.focus();
                  }}
                >
                  <StrikethroughSIcon
                    fontSize="small"
                    style={{ color: lineThrough ? "black" : "grey" }}
                  />
                </button>
                <button className="p-1" onClick={copyToClipboard}>
                  <ContentPasteIcon
                    fontSize="small"
                    style={{ color: "grey" }}
                  />
                </button>
                <button
                  className="p-1"
                  onClick={() => {
                    setSpread(!spread);
                  }}
                >
                  <MoreHorizIcon style={{ color: "grey" }} />
                </button>
              </div>
            ) : (
              <>
                <button
                  className="p-1"
                  onClick={() => {
                    setSpread(!spread);
                  }}
                >
                  <MoreHorizIcon style={{ color: "grey" }} />
                </button>
              </>
            )}
          </div>
          <div className="flex flex-row gap-2 relative">
            <button
              className="p-1"
              style={{ color: "grey" }}
              onClick={() => {
                setUpperCase(!upperCase);
              }}
            >
              Aa
            </button>
            <button
              className="p-1"
              onClick={() => {
                setMessage((prev) => prev + "@");
              }}
            >
              <AlternateEmailIcon fontSize="small" style={{ color: "grey" }} />
            </button>
            <button
              className="p-1"
              onClick={() => setPickerVisible(!isPickerVisible)}
            >
              <SentimentSatisfiedAltIcon
                fontSize="small"
                style={{ color: "grey" }}
              />
            </button>

            <button className="p-1" onClick={handleAddMessage}>
              <SendIcon fontSize="small" />
            </button>
            <div
              className={
                isPickerVisible
                  ? "block absolute bottom-[2rem] right-[3rem]"
                  : "hidden"
              }
            >
              <Picker
                data={data}
                previewPosition="none"
                onEmojiSelect={(e) => {
                  setCurrentEmoji(e.native);
                  setPickerVisible(!isPickerVisible);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
