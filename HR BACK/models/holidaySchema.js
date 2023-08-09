import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  occassion: {
    type: String,
    required: true,
  },
});

const holidayModel = mongoose.model("holiday", holidaySchema);
export default holidayModel;
