import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertComponent from "../../SweetAlertComponent/SweetAlertComponent";
import {
  deleteLeavesForEmployee,
  getAllLeavesForEmployee,
} from "../../../redux/actions/employeeLeavesActions";
import { getSingleEmployee } from "../../../redux/actions/employeeActions";
import { socket } from "../../../utils/socketConnection";

const LeavesLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  const { data, loading } = useSelector(
    (state) => state.getAllLeavesForEmployee
  );
  const { data: deletedData } = useSelector(
    (state) => state.deleteLeavesForEmployee
  );

  const { data: employee } = useSelector((state) => state.getSingleEmployee);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) dispatch(getSingleEmployee(userInfo?._id));
  }, [userInfo, dispatch]);

  useEffect(() => {
    dispatch(getAllLeavesForEmployee());
  }, [dispatch]);

  const [counter, setCounter] = useState(5);
  const [sortPopup, setSortPopup] = useState(false);
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [leaveId, setLeaveId] = useState("");

  const [sortedData, setSortedData] = useState([]);

  // pagination
  let PageSize = counter;

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, sortedData]);

  useEffect(() => {
    if (sortedData) {
      setCounter(sortedData?.length > 5 ? 5 : sortedData?.length);
    }
  }, [sortedData]);

  useEffect(() => {
    if (currentTableData?.length === 0 && sortedData.length > 0) {
      setCurrentPage((prev) => (prev > 0 ? prev - 1 : 1));
    }
  }, [currentTableData, sortedData, counter]);

  function setPageOnChange() {
    setCurrentPage(1);
  }

  useEffect(() => {
    socket.on(userInfo?._id, (res) => {
      if (res.dataSent) dispatch(getAllLeavesForEmployee());
    });
  });

  useEffect(() => {
    if (data?.data) {
      setSortedData(data.data);
    }
  }, [data]);

  function deleteLeaveHandler(id) {
    setShowDeletePopup(false);
    dispatch(deleteLeavesForEmployee(id));
  }
  useEffect(() => {
    if (deletedData?.success) {
      SweetAlertComponent("success", "Leave Deleted Successfully");
      dispatch(getAllLeavesForEmployee());

      dispatch({ type: "DELETE_LEAVES_FOR_EMPLOYEE_SUCCESS", payload: null });
    }
  }, [deletedData, dispatch]);

  const sortOptions = [
    {
      value: "Sort",
      label: "Sort",
    },
    { label: "Newest Applied", value: "newest" },
    { label: "Oldest Applied", value: "oldest" },
    { label: "A-Z", value: "nameAz" },
    { label: "Z-A", value: "nameZa" },
  ];

  const sortHandler = (sortValue) => {
    if (sortValue === "newest") {
      setSortedData(
        sortedData.toSorted(function (a, b) {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        })
      );
    } else if (sortValue === "oldest") {
      setSortedData(
        sortedData.toSorted(function (a, b) {
          if (a.createdAt < b.createdAt) {
            return -1;
          }
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          return 0;
        })
      );
    } else if (sortValue === "nameAz") {
      setSortedData(
        sortedData.toSorted(function (a, b) {
          if (a.employeeName < b.employeeName) {
            return -1;
          }
          if (a.employeeName > b.employeeName) {
            return 1;
          }
          return 0;
        })
      );
    } else if (sortValue === "nameZa") {
      setSortedData(
        sortedData.toSorted(function (a, b) {
          if (a.employeeName > b.employeeName) {
            return -1;
          }
          if (a.employeeName < b.employeeName) {
            return 1;
          }
          return 0;
        })
      );
    } else if (sortValue === "Sort") {
      setSortedData(data && data?.data);
    }
  };

  return {
    data,
    counter,
    setCounter,
    sortPopup,
    setSortPopup,
    currentPage,
    setCurrentPage,
    currentTableData,
    PageSize,
    sortHandler,
    sortedData,
    deleteLeaveHandler,
    showLeavePopup,
    setShowLeavePopup,
    loading,
    sortOptions,
    setPageOnChange,
    employee,
    setLeaveId,
    leaveId,
    setShowDeletePopup,
    showDeletePopup,
    setDeleteId,
    deleteId,
  };
};

export default LeavesLogic;
