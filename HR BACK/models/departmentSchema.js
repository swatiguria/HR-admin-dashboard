import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    trim: true,
    required: true,
  },
  departmentDescription: {
    type: String,
    trim: true,
    required: true,
  },
});
const departmentModel = mongoose.model("department", departmentSchema);
export default departmentModel;