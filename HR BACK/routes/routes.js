import express from "express";
import holidayRouter from "./holidayRoutes.js";
import userRoutes from "./userRoutes.js";
import employeeRouter from "./employeeRoutes.js";
import departmentRoutes from "./departmentRoutes.js";
import leaveRouter from "./leaveRotes/leaveSettingRoute.js";
import leavesRouter from "./leaveRotes/leavesRoute.js";
import messageRouter from "./messageRoutes.js";
import policyRouter from "./policyRoutes.js";
import activityRouter from "./activityRoutes.js";
const route = express.Router();

route.get("/", function (req, res) {
  res.send("Welcome to backend");
});
// route.use("/policy", policyRoute)
route.use("/user", userRoutes);
route.use("/leave-settings", leaveRouter);
route.use("/leaves", leavesRouter);
route.use("/employees", employeeRouter);
route.use("/department", departmentRoutes);
route.use("/message", messageRouter);

route.use("/holiday", holidayRouter);
route.use("/department", departmentRoutes);
route.use("/company-policy", policyRouter);
route.use("/fileUpload", express.static("uploads/fileUploads"));
route.use("/imageUpload", express.static("uploads/employeeImages"));

route.use("/activity-log", activityRouter);
export default route;
