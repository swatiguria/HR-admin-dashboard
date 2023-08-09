import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import {
  addLeaveSettings,
  showLeaveSettings,
  editLeaveSettings,
  deleteLeaveSettings,
} from "../../redux/actions/leaveSettingsAction";
import { isStringEmpty } from "../../utils/isStringEmpty";

export const LeaveSettingsLogic = () => {
  const { data, loading } = useSelector((state) => state.showLeaveSettings);
  const { data: addedData } = useSelector((state) => state.addLeaveSettings);
  const { data: editedData } = useSelector((state) => state.editLeaveSettings);
  const { data: deletedData } = useSelector(
    (state) => state.deleteLeaveSettings
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [noOfDays, setnoOfDays] = useState(0);
  const [canItBeForwarded, setCanItBeForwarded] = useState(false);
  const [forwardedDays, setForwardedDays] = useState(0);
  const [status, setStatus] = useState(false);

  const [counter, setCounter] = useState(5);
  let PageSize = counter;
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [editData, setEditData] = useState({});
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    dispatch(showLeaveSettings());
  }, [dispatch]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data && data?.data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, data]);

  useEffect(() => {
    if (currentTableData?.length === 0 && data?.data?.length > 0) {
      setCurrentPage((prev) => (prev > 0 ? prev - 1 : 1));
    }
  }, [currentTableData, counter, data]);

  useEffect(() => {
    if (data) {
      setCounter(data?.data?.length > 5 ? 5 : data?.data?.length);
    }
  }, [data]);

  const addLeaveHandler = () => {
    if (!isStringEmpty(title) && !isStringEmpty(noOfDays)) {
      setAddPopup(false);
      dispatch(
        addLeaveSettings(
          title,
          noOfDays,
          canItBeForwarded,
          canItBeForwarded === "true" ? forwardedDays : 0,
          status
        )
      );
      setTitle("");
      setnoOfDays(0);
      setCanItBeForwarded(false);
      setForwardedDays(0);
      setStatus(false);
    } else {
      SweetAlertComponent(
        "error",
        `${
          isStringEmpty(title)
            ? "Leave Type"
            : isStringEmpty(noOfDays)
            ? "No of Days"
            : ""
        } is required`
      );
    }
  };

  const editLeaveHandler = (id) => {
    if (editData) {
      setEditPopup(false);

      dispatch(
        editLeaveSettings(
          id,
          editData.leaveType,
          editData.noOfDays,
          editData.canItBeForwarded,
          editData.canItBeForwarded === "true" ||
            editData.canItBeForwarded === true
            ? editData.forwardedDays
            : 0,
          editData.status
        )
      );
    } else {
      SweetAlertComponent(
        "error",
        `${
          isStringEmpty(editData.leaveType)
            ? "Leave Type"
            : isStringEmpty(editData.noOfDays)
            ? "No of Days"
            : ""
        } is required`
      );
    }
  };

  const deleteLeaveHandler = (id) => {
    if (editData) {
      setDeletePopup(false);
      dispatch(deleteLeaveSettings(id));
    } else {
      SweetAlertComponent("error", "Something went wrong!");
    }
  };

  useEffect(() => {
    if (addedData?.success) {
      dispatch(showLeaveSettings());
      SweetAlertComponent("success", "Leave Added Successfully");
      dispatch({ type: "ADD_LEAVE_SUCCESS", payload: null });
    } else if (addedData?.success === false) {
      SweetAlertComponent("error", addedData?.message);
    }
  }, [addedData, dispatch]);

  useEffect(() => {
    if (editedData?.success) {
      dispatch(showLeaveSettings());
      SweetAlertComponent("success", "Leave Edited Successfully");
      dispatch({ type: "EDIT_LEAVE_SUCCESS", payload: null });
    } else if (editedData?.success === false) {
      SweetAlertComponent("error", editedData?.message);
    }
  }, [editedData, dispatch]);

  useEffect(() => {
    if (deletedData?.success) {
      dispatch(showLeaveSettings());
      SweetAlertComponent("success", "Leave Deleted Successfully");
      dispatch({ type: "DELETE_LEAVE_SUCCESS", payload: null });
      setCurrentPage(1);
    } else if (deletedData?.success === false) {
      SweetAlertComponent("error", deletedData?.message);
    }
  }, [deletedData, dispatch]);

  return {
    data,
    title,
    setTitle,
    noOfDays,
    setnoOfDays,
    setCanItBeForwarded,
    forwardedDays,
    setForwardedDays,
    setStatus,
    addLeaveHandler,
    editData,
    setEditData,
    editLeaveHandler,
    confirmDelete,
    setConfirmDelete,
    deletePopup,
    setDeletePopup,
    editPopup,
    setEditPopup,
    addPopup,
    setAddPopup,
    setCounter,
    counter,
    currentTableData,
    currentPage,
    PageSize,
    setCurrentPage,
    deleteLeaveHandler,
    loading,
  };
};
