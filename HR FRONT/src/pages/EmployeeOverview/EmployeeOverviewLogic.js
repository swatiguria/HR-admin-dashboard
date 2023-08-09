import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllEmployees,
  searchEmployee,
} from "../../redux/actions/employeeActions";
import { getAllDepartments } from "../../redux/actions/departmentActions";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import { isStringEmpty } from "../../utils/isStringEmpty";

export const EmployeeLogic = () => {
  const { data, loading } = useSelector((state) => state.getAllEmployees);
  const { data: departments } = useSelector((state) => state.getAllDepartments);
  const { userInfo } = useSelector((state) => state.signInUser);
  const { data: employees, loading: searchLoading } = useSelector(
    (state) => state.searchEmployee
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [departmentOptions, setOptions] = useState([
    {
      value: "All",
      label: "All",
    },
  ]);
  const [counter, setCounter] = useState(5);
  const [filterData, setFilterData] = useState([]);
  const [employeeID, setEmployeeID] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  let PageSize = counter;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData?.slice(firstPageIndex, lastPageIndex);
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
  }

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(getAllDepartments());
    if (!userInfo?.role?.includes("admin")) {
      navigate(`/dashboard/employee/profile/${userInfo?._id}`);
    }
  }, [dispatch, navigate, userInfo]);

  const searchHandler = () => {
    dispatch(
      searchEmployee(employeeID, name, designation === "All" ? "" : designation)
    );
  };

  useEffect(() => {
    if (isStringEmpty(employeeID) && isStringEmpty(name)) {
      searchHandler();
    }
  }, [employeeID, name]);

  useEffect(() => {
    if (departments?.data) {
      setOptions([
        {
          value: "All",
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
        return 1;
      });
    }
  }, [departments]);

  useEffect(() => {
    if (data?.data) {
      setFilterData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (employees?.data) {
      setPageOnChange();
      setFilterData(employees.data);
    } else if (employees === null) {
      setFilterData(null);
    }
  }, [employees]);

  const sortOptions = [
    {
      value: "Sort",
      label: "Sort",
    },
    {
      value: "Name",
      label: "Name",
    },
    {
      value: "Latest",
      label: "Latest",
    },
    {
      value: "Oldest",
      label: "Oldest",
    },
  ];

  const filterHandler = (filterValue) => {
    if (filterValue === "All") {
      setFilterData(data && data?.data);
    } else {
      let filtered =
        data && data?.data.filter((item) => item.department === filterValue);
      setFilterData(filtered);
    }
  };

  const sortHandler = (sortValue) => {
    if (sortValue === "Name") {
      setFilterData(
        filterData.toSorted(function (a, b) {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        })
      );
    } else if (sortValue === "Oldest") {
      setFilterData(
        filterData.toSorted(function (a, b) {
          if (a.createdAt < b.createdAt) {
            return -1;
          }
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          return 0;
        })
      );
    } else if (sortValue === "Latest") {
      setFilterData(
        filterData.toSorted(function (a, b) {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        })
      );
    } else if (sortValue === "Sort") {
      if (employeeID || name || designation !== "All") {
        if (employees === null) {
          setFilterData(null);
        } else {
          setFilterData(employees);
        }
      } else {
        setFilterData(data && data?.data);
      }
    }
  };

  function diffInHours(date2, date1) {
    let diff = (new Date(date2) - new Date(date1)) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  }

  const downloadPdf = () => {
    const doc = new jsPDF("portrait", "px", "a4", "false");
    doc.autoTable({ html: "#my-table" });
    const columns = [
      "Employee ID",
      "Name",
      "Phone no",
      "Joining Date",
      "Designation",
      "Department",
    ];
    const rows = [];
    data &&
      data?.data?.forEach((item) =>
        rows.push([
          item?.employeeID,
          item?.firstName + item?.lastName,
          item?.contact,
          item?.createdAt,
          item?.designation,
          item?.department,
        ])
      );
    doc.autoTable(columns, rows);
    doc.save("Employee-List.pdf");
  };

  return {
    data,
    departmentOptions,
    filterData,
    counter,
    setCounter,
    filterHandler,
    setPageOnChange,
    currentTableData,
    currentPage,
    PageSize,
    setCurrentPage,
    diffInHours,
    employeeID,
    setEmployeeID,
    name,
    setName,
    designation,
    setDesignation,
    searchHandler,
    sortOptions,
    sortHandler,
    downloadPdf,
    loading,
    searchLoading,
  };
};
