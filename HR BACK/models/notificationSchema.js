import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    employee: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    read: { type: Boolean, default: false },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    leaveID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "leaves",
    },
  },
  { timestamps: true }
);

const notificationModel = new mongoose.model(
  "notification",
  notificationSchema
);
export default notificationModel;
