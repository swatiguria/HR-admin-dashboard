import leaveSettingModel from "../../models/leave_model/leaveSettingSchema.js";
import { result } from "../../utils/supportModule.js";
import userModel from "../../models/userSchema.js";
//add leave

export const addLeaveSetting = async (req, res, next) => {
  try {
    const { leaveType, noOfDays, canItBeForwarded, forwardedDays, status } =
      req.body;

    const existingLeave = await leaveSettingModel.findOne({
      leaveType: leaveType,
    });

    if (existingLeave) {
      res.send(result(null, 404, "Leave already exists", false));
    } else {
      const createLeave = await leaveSettingModel.create({
        leaveType,
        noOfDays,
        canItBeForwarded,
        forwardedDays,
        status,
      });

      if (createLeave) {
        const employees = await userModel.find({});
        if (status) {
          employees.forEach((employee) => {
            let leaveByCategory = employee.leaveByCategory;
            let leave = {
              leaveType: leaveType,
              allotedLeaves: noOfDays,
              remainingLeaves: noOfDays,
            };
            leaveByCategory.push(leave);
            employee.leaveByCategory = leaveByCategory;
            employee.allotedLeaves =
              employee.allotedLeaves + createLeave.noOfDays;
            employee.remainingLeaves =
              createLeave.noOfDays + employee.remainingLeaves;
            employee.save();
          });
        }
        res.send(result(createLeave, 200, "Leave created", true));
      } else {
        res.send(result(null, 400, "Error in adding leave", false));
      }
    }
  } catch (error) {
    next(error);
  }
};

//edit leave
export const editLeaveSetting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { noOfDays, status } = req.body;
    const editLeaves = await leaveSettingModel.findByIdAndUpdate(id, req.body);

    if (editLeaves) {
      const employees = await userModel.find({});

      if (status === "true" || status === true) {
        employees.forEach((employee) => {
          let leaveByCategory = employee.leaveByCategory;
          let flag = 0;
          leaveByCategory.forEach((item, index) => {
            if (item.leaveType === editLeaves.leaveType) {
              item.allotedLeaves = noOfDays;
              item.remainingLeaves = noOfDays;
            } else if (index === leaveByCategory.length - 1) {
              flag = 1;
            }
          });

          if (leaveByCategory.length === 0 || flag === 1) {
            let leave = {
              leaveType: editLeaves.leaveType,
              allotedLeaves: noOfDays,
              remainingLeaves: noOfDays,
            };
            leaveByCategory.push(leave);
            employee.leaveByCategory = leaveByCategory;

            employee.allotedLeaves =
              parseInt(employee.allotedLeaves) + parseInt(noOfDays);
            employee.remainingLeaves =
              parseInt(employee.remainingLeaves) + parseInt(noOfDays);
          } else {
            employee.leaveByCategory = leaveByCategory;
            employee.allotedLeaves =
              parseInt(employee.allotedLeaves) -
              parseInt(editLeaves.noOfDays) +
              parseInt(noOfDays);
            employee.remainingLeaves =
              parseInt(employee.remainingLeaves) -
              parseInt(editLeaves.noOfDays) +
              parseInt(noOfDays);
          }
          employee.save();
        });
      } else {
        employees.forEach((employee) => {
          let leaveByCategory = employee.leaveByCategory;
          let deleteIndex;
          leaveByCategory.forEach((item, index) => {
            if (item.leaveType === editLeaves.leaveType) {
              deleteIndex = index;
            }
          });
          leaveByCategory.splice(deleteIndex, 1);

          employee.leaveByCategory = leaveByCategory;
          let allotedLeave =
            parseInt(employee.allotedLeaves) - parseInt(noOfDays);
          let remainingLeave =
            parseInt(employee.remainingLeaves) - parseInt(noOfDays);

          allotedLeave < 0 || allotedLeave === 0
            ? (employee.allotedLeaves = 0)
            : (employee.allotedLeaves = allotedLeave);

          remainingLeave < 0 || remainingLeave === 0
            ? (employee.remainingLeaves = 0)
            : (employee.remainingLeaves = remainingLeave);

          employee.save();
        });
      }
      res.send(result(editLeaves, 200, "Leave updated", true));
    } else {
      res.send(result(null, 400, "Error in updating leave", false));
    }
  } catch (error) {
    next(error);
  }
};

//show leaves

export const showLeaveSettings = async (req, res, next) => {
  try {
    const showAllLeaves = await leaveSettingModel.find({});

    if (showAllLeaves) {
      res.send(result(showAllLeaves, 200, "Leaves displayed", true));
    } else {
      res.send(result(null, 500, "Error in displaying leave", false));
    }
  } catch (error) {
    next(error);
  }
};

//delete leave

export const deleteLeaveSetting = async (req, res, next) => {
  try {
    const deleteLeave = await leaveSettingModel.findByIdAndDelete(
      req.params.id
    );

    if (deleteLeave) {
      if (deleteLeave.status) {
        const employees = await userModel.find({});
        employees.forEach(async (employee) => {
          if (employee.leaveByCategory.length > 0) {
            const result = employee.leaveByCategory.filter(
              (item) => item.leaveType !== deleteLeave.leaveType
            );
            if (result.length !== employee.leaveByCategory.length) {
              await userModel.findOneAndUpdate(
                { _id: employee._id },
                {
                  $set: {
                    leaveByCategory: result,
                  },
                },
                {
                  new: true,
                }
              );
            }
          }
          let allotedLeave =
            !employee.allotedLeaves >= 0
              ? employee.allotedLeaves - deleteLeave.noOfDays
              : 0;
          let remainingLeave =
            !employee.remainingLeaves >= 0
              ? employee.remainingLeaves - deleteLeave.noOfDays
              : 0;

          allotedLeave < 0 || allotedLeave === 0
            ? (employee.allotedLeaves = 0)
            : (employee.allotedLeaves = allotedLeave);

          remainingLeave < 0 || remainingLeave === 0
            ? (employee.remainingLeaves = 0)
            : (employee.remainingLeaves = remainingLeave);
          employee.save();
        });
      }
      res.send(result(deleteLeave, 200, "Leaves deleted", true));
    } else {
      res.send(result(null, 400, "Error in deleting leave", false));
    }
  } catch (error) {
    next(error);
  }
};

//individual leave
export const getIndivisualLeaveSetting = async (req, res, next) => {
  try {
    const getindividual = await leaveSettingModel.findById(req.params.id);
    if (getindividual) {
      res.send(result(getindividual, 200, "individual leaves are shown", true));
    } else {
      res.send(result(null, 400, "Error in showing leaves", false));
    }
  } catch (error) {
    next(error);
  }
};
