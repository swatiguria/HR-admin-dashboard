import mongoose from "mongoose";

const leavesSchema = new mongoose.Schema({
  leaveType: {
    type: String,
    trim: true,
    required: true,
    enum: ["Medical Leave", "Casual Leave", "Loss of Pay", "Sick leave"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  noOfDays: {
    type: Number,
    required: true,
  },
  canItBeForwarded: {
    type: Boolean,
    default: false,
  },
  forwardedDays: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const leaveSettingModel = mongoose.model("leave_settings", leavesSchema);

export default leaveSettingModel;
