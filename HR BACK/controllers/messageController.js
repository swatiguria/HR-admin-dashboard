import messageSchema from "../models/messageSchema.js";
import { result } from "../utils/supportModule.js";
import userModel from "../models/userSchema.js";

export const addMessage = async (data) => {
  try {
    const user = await userModel.findById(data.sender);
    if (user) {
      const object = {
        leaveID: data.leaveID,
        sender: data.sender,
        text: data.text,
        style: data.style,
      };
      const saveMessage = await messageSchema.create(object);

      if (saveMessage) {
        return {
          success: true,
          data: saveMessage,
          status: 200,
        };
      } else {
        return {
          success: false,
          data: null,
          status: 400,
          message: "Error in sending message",
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      status: 500,
      message: error.message,
    };
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const allMessages = await messageSchema.find({
      leaveID: req.params.id,
    });
    if (allMessages) {
      async function returnUsers() {
        let users = allMessages.map(async (item) => {
          let user = await userModel.findOne(item.sender);
          return user;
        });
        return Promise.all(users);
      }
      returnUsers().then((data) => {
        res.send(
          result(
            { allMessages, data },
            200,
            "Message fetched successfully",
            true
          )
        );
      });
    } else {
      res.send(result(null, 400, "Error in fetching message", false));
    }
  } catch (error) {
    next(error);
  }
};
