import leavesModel from "../../models/leave_model/leavesSchema.js";
import leaveSettingModel from "../../models/leave_model/leaveSettingSchema.js";
import { result } from "../../utils/supportModule.js";
import userModel from "../../models/userSchema.js";
import { addNotification } from "../notificationController.js";
import notificationModel from "../../models/notificationSchema.js";

//add
export const applyLeavesForEmployee = async (req, res, next) => {
  try {
    const {
      employeeName,
      leaveType,
      user,
      dateRange,
      totalNoOfDays,
      reason,
      isHalfDay,
      approvedBy,
    } = req.body;

    const individualLeave = await leaveSettingModel.findOne({ leaveType });
    if (individualLeave) {
      if (individualLeave.status) {
        const leaveForEmployee = await leavesModel.create({
          employeeName,
          leaveType,
          user,
          dateRange,
          totalNoOfDays,
          reason,
          isHalfDay,
          approvedBy,
        });

        if (leaveForEmployee) {
          let msg = "sent a leave application for approval";

          addNotification(
            leaveForEmployee.employeeName,
            leaveForEmployee.user,
            leaveForEmployee.approvedBy,
            msg,
            leaveForEmployee.approvalStatus,
            leaveForEmployee._id
          );

          res.send(
            result(leaveForEmployee, 200, "Leave applied successfully", true)
          );
        } else {
          res.send(result(null, 400, "Error in applying leave", false));
        }
      } else {
        res.send(result(null, 400, `${leaveType} is not active`, false));
      }
    } else {
      res.send(result(null, 400, `${leaveType} is not present`, false));
    }
  } catch (error) {
    next(error);
  }
};

//delete
export const deleteLeavesForEmployee = async (req, res, next) => {
  try {
    const deleteLeaves = await leavesModel.findByIdAndDelete(req.params.id);

    if (deleteLeaves) {
      res.send(result(deleteLeaves, 200, "Leave deleted successful", true));
    } else {
      res.send(result(null, 400, "Error in deleting leave", false));
    }
  } catch (error) {
    next(error);
  }
};

//get all
export const getAllLeavesForEmployee = async (req, res, next) => {
  try {
    const getAllLeaves = await leavesModel.find({}).populate("approvedBy");

    if (getAllLeaves) {
      res.send(
        result(
          getAllLeaves.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            return 0;
          }),
          200,
          "All leaves are shown",
          true
        )
      );
    } else {
      res.send(result(null, 400, "Error in showing all leaves", false));
    }
  } catch (error) {
    next(error);
  }
};

//individual leaves
export const getIndivisualLeaveForEmployee = async (req, res, next) => {
  try {
    const getindividual = await leavesModel
      .findById(req.params.id)
      .populate("approvedBy")
      .populate("user");

    if (getindividual) {
      res.send(result(getindividual, 200, "individual leaves are shown", true));
    } else {
      res.send(result(null, 400, "Error in showing leaves", false));
    }
  } catch (error) {
    next(error);
  }
};

// edit
export const editLeavesForEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { approvedBy } = req.body;
    const individualLeave = await leavesModel.findById(id);
    const editLeaves = await leavesModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (editLeaves) {
      if (editLeaves.approvalStatus !== "Pending") {
        let msg = "leave approval of";
        await notificationModel.findOneAndDelete({
          leaveID: editLeaves._id,
        });
        addNotification(
          editLeaves.employeeName,
          editLeaves.user,
          editLeaves.approvedBy,
          msg,
          editLeaves.approvalStatus,
          editLeaves._id
        );
      }
      if (individualLeave.approvedBy.toString() !== approvedBy) {
        let msg = "sent a leave application for approval";
        await notificationModel.findOneAndDelete({
          leaveID: editLeaves._id,
        });

        addNotification(
          editLeaves.employeeName,
          editLeaves.user,
          editLeaves.approvedBy,
          msg,
          editLeaves.approvalStatus,
          editLeaves._id
        );
      }

      if (editLeaves.approvalStatus === "Approved") {
        const employee = await userModel.findById(editLeaves.user);

        if (employee) {
          let leaveByCategory = employee.leaveByCategory;
          let remainingLeave =
            employee.remainingLeaves - editLeaves.totalNoOfDays;
          remainingLeave <= 0
            ? (employee.remainingLeaves = 0)
            : (employee.remainingLeaves = remainingLeave);

          leaveByCategory.forEach((item) => {
            if (item.leaveType === editLeaves.leaveType) {
              item.remainingLeaves =
                item.remainingLeaves - editLeaves.totalNoOfDays <= 0
                  ? 0
                  : item.remainingLeaves - editLeaves.totalNoOfDays;
            }
          });

          employee.save();
        }
      }

      res.send(result(editLeaves, 200, "Leave updated successfully", true));
    } else {
      res.send(result(null, 400, "Error in updating leave", false));
    }
  } catch (error) {
    next(error);
  }
};

// show all leaves of employee
export const getLeaveListForEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await leavesModel
      .find({
        user: id,
      })
      .populate("approvedBy");
    if (getUser) {
      res.send(
        result(
          getUser.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            return 0;
          }),
          200,
          "Leaves of User displayed",
          true
        )
      );
    } else {
      res.send(result(null, 400, "Error in displaying User leaves", false));
    }
  } catch (error) {
    next(error);
  }
};

// approve or reject leave applocation
export const changeApprovalStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { approvalStatus } = req.query;
    const editLeaves = await leavesModel.findByIdAndUpdate(
      id,
      { approvalStatus },
      {
        new: true,
      }
    );
    if (editLeaves) {
      let msg = "leave approval of";
      addNotification(
        editLeaves.employeeName,
        editLeaves.user,
        editLeaves.approvedBy,
        msg,
        editLeaves.approvalStatus,
        editLeaves._id
      );

      if (approvalStatus === "Approved") {
        const employee = await userModel.findById(editLeaves.user);

        if (employee) {
          let leaveByCategory = employee.leaveByCategory;
          let remainingLeave =
            employee.remainingLeaves - editLeaves.totalNoOfDays;
          remainingLeave <= 0
            ? (employee.remainingLeaves = 0)
            : (employee.remainingLeaves = remainingLeave);

          leaveByCategory.forEach((item) => {
            if (item.leaveType === editLeaves.leaveType) {
              item.remainingLeaves =
                item.remainingLeaves - editLeaves.totalNoOfDays <= 0
                  ? 0
                  : item.remainingLeaves - editLeaves.totalNoOfDays;
            }
          });

          employee.save();
        }
        res.send(result(editLeaves, 200, `Leave ${approvalStatus}`, true));
      }
      res.send(result(editLeaves, 200, `Leave ${approvalStatus}`, true));
    }
  } catch (error) {
    next(error);
  }
};
