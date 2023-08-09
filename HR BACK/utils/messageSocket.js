import { server } from "../index.js";
import { Server } from "socket.io";
import { addMessage } from "../controllers/messageController.js";

import userModel from "../models/userSchema.js";

export default function messageSocket() {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on("send_message", async (data) => {
      const user = await userModel.findById(data.sender);

      addMessage(data).then((res) => {
        io.emit(data.leaveID, { data: { allMessages: [res], data: [user] } });
      });
    });

    socket.on("leave_applied", (data) => {

      io.emit(data.requestTo, { dataSent: true });
    });

    socket.on("approvalStatus", (data) => {
      data.requestTo.forEach((id) => {
        io.emit(id, { dataSent: true });
      });
    });
  });
}
