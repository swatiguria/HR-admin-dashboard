import express from "express";
import {
  getAllNotifications,
  getSingleNotification,
  deleteSingleNotification,
  markSingleAsRead,
  markAllAsRead,
} from "../controllers/notificationController.js";

const activityRouter = express();

activityRouter.get("/get-notification", getAllNotifications);
activityRouter.get("/get-single-notification/:id", getSingleNotification);
activityRouter.patch("/mark-single-as-read/:id", markSingleAsRead);
activityRouter.patch("/mark-all-as-read", markAllAsRead);
activityRouter.delete(
  "/delete-single-notification/:id",
  deleteSingleNotification
);

export default activityRouter;
