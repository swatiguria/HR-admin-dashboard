import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEmployeeLeaves } from "../../../redux/actions/employeeLeavesActions";
import { socket } from "../../../utils/socketConnection";

export const EmployeeLeavesLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  const { data: employeeLeaves, loading } = useSelector(
    (state) => state.getSingleEmployeeLeaves
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleEmployeeLeaves(userInfo?._id));
  }, [dispatch, userInfo]);

  const [counter, setCounter] = useState(1);
  const [leaveId, setLeaveId] = useState("");
  let PageSize = counter;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return (
      employeeLeaves &&
      employeeLeaves?.data.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, PageSize, employeeLeaves]);

  useEffect(() => {
    if (currentTableData?.length === 0 && employeeLeaves?.data?.length > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentTableData, counter, employeeLeaves]);

  useEffect(() => {
    if (employeeLeaves?.data.length > 1) {
      setCounter(
        employeeLeaves?.data?.length > 5 ? 5 : employeeLeaves?.data?.length
      );
    }
  }, [employeeLeaves]);

  useEffect(() => {
    socket.on(userInfo?._id, (res) => {
      if (res.dataSent) dispatch(getSingleEmployeeLeaves(userInfo?._id));
    });
  });

  function setPageOnChange() {
    setCurrentPage(1);
    setCounter(5);
  }

  return {
    employeeLeaves,
    counter,
    setCounter,
    currentPage,
    setCurrentPage,
    currentTableData,
    PageSize,
    setPageOnChange,
    loading,
    setLeaveId,
    leaveId,
  };
};
