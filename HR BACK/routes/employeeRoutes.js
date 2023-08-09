import express from "express";
import {
  addEmployee,
  editIndivisualEmployee,
  sendPasswordLink,
  showEmployeeList,
  showIndivisualEmployee,
  searchEmployee,
  getEmployeeByDepartment,
} from "../controllers/employeeController.js";
import { uploadImage } from "../utils/storage.js";
const employeeRouter = express.Router();

employeeRouter.post("/add-employee", uploadImage, addEmployee);
employeeRouter.post("/set-password", sendPasswordLink);
employeeRouter.get("/show-employee", showEmployeeList);
employeeRouter.get("/show-individual-employee/:id", showIndivisualEmployee);
employeeRouter.patch(
  "/edit-individual-employee/:id",
  uploadImage,
  editIndivisualEmployee
);
employeeRouter.get("/search", searchEmployee);
employeeRouter.get("/get-by-department", getEmployeeByDepartment);

export default employeeRouter;
