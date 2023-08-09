import express from "express";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  showDepartment,
  transferEmployees,
} from "../controllers/departmentController.js";

const route = express.Router();

route.post("/add-department", addDepartment);
route.delete("/delete/:id", deleteDepartment);
route.patch("/edit/:id", editDepartment);
route.get("/all", showDepartment);
route.post("/transfer", transferEmployees);

export default route;