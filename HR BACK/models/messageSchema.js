import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    leaveID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "leaves",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    text: {
      type: String,
    },
    file: {
      type: String,
    },
    style:{
      type: Array,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("message", messageSchema);
