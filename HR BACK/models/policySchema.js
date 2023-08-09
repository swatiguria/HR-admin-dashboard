import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
    },
    fileName: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const policyModel = mongoose.model("policy", policySchema);
export default policyModel;
