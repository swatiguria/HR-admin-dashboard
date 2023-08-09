import { combineReducers } from "redux";
import {
  signInUserReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  ResetPasswordOnLoginReducer,
  logOutReducer,
  tokenValidationReducer,
} from "./userReducers";

import {
  addDepartmentReducer,
  getAllDepartmentsReducer,
  editDepartmentReducer,
  deleteDepartmentReducer,
  transferEmployeesReducer,
} from "./departmentReducers";

import {
  addEmployeeReducer,
  getAllEmployeesReducer,
  getSingleEmployeeReducer,
  editEmployeeReducer,
  searchEmployeeReducer,
  getEmployeeByDepartmentReducer,
  promoteToAdminReducer,
} from "./employeeReducers";

import {
  addHolidayReducer,
  showHolidaysReducer,
  editHolidayReducer,
  deleteHolidayReducer,
} from "./holidayReducers";

import {
  addPolicyReducer,
  getAllPolicyReducer,
  editPolicyReducer,
  deletePolicyReducer,
} from "./companyPolicyReducers";

import {
  addLeavesForEmployeeReducer,
  deleteLeavesForEmployeeReducer,
  getAllLeavesForEmployeeReducer,
  getIndivisualLeaveForEmployeeReducer,
  editLeavesForEmployeeReducer,
  getSingleEmployeeLeavesReducer,
  getAllEmployeeLeavesReducer,
  changeApprovalStatusReducer,
} from "./employeeLeavesReducers";

import {
  addLeaveSettingsReducer,
  editLeaveSettingsReducer,
  showLeaveSettingsReducer,
  deleteLeaveSettingsReducer,
} from "./leaveSettingsReducers";

import { getMessageReducer } from "./chatReducers";
import {
  getAllNotificationsReducer,
  getSingleNotificationReducer,
  deleteSingleNotificationReducer,
  markSingleNotificationAsReadReducer,
  markAllNotificationAsReadReducer,
} from "./activityReducers";

const rootReducer = combineReducers({
  signInUser: signInUserReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  resetPasswordOnLogin: ResetPasswordOnLoginReducer,
  tokenValidation: tokenValidationReducer,
  logOut: logOutReducer,

  addDepartment: addDepartmentReducer,
  getAllDepartments: getAllDepartmentsReducer,
  editDepartment: editDepartmentReducer,
  deleteDepartment: deleteDepartmentReducer,
  transferEmployees: transferEmployeesReducer,

  addEmployee: addEmployeeReducer,
  getAllEmployees: getAllEmployeesReducer,
  getSingleEmployee: getSingleEmployeeReducer,
  editEmployee: editEmployeeReducer,
  searchEmployee: searchEmployeeReducer,
  getEmployeeByDepartment: getEmployeeByDepartmentReducer,
  promoteToAdmin: promoteToAdminReducer,

  addHoliday: addHolidayReducer,
  showHolidays: showHolidaysReducer,
  editHoliday: editHolidayReducer,
  deleteHoliday: deleteHolidayReducer,

  addPolicy: addPolicyReducer,
  getAllPolicy: getAllPolicyReducer,
  editPolicy: editPolicyReducer,
  deletePolicy: deletePolicyReducer,

  addLeavesForEmployee: addLeavesForEmployeeReducer,
  deleteLeavesForEmployee: deleteLeavesForEmployeeReducer,
  getAllLeavesForEmployee: getAllLeavesForEmployeeReducer,
  getIndivisualLeaveForEmployee: getIndivisualLeaveForEmployeeReducer,
  editLeavesForEmployee: editLeavesForEmployeeReducer,
  getSingleEmployeeLeaves: getSingleEmployeeLeavesReducer,
  getAllEmployeeLeaves: getAllEmployeeLeavesReducer,
  changeApprovalStatus: changeApprovalStatusReducer,

  getMessage: getMessageReducer,

  addLeaveSettings: addLeaveSettingsReducer,
  editLeaveSettings: editLeaveSettingsReducer,
  showLeaveSettings: showLeaveSettingsReducer,
  deleteLeaveSettings: deleteLeaveSettingsReducer,

  getAllNotifications: getAllNotificationsReducer,
  getSingleNotification: getSingleNotificationReducer,
  deleteSingleNotification: deleteSingleNotificationReducer,
  markSingleNotificationAsRead: markSingleNotificationAsReadReducer,
  markAllNotificationAsRead: markAllNotificationAsReadReducer,
});

export default rootReducer;
