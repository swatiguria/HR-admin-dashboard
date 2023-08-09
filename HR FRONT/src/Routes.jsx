import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import ResetPassword from "./pages/resetPassword/resetPassword";
import EmployeeProfile from "./pages/EmployeeProfile/EmployeeProfile";
import Department from "./pages/Department/department";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import EmployeeOverview from "./pages/EmployeeOverview/EmployeeOverview";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import Holiday from "./pages/Holiday/holiday";
import TlEmployees from "./pages/TLEndEmployeeList/TLEndEmployeeList";
import CompanyPolicy from "./pages/CompanyPolicy/CompanyPolicy";
import LeavesPage from "./pages/LeavePage/LeavesPage"
import ApplyLeaveForm from "./pages/ApplyLeaveForm/ApplyLeaveForm"
import EditEmployeeLeave from "./pages/EditEmployeeLeave/EditEmployeeLeave"
import LeavesSettings from "./pages/LeavesSettings/LeavesSettings"
import EmployeeLeaves from "./components/leaves/LeavesEmployeeEnd/leavesEmployeeEnd";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SystemLog from "./pages/SystemLog/systemLog";
import { useSelector } from "react-redux";

const Router = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  return (
    <BrowserRouter>
      <Routes>

        <Route
          exact
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          exact
          path="/dashboard/employee"
          element={<Navigate to="/dashboard/employee/overview" />}
        />
        {
          userInfo?.role?.includes("admin") ?
            <Route
              exact
              path="/dashboard/settings"
              element={<Navigate to="/dashboard/settings/department" />}
            />
            :
            <Route
              exact
              path="/dashboard/settings"
              element={<Navigate to="/dashboard/settings/company-policies" />}
            />
        }
        <Route exact path="/login" element={<Login />} />

        <Route exact path="/forget-password" element={<ForgetPassword />} />

        <Route exact path="/reset-password/:id/:token" element={<ResetPassword />} />

        <Route exact path="/dashboard/activity/system-logs" element={<SystemLog />} />
        <Route
          exact
          path="/dashboard/settings/department"
          element={<Department />}
        />

        <Route
          exact
          path="/dashboard/employee/holidays"
          element={<Holiday />}
        />

        <Route
          exact
          path="/dashboard/employee/overview"
          element={<EmployeeOverview />}
        />

        <Route
          exact
          path="/dashboard/employee/add-employee"
          element={<AddEmployee />}
        />

        <Route
          exact
          path="/dashboard/employee/profile/:id"
          element={<EmployeeProfile />}
        />

        <Route
          exact
          path="/dashboard/employee/list"
          element={<TlEmployees />}
        />

        <Route
          exact
          path="/dashboard/settings/company-settings"
          element={<CompanyPolicy />}
        />

        <Route
          exact
          path="/dashboard/settings/company-policies"
          element={<CompanyPolicy />}
        />

        <Route
          exact
          path="/dashboard/employee/leaves"
          element={<LeavesPage />}
        />
        <Route
          exact
          path="/dashboard/employee/my-leaves"
          element={<EmployeeLeaves />}
        />

        <Route
          exact
          path="/dashboard/employee/apply-leave"
          element={<ApplyLeaveForm />}
        />

        <Route
          exact
          path="/dashboard/employee/edit-leave/:id"
          element={<EditEmployeeLeave />}
        />

        <Route
          exact
          path="/dashboard/employee/leaves-settings"
          element={<LeavesSettings />}
        />

        <Route
          exact
          path="*"
          element={<ErrorPage />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default Router;
