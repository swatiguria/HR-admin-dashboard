import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import {
  addHoliday,
  deleteHoliday,
  showHolidays,
  editHoliday,
} from "../../redux/actions/holidayAction";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { isStringEmpty } from "../../utils/isStringEmpty";

export const HolidayLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  const { data, loading } = useSelector((state) => state.showHolidays);
  const { data: addHolidayData } = useSelector((state) => state.addHoliday);
  const { data: deleteHolidayData } = useSelector(
    (state) => state.deleteHoliday
  );
  const { data: editHolidayData } = useSelector((state) => state.editHoliday);
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [occassionValue, setOccassionValue] = useState("");
  const [occassion, setOccassion] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [specificData, setSpecificData] = useState("");
  const [specificId, setSpecificId] = useState("");
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [editData, setEditData] = useState({});
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    dispatch(showHolidays());
  }, [dispatch]);

  const [counter, setCounter] = useState(5);
  let PageSize = counter;
  const [currentPage, setCurrentPage] = useState(1);

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

  const addHolidayHandler = () => {
    if (!isStringEmpty(dateValue) && !isStringEmpty(occassionValue)) {
      setAddPopup(false);
      dispatch(addHoliday(dateValue, occassionValue));
      setDateValue("");
      setOccassionValue("");
    } else {
      SweetAlertComponent(
        "error",
        `${
          isStringEmpty(dateValue)
            ? "Date"
            : isStringEmpty(occassionValue)
            ? "Occassion"
            : ""
        } is required`
      );
    }
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.role?.includes("admin")) {
        setIsAdmin(true);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (data) {
      setCounter(data?.data?.length > 5 ? 5 : data?.data?.length);
    }
  }, [data]);

  const editHolidayHandler = (id) => {
    if (!isStringEmpty(date) && !isStringEmpty(occassion)) {
      setEditPopup(false);
      dispatch(editHoliday(id, date, occassion));
    } else {
      SweetAlertComponent(
        "error",
        `${
          isStringEmpty(date)
            ? "date"
            : isStringEmpty(occassion)
            ? "occassion"
            : ""
        } is required`
      );
    }
  };

  const deleteHolidayHandler = (id) => {
    setDeletePopup(false);
    dispatch(deleteHoliday(id));
  };

  useEffect(() => {
    if (addHolidayData?.success) {
      dispatch(showHolidays());
      SweetAlertComponent("success", "Holiday Added Successfully");
      dispatch({ type: "ADD_HOLIDAY_SUCCESS", payload: null });
    }
  }, [addHolidayData, dispatch]);

  useEffect(() => {
    if (editHolidayData?.success) {
      dispatch(showHolidays());
      SweetAlertComponent("success", "Holiday Edited Successfully");
      dispatch({ type: "EDIT_HOLIDAY_SUCCESS", payload: null });
    }
  }, [editHolidayData, dispatch]);

  useEffect(() => {
    if (deleteHolidayData?.success) {
      dispatch(showHolidays());
      SweetAlertComponent("success", "Holiday Deleted Successfully");
      dispatch({ type: "DELETE_HOLIDAY_SUCCESS", payload: null });
    }
  }, [deleteHolidayData, dispatch]);

  const downloadPdf = () => {
    const doc = new jsPDF("portrait", "px", "a4", "false");
    doc.autoTable({ html: "#my-table" });
    const columns = ["Date", "Day", "Occassion"];
    const rows = [];
    data &&
      data?.data?.forEach((item) =>
        rows.push([item.date?.split("T")[0], item.day, item.occassion])
      );
    doc.autoTable(columns, rows);
    doc.save("Holiday-List.pdf");
  };

  return {
    isAdmin,
    specificData,
    setSpecificData,
    addPopup,
    setAddPopup,
    editPopup,
    setEditPopup,
    deletePopup,
    setDeletePopup,
    addHolidayHandler,
    deleteHolidayHandler,
    editHolidayHandler,
    date,
    setDate,
    occassion,
    setOccassion,
    currentTableData,
    dateValue,
    setDateValue,
    occassionValue,
    setOccassionValue,
    editData,
    setEditData,
    specificId,
    setSpecificId,
    counter,
    setCounter,
    PageSize,
    currentPage,
    setCurrentPage,
    downloadPdf,
    loading,
    data,
  };
};
