import notificationModel from "../models/notificationSchema.js";
import { result } from "../utils/supportModule.js";

// add notification
export const addNotification = async (
  employee,
  user,
  approvedBy,
  message,
  approvalStatus,
  leaveID
) => {
  try {
    const notification = await notificationModel.create({
      employee,
      user,
      approvedBy,
      message,
      approvalStatus,
      leaveID,
      read: false,
    });

    if (notification) {
      return {
        success: true,
        data: notification,
        status: 200,
      };
    } else {
      return {
        success: false,
        data: null,
        status: 400,
        message: "Error in sending notification",
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      status: 500,
      message: error.message,
    };
  }
};

//get all
export const getAllNotifications = async (req, res, next) => {
  try {
    const getNotifications = await notificationModel.find({}).populate([
      {
        path: "user",
        select: "photo role _id",
      },
      {
        path: "approvedBy",
      },
    ]);

    if (getNotifications) {
      res.send(
        result(
          getNotifications.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            return 0;
          }),
          200,
          "All Notifications are shown",
          true
        )
      );
    } else {
      res.send(result(null, 400, "Error in showing all notifications", false));
    }
  } catch (error) {
    next(error);
  }
};

//get single notification
export const getSingleNotification = async (req, res, next) => {
  try {
    const getNotification = await notificationModel.findById(req.params.id);

    if (getNotification) {
      res.send(
        result(getNotification, 200, "Single Notification is shown", true)
      );
    } else {
      res.send(result(null, 400, "Error in showing the notification", false));
    }
  } catch (error) {
    next(error);
  }
};

// delete notification
export const deleteSingleNotification = async (req, res, next) => {
  try {
    const deleteNotification = await notificationModel.findByIdAndDelete(
      req.params.id
    );

    if (deleteNotification) {
      res.send(
        result(deleteNotification, 200, "Single Notification is deleted", true)
      );
    } else {
      res.send(result(null, 400, "Error in deleting the notification", false));
    }
  } catch (error) {
    next(error);
  }
};

// Mark Single Notification as Read
export const markSingleAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getNotification = await notificationModel.findById(id);
    if (getNotification) {
      getNotification.read = true;
      getNotification.save();
      res.send(
        result(getNotification, 200, "Notification is mark as read", true)
      );
    } else {
      res.send(result(null, 404, "Notification not found", false));
    }
  } catch (error) {
    next(error);
  }
};

// Mark ALL Notification as Read
export const markAllAsRead = async (req, res, next) => {
  try {
    const getAllNotification = await notificationModel.find({});
    if (getAllNotification) {
      async function changeReadStatus() {
        let notifications = getAllNotification.map(async (item) => {
          item.read = true;
          item.save();
        });
        return Promise.all(notifications);
      }
      changeReadStatus().then((data) => {
        res.send(result(data, 200, "Notification is mark as read", true));
      });
    } else {
      res.send(result(null, 404, "Notification not found", false));
    }
  } catch (error) {
    next(error);
  }
};
