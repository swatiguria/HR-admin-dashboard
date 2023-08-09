import express from "express";
import {
  applyLeavesForEmployee,
  deleteLeavesForEmployee,
  getAllLeavesForEmployee,
  getIndivisualLeaveForEmployee,
  editLeavesForEmployee,
  getLeaveListForEmployee,
  changeApprovalStatus,
} from "../../controllers/leave_controller/applyLeaveController.js";

const leavesRouter = express();
leavesRouter.post("/add-employees-on-leave", applyLeavesForEmployee);
leavesRouter.delete("/delete-employees-on-leave/:id", deleteLeavesForEmployee);
leavesRouter.get("/all", getAllLeavesForEmployee);
leavesRouter.get("/get-individual-leaves/:id", getIndivisualLeaveForEmployee);
leavesRouter.patch("/edit-employees-on-leave/:id", editLeavesForEmployee);
leavesRouter.get("/user-leaves/:id", getLeaveListForEmployee);
leavesRouter.get("/change-approval-status/:id", changeApprovalStatus);

export default leavesRouter;
