import mongoose from "mongoose";

const leavesSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  leaveType: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  dateRange: {
    type: String,
    required: true,
  },
  isHalfDay: {
    type: Boolean,
  },
  totalNoOfDays: {
    type: Number,
  },
  reason: {
    type: String,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  leavesAvailable: {
    type: Number,
  },
  approvalStatus: {
    type: String,
    enum:["Pending","Approved","Rejected"],
    default:"Pending"
  },

},{timestamps:true});

const leavesModel = new mongoose.model("leaves", leavesSchema);
export default leavesModel;
