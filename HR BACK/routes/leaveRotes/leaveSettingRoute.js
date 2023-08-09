import express from "express";
import {
  addLeaveSetting,
  editLeaveSetting,
  deleteLeaveSetting,
  showLeaveSettings,
  getIndivisualLeaveSetting
} from "../../controllers/leave_controller/leaveSettingsController.js";

const leaveRouter = express.Router();

leaveRouter.post("/add-leave", addLeaveSetting);
leaveRouter.patch("/edit-leave/:id", editLeaveSetting);
leaveRouter.delete("/delete-leave/:id", deleteLeaveSetting);
leaveRouter.get("/all-leave", showLeaveSettings);
leaveRouter.get("/leave/:id", getIndivisualLeaveSetting);

export default leaveRouter;
