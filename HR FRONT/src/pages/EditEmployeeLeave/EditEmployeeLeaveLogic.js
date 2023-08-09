import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import {
  getIndivisualLeaveForEmployee,
  editLeavesForEmployee,
} from "../../redux/actions/employeeLeavesActions";
import GetMonthDateAndTime from "../../utils/GetMonthDateAndTime";
import { socket } from "../../utils/socketConnection";

const EditEmployeeLeaveLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  const { monthFormat } = GetMonthDateAndTime();

  const { data: singleData, loading } = useSelector(
    (state) => state.getIndivisualLeaveForEmployee
  );
  const { data: editedData } = useSelector(
    (state) => state.editLeavesForEmployee
  );
  const { id } = useParams();

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname;

  const [editData, setEditData] = useState("");
  const [editPopup, setEditPopup] = useState(false);
  const [editDatePopup, setEditDatePopup] = useState(false);
  const [editStatusPopup, setEditStatusPopup] = useState(false);
  const [title, setTitle] = useState("");

  const leaveDatesTitle = useRef(null);
  const leaveDates = useRef(null);
  const requestToTitle = useRef(null);
  const requestTo = useRef(null);
  const leaveStatusTitle = useRef(null);
  const leaveStatus = useRef(null);

  function singleLeaveHandler(id) {
    dispatch(getIndivisualLeaveForEmployee(id));
  }

  useEffect(() => {
    if (id) {
      singleLeaveHandler(id);
    }
  }, [id]);

  let initialData = useMemo(() => {
    return singleData && singleData.data;
  }, [singleData]);

  let startDateArr = [],
    startDate,
    endDateArr = [],
    endDate;

  const [employeeNameData, setEmployeeNameData] = useState("");
  const [appliedDateData, setAppliedDateData] = useState("");
  const [leaveDatesData, setLeaveDatesData] = useState("");
  const [noOfDaysData, setNoOfDaysData] = useState("");
  const [requestToData, setRequestToData] = useState("");
  const [requestToDataId, setRequestToDataId] = useState("");
  const [approvalStatusData, setApprovalStatusData] = useState("");
  const [reasonData, setReasonData] = useState("");
  const [leaveTypeData, setLeaveTypeData] = useState("");
  const [startDateData, setStartDateDatat] = useState("");
  const [endDateData, setEndDateDatat] = useState("");
  const [appliedDate, setAppliedDate] = useState([]);

  useEffect(() => {
    if (initialData) {
      startDateArr = initialData.dateRange.split("to")[0].split("-");
      startDate =
        startDateArr[0] +
        " " +
        monthFormat(startDateArr[1]) +
        " " +
        startDateArr[2];
      endDateArr = initialData.dateRange.split("to")[1].split("-");
      endDate =
        endDateArr[0] + " " + monthFormat(endDateArr[1]) + " " + endDateArr[2];

      setAppliedDate(initialData.createdAt.split("T")[0].split("-"));
      setEmployeeNameData(initialData.employeeName);
      setNoOfDaysData(initialData.totalNoOfDays);
      setRequestToData(initialData.approvedBy?.firstName);
      setRequestToDataId(initialData.approvedBy?._id);
      setApprovalStatusData(initialData.approvalStatus);
      setReasonData(initialData.reason);
      setAppliedDateData(initialData.createdAt.split("T")[0]);
      setLeaveDatesData(initialData.dateRange);
      setLeaveTypeData(initialData.leaveType);
      setStartDateDatat(startDate);
      setEndDateDatat(endDate);
    }
  }, [initialData]);

  let appliedMonth = "";
  if (appliedDate !== undefined) appliedMonth = monthFormat(appliedDate[1]);

  useEffect(() => {
    if (editedData?.success) {
      singleLeaveHandler(id);
      SweetAlertComponent("success", "Leave Edited Successfully");
      socket.emit("approvalStatus", {
        requestTo: [editedData.data.user, editedData.data.approvedBy],
      });
      dispatch({ type: "EDIT_LEAVES_FOR_EMPLOYEE_SUCCESS", payload: null });
    }
  }, [editedData]);

  function editDataHandler(title, data) {
    if (title === "Leave Dates") {
      startDateArr = data.split("to")[0].split("-");
      startDate =
        startDateArr[0] +
        " " +
        monthFormat(startDateArr[1]) +
        " " +
        startDateArr[2];
      endDateArr = data.split("to")[1].split("-");
      endDate =
        endDateArr[0] + " " + monthFormat(endDateArr[1]) + " " + endDateArr[2];
      setLeaveDatesData(data);
      setStartDateDatat(startDate);
      setEndDateDatat(endDate);
    } else if (title === "Request To") {
      setRequestToDataId(data);
    } else if (title === "Approval Status") {
      setApprovalStatusData(data);
    }
  }

  function showInstruction(field) {
    SweetAlertComponent(
      "info",
      `${field} is changed click update to complete the update`
    );
  }
  let remainingLeave =
    initialData &&
    initialData?.user.leaveByCategory.filter(
      (item) => item.leaveType === initialData.leaveType
    )[0]?.remainingLeaves;

  function submitHandler() {
    if (remainingLeave !== 0) {
      if (noOfDaysData > remainingLeave) {
        SweetAlertComponent(
          "error",
          `No of days allowed for ${initialData.leaveType} is ${remainingLeave} days`
        );
        setNoOfDaysData(initialData.totalNoOfDays);
      } else {
        dispatch(
          editLeavesForEmployee(
            id,
            employeeNameData,
            leaveTypeData,
            leaveDatesData,
            noOfDaysData,
            reasonData,
            requestToDataId,
            approvalStatusData
          )
        );
      }
    } else {
      SweetAlertComponent("error", "No Leaves Remaining");
    }
  }

  return {
    editPopup,
    setEditPopup,
    editDatePopup,
    setEditDatePopup,
    editStatusPopup,
    setEditStatusPopup,
    title,
    setTitle,
    editData,
    setEditData,
    leaveDates,
    leaveDatesTitle,
    requestTo,
    requestToTitle,
    leaveStatus,
    leaveStatusTitle,
    employeeNameData,
    noOfDaysData,
    requestToData,
    approvalStatusData,
    reasonData,
    appliedDateData,
    editDataHandler,
    submitHandler,
    path,
    id,
    startDateData,
    endDateData,
    appliedDate,
    appliedMonth,
    setNoOfDaysData,
    singleLeaveHandler,
    loading,
    initialData,
    singleData,
    showInstruction,
    requestToDataId,
    setRequestToData,
    userInfo,
  };
};

export default EditEmployeeLeaveLogic;
