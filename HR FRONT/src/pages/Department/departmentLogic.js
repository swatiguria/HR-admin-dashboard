import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import {
  addDepartment,
  getAllDepartments,
  editDepartment,
  deleteDepartment,
  transferEmployees,
} from "../../redux/actions/departmentActions";
import { getEmployeeByDepartment } from "../../redux/actions/employeeActions";
import { isStringEmpty } from "../../utils/isStringEmpty";

export const DepartmentLogic = () => {
  const { data, loading } = useSelector((state) => state.getAllDepartments);
  const { data: addedData } = useSelector((state) => state.addDepartment);
  const { data: editedData } = useSelector((state) => state.editDepartment);
  const { data: deletedData } = useSelector((state) => state.deleteDepartment);
  const { data: transferred } = useSelector((state) => state.transferEmployees);
  const { data: employees } = useSelector(
    (state) => state.getEmployeeByDepartment
  );

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [counter, setCounter] = useState(5);
  let PageSize = counter;
  const [currentPage, setCurrentPage] = useState(1);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [editData, setEditData] = useState({});
  const [deletePopup, setDeletePopup] = useState(false);

  const [departmentName, setdepartmentName] = useState("");
  const [employeesIds, setEmployeesIds] = useState([]);

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data && data.data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, data]);

  useEffect(() => {
    if (currentTableData?.length === 0 && data?.data?.length > 0) {
      setCurrentPage((prev) => (prev > 0 ? prev - 1 : 1));
    }
  }, [currentTableData, counter, data?.data?.length]);

  useEffect(() => {
    if (data) {
      setCounter(data?.data?.length > 5 ? 5 : data?.data?.length);
    }
  }, [data, data?.data?.length]);

  const openTransferEmployeesPopup = (val) => {
    setDeletePopup(true);
    setEditData(val);
    dispatch(getEmployeeByDepartment(val.departmentName));
  };

  const addDepartmentHandler = () => {
    if (!isStringEmpty(title) && !isStringEmpty(desc)) {
      setAddPopup(false);
      dispatch(addDepartment(title, desc));
      setTitle("");
      setDesc("");
    } else {
      SweetAlertComponent(
        "error",
        `${
          isStringEmpty(title)
            ? "title"
            : isStringEmpty(desc)
            ? "description"
            : ""
        } is required`
      );
    }
  };

  const editDepartmentHandler = (id) => {
    if (
      !isStringEmpty(editData.departmentName) &&
      !isStringEmpty(editData.departmentDescription)
    ) {
      setEditPopup(false);
      dispatch(
        editDepartment(
          id,
          editData.departmentName,
          editData.departmentDescription
        )
      );
    } else {
      SweetAlertComponent(
        "error",
        `${
          isStringEmpty(editData.departmentName)
            ? "title"
            : isStringEmpty(editData.departmentDescription)
            ? "description"
            : ""
        } is required`
      );
    }
  };

  const handleClick = (val) => {
    setdepartmentName(val);
  };

  const selectAllEmployee = () => {
    if (employeesIds.length !== employees?.data.length) {
      const allEmployeeSelected = employees?.data.map((item) => item?._id);
      setEmployeesIds(allEmployeeSelected);
    } else {
      setEmployeesIds([]);
    }
  };

  const pushEmployeeIds = (id) => {
    if (employeesIds.length > 0) {
      if (employeesIds.includes(id)) {
        setEmployeesIds((current) =>
          current.filter((employeeId) => employeeId !== id)
        );
      } else {
        setEmployeesIds([...employeesIds, id]);
      }
    } else {
      setEmployeesIds([...employeesIds, id]);
    }
  };

  const openConfirmPopup = () => {
    if (employees?.data?.length === 0) {
      setDeletePopup(false);
      setConfirmDelete(true);
    } else {
      dispatch(transferEmployees(employeesIds, departmentName));
      setdepartmentName("");
      setEmployeesIds([]);
    }
  };

  const deleteDepartmentHandler = (id) => {
    setConfirmDelete(false);
    dispatch(deleteDepartment(id));
  };

  useEffect(() => {
    if (addedData?.success) {
      dispatch(getAllDepartments());
      SweetAlertComponent("success", "Department Added Successfully");
      dispatch({ type: "ADD_DEPARTMENT_SUCCESS", payload: null });
    }
  }, [addedData, dispatch]);

  useEffect(() => {
    if (editedData?.success) {
      dispatch(getAllDepartments());
      SweetAlertComponent("success", "Department Edited Successfully");
      dispatch({ type: "UPDATE_DEPARTMENT_SUCCESS", payload: null });
    }
  }, [editedData, dispatch]);

  useEffect(() => {
    if (transferred?.success) {
      dispatch(getEmployeeByDepartment(editData.departmentName));
      SweetAlertComponent("success", "Employees Transferred Successfully");
      dispatch({ type: "TRANSFER_EMPLOYEES_SUCCESS", payload: null });
    }
  }, [transferred, dispatch, editData]);

  useEffect(() => {
    if (deletedData?.success) {
      dispatch(getAllDepartments());
      SweetAlertComponent("success", "Department Deleted Successfully");
      dispatch({ type: "DELETE_DEPARTMENT_SUCCESS", payload: null });
      setCurrentPage(1);
    }
  }, [deletedData, dispatch]);

  return {
    data,
    title,
    setTitle,
    desc,
    setDesc,
    addDepartmentHandler,
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
    editData,
    setEditData,
    currentPage,
    PageSize,
    setCurrentPage,
    editDepartmentHandler,
    deleteDepartmentHandler,
    employees,
    openTransferEmployeesPopup,
    departmentName,
    employeesIds,
    openConfirmPopup,
    pushEmployeeIds,
    selectAllEmployee,
    handleClick,
    loading,
  };
};
