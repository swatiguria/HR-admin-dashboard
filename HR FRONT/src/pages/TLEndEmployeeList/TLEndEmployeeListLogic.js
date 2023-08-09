import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../redux/actions/departmentActions";
import { getAllEmployees } from "../../redux/actions/employeeActions";

export const TlEmployeesLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  const { data, loading } = useSelector((state) => state.getAllEmployees);
  const { data: departments } = useSelector((state) => state.getAllDepartments);
  const { data: employees } = useSelector((state) => state.searchEmployee);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const [departmentOptions, setOptions] = useState([
    {
      value: "All",
      label: "All",
    },
  ]);
  const [counter, setCounter] = useState(5);
  let PageSize = counter;
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (departments?.data) {
      setOptions([
        {
          value: "",
          label: "All",
        },
      ]);

      departments?.data.forEach((dept) => {
        setOptions((departmentOptions) => [
          ...departmentOptions,
          {
            value: dept.departmentName,
            label: dept.departmentName,
          },
        ]);
      });
    }
  }, [departments]);

  useEffect(() => {
    if (data?.data) {
      setFilterData(
        data.data.filter((item) => item.reportsTo === userInfo?._id)
      );
    }
  }, [data, userInfo]);

  useEffect(() => {
    if (employees?.data) {
      setFilterData(employees.data);
    }
  }, [employees]);

  const filterHandler = (filterValue) => {
    if (filterValue === "") {
      setFilterData(
        data.data.filter((item) => item.reportsTo === userInfo?._id)
      );
    } else {
      let filtered =
        data &&
        data.data
          .filter((item) => item.reportsTo === userInfo?._id)
          .filter((item) => item.department === filterValue);
      setFilterData(filtered);
    }
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData && filterData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, filterData]);

  useEffect(() => {
    if (currentTableData?.length === 0 && filterData.length > 0) {
      setCurrentPage((prev) => (prev > 0 ? prev - 1 : 1));
    }
  }, [currentTableData, counter, filterData]);

  useEffect(() => {
    if (filterData) {
      setCounter(filterData?.length > 5 ? 5 : filterData?.length);
    }
  }, [filterData]);

  function setPageOnChange() {
    setCurrentPage(1);
    setCounter(5);
  }

  return {
    data,
    counter,
    setCounter,
    currentPage,
    setCurrentPage,
    currentTableData,
    PageSize,
    filterHandler,
    setPageOnChange,
    getAllDepartments,
    filterData,
    departmentOptions,
    loading,
  };
};
