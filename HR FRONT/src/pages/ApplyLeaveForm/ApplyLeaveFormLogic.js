import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import { addLeavesForEmployee } from "../../redux/actions/employeeLeavesActions";
import {
  getSingleEmployee,
  getAllEmployees,
} from "../../redux/actions/employeeActions";
import { showLeaveSettings } from "../../redux/actions/leaveSettingsAction";
import { useNavigate } from "react-router-dom";
import { isStringEmpty } from "../../utils/isStringEmpty";
import { socket } from "../../utils/socketConnection";

export const ApplyLeaveFormLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  const { data: employee } = useSelector((state) => state.getSingleEmployee);
  const { data: added, error } = useSelector(
    (state) => state.addLeavesForEmployee
  );
  const { data: leaves } = useSelector((state) => state.showLeaveSettings);
  const { data: employees } = useSelector((state) => state.getAllEmployees);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [apllyLeaveType, setApplyLeaveType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [reason, setReason] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [approvedByLabel, setApprovedByLabel] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [allotedLeaves, setAllotedLeaves] = useState("");
  const [remainingLeaves, setRemainingLeaves] = useState("");
  const [managerOptions, setManagerOptions] = useState([]);
  const [leaveOptions, setOptions] = useState([
    {
      value: "",
      label: "All",
    },
  ]);

  useEffect(() => {
    if (employees?.data) {
      setManagerOptions([]);
      employees?.data.forEach((val) => {
        setManagerOptions((managerOptions) => [
          ...managerOptions,
          {
            value: val?._id,
            label: val.firstName,
          },
        ]);
      });
    }
  }, [employees]);

  useEffect(() => {
    dispatch(getSingleEmployee(userInfo?._id));
  }, [userInfo, dispatch]);

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(showLeaveSettings());
  }, [dispatch]);

  function handleLeaveType(leaveType) {
    if (leaveType === "") {
      setAllotedLeaves(employee.data.allotedLeaves);
      setRemainingLeaves(employee.data.remainingLeaves);
    } else {
      employee &&
        employee?.data?.leaveByCategory.forEach((item) => {
          if (item.leaveType === leaveType) {
            setAllotedLeaves(item.allotedLeaves);
            setRemainingLeaves(item.remainingLeaves);
          }
        });
    }
  }

  useEffect(() => {
    if (leaves?.data) {
      setOptions([
        {
          value: "",
          label: "All",
        },
      ]);
      leaves?.data.forEach((item) => {
        if (item.status) {
          setOptions((leaveOptions) => [
            ...leaveOptions,
            {
              value: item.leaveType,
              label: item.leaveType,
            },
          ]);
        }
      });
    }
  }, [leaves]);

  useEffect(() => {
    if (employee) {
      handleLeaveType("");
      setApprovedBy(employee);
    }
  }, [employee]);

  useEffect(() => {
    if (error) SweetAlertComponent("error", error?.message);
  }, [error]);

  const addLeaveHandeler = () => {
    if (apllyLeaveType === "") {
      SweetAlertComponent("error", "Select Valid Leave Type");
      return;
    }
    if (remainingLeaves !== 0) {
      if (numberOfDays > remainingLeaves) {
        SweetAlertComponent(
          "error",
          `No of days allowed for ${apllyLeaveType} is ${remainingLeaves} days`
        );
      } else {
        if (
          !isStringEmpty(apllyLeaveType) &&
          !isStringEmpty(dateRange) &&
          !isStringEmpty(reason) &&
          !isStringEmpty(approvedBy)
        ) {
          dispatch(
            addLeavesForEmployee(
              employee &&
                employee.data.firstName + " " + employee.data.lastName,
              apllyLeaveType,
              dateRange,
              userInfo?._id,
              numberOfDays,
              reason,
              approvedBy,
              isHalfDay
            )
          );
        } else {
          SweetAlertComponent(
            "error",
            `${
              isStringEmpty(apllyLeaveType)
                ? "Leave type"
                : isStringEmpty(dateRange)
                ? "Date range"
                : isStringEmpty(reason)
                ? "Reason"
                : isStringEmpty(approvedBy)
                ? "Request to"
                : ""
            } is required`
          );
        }
      }
    } else {
      SweetAlertComponent("error", "No Leaves Remaining");
    }
  };

  useEffect(() => {
    if (employee?.data) {
      setApprovedByLabel(employee?.data.reportsTo.firstName);
      setApprovedBy(employee?.data.reportsTo._id);
    }
  }, [employee]);

  useEffect(() => {
    if (added?.success) {
      userInfo?.role.includes("admin")
        ? navigate("/dashboard/employee/my-leaves")
        : navigate("/dashboard/employee/leaves");
      socket.emit("leave_applied", {
        requestTo: added?.data?.approvedBy,
      });
      setApplyLeaveType("");
      setDateRange("");
      setIsHalfDay("");
      setReason("");
      SweetAlertComponent("success", added.message);
      dispatch({ type: "ADD_LEAVES_FOR_EMPLOYEE_SUCCESS", payload: null });
    } else if (added?.success === false) {
      SweetAlertComponent("error", added.message);
    }
  }, [added, dispatch, navigate, userInfo]);

  return {
    dateRange,
    setDateRange,
    setIsHalfDay,
    numberOfDays,
    setNumberOfDays,
    setReason,
    setApprovedBy,
    addLeaveHandeler,
    allotedLeaves,
    remainingLeaves,
    setApplyLeaveType,
    leaveOptions,
    handleLeaveType,
    approvedBy,
    managerOptions,
    setApprovedByLabel,
    approvedByLabel,
  };
};
