import userModel from "../models/userSchema.js";

export default async function generateId() {
  let employeeId;
  const readEmployeeList = await userModel.find({});
  let list = readEmployeeList.length;
  let uniqueID = new Date().getYear().toString().slice(1);
  employeeId = "CTS-" + uniqueID + (list + 1);
  return employeeId;
}
