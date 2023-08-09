import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotifications,
  deleteSingleNotification,
} from "../../redux/actions/activityActions";
import GetMonthDateAndTime from "../../utils/GetMonthDateAndTime";
import { changeApprovalStatus } from "../../redux/actions/employeeLeavesActions";
import { socket } from "../../utils/socketConnection";

export const SystemLogic = () => {
  const { monthFormat, timeFormat } = GetMonthDateAndTime();

  const { userInfo } = useSelector((state) => state.signInUser);
  const { data, loading } = useSelector((state) => state.getAllNotifications);
  const { data: editedData } = useSelector(
    (state) => state.changeApprovalStatus
  );
  const { data: deletedData } = useSelector(
    (state) => state.deleteSingleNotification
  );

  const dispatch = useDispatch();

  const [counter, setCounter] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortYearData, setSortYearData] = useState([]);
  const [yearsOptions, setYearOptions] = useState([]);
  const [currentYear, setCurrentYear] = useState();
  
  let PageSize = counter;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortYearData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, sortYearData]);

  function setPageOnChange() {
    setCurrentPage(1);
  }

  useEffect(() => {
    socket.on(userInfo?._id, (res) => {
      if (res.dataSent) dispatch(getAllNotifications());
    });
  });

  useEffect(() => {
    if (editedData?.success) {
      dispatch(getAllNotifications());
      socket.emit("approvalStatus", { requestTo: [editedData.data.user, editedData.data.approvedBy] });
    }
  }, [editedData]);

  useEffect(() => {
    if (deletedData?.success) {
      dispatch(getAllNotifications());
    }
  }, [deletedData]);

  let yearArr = useMemo(() => {
    let temp = [];
    if (data) {
      data &&
        data.data.forEach((item, index) => {
          !userInfo?.role?.includes("admin") && !userInfo?.role?.includes("TL")
            ? item.user._id === userInfo._id &&
              temp.push(data.data[index].createdAt.split("T")[0].split("-")[0])
            : temp.push(item.createdAt.split("T")[0].split("-")[0]);
        });
    }
    return temp;
  }, [data]);

  let dateArr = useMemo(() => {
    let temp = [];
    sortYearData.forEach((item) => {
      temp.push(item.createdAt.split("T")[0]);
    });
    return temp;
  }, [sortYearData, currentYear]);

  let uniqueDates = useMemo(() => {
    return [...new Set(dateArr)];
  }, [dateArr]);

  const yearSet = new Set(yearArr);

  useEffect(() => {
    if (data?.data) {
      setYearOptions([]);
      [...yearSet].forEach((item) => {
        setYearOptions((yearsOptions) => [
          ...yearsOptions,
          {
            value: item,
            label: item,
          },
        ]);
      });
      handleYearData(new Date().getFullYear());
    }
  }, [data]);

  useEffect(() => {
    setCounter(sortYearData?.length > 5 ? 5 : sortYearData?.length);
  }, [sortYearData]);

  //sort function
  function handleYearChange(value) {
    setCurrentPage(1);
    handleYearData(value);
  }

  function handleYearData(year) {
    setCurrentYear({ label: year.toString(), value: year.toString() });
    let sorted = [];
    data &&
      data.data.forEach((item) => {
        let loopYear = item.createdAt.split("T")[0].split("-")[0];

        if (loopYear === year.toString()) {
          sorted.push(item);
        }
      });
    setSortYearData(sorted);

    !userInfo?.role?.includes("admin") &&
      !userInfo?.role?.includes("TL") &&
      setSortYearData(
        sorted.filter((item) =>
          item.user?._id === userInfo?._id
            ? item.message === "leave approval of"
            : item.approvedBy?._id === userInfo?._id
        )
      );
  }

  function statusHandler(notificationId, id, status) {
    dispatch(changeApprovalStatus(id, status));
    dispatch(deleteSingleNotification(notificationId));
  }

  return {
    counter,
    setCounter,
    currentTableData,
    currentPage,
    PageSize,
    setCurrentPage,
    uniqueDates,
    currentYear,
    handleYearChange,
    sortYearData,
    monthFormat,
    timeFormat,
    statusHandler,
    userInfo,
    loading,
    data,
    yearsOptions,
    setPageOnChange,
  };
};
