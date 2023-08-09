import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import { isStringEmpty } from "../../utils/isStringEmpty";
import {
  addPolicy,
  editPolicy,
  getAllPolicy,
  deletePolicy,
} from "../../redux/actions/companyPolicyActions";
import GetMonthDateAndTime from "../../utils/GetMonthDateAndTime";

export const PolicyLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  const { data, loading } = useSelector((state) => state.getAllPolicy);
  const { data: addedData } = useSelector((state) => state.addPolicy);
  const { data: editedData } = useSelector((state) => state.editPolicy);
  const { data: deletedData } = useSelector((state) => state.deletePolicy);
  const dispatch = useDispatch();
  const { timeFormat } = GetMonthDateAndTime();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const maxSize = 2048000;

  const [counter, setCounter] = useState(5);
  let PageSize = counter;
  const [currentPage, setCurrentPage] = useState(1);

  const [isAdmin, setIsAdmin] = useState(false);

  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [editData, setEditData] = useState({});
  const [deletePopup, setDeletePopup] = useState(false);

  const [fileSize, setFileSize] = useState("");
  const [fileName, setFileName] = useState("");

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data && data.data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, data]);

  useEffect(() => {
    if (currentTableData?.length === 0 && data?.data?.length > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentTableData, counter, data]);

  useEffect(() => {
    if (data) {
      setCounter(data?.data?.length > 5 ? 5 : data?.data?.length);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getAllPolicy());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.role?.includes("admin")) {
        setIsAdmin(true);
      }
    }
  }, [userInfo]);

  const postData = () => {
    if (fileSize > maxSize) {
      SweetAlertComponent("error", "File should not be more than 2mb");
      return;
    }

    if (!isStringEmpty(title) && file) {
      const data = new FormData();
      data.append("fileUpload", file);
      data.append("fileSize", fileSize);
      data.append("title", title);
      data.append("fileName", fileName);

      dispatch(addPolicy(data));

      setAddPopup(false);
      setTitle("");
      setFile("");
      setFileName("");
      setFileSize("");
    } else {
      SweetAlertComponent(
        "error",
        `${isStringEmpty(title) ? "title" : "file"} is required`
      );
    }
  };

  const patchData = (id) => {
    if (editData.fileSize > maxSize) {
      SweetAlertComponent("error", "File should not be more than 2mb");
      return;
    }

    if (!isStringEmpty(editData.title)) {
      const data = new FormData();
      if ("fileUpload" in editData) {
        data.append("fileUpload", editData.fileUpload);
      }
      data.append("fileSize", editData.fileSize);
      data.append("title", editData.title);
      data.append("fileName", editData.fileName);

      dispatch(editPolicy(id, data));
      setEditPopup(false);
      setEditData({});
    } else {
      SweetAlertComponent("error", "Title is required");
    }
  };

  const deletePolicyHandler = (id) => {
    if (id) {
      setDeletePopup(false);
      dispatch(deletePolicy(id));
    } else {
      SweetAlertComponent("error", "Something went wrong! Try again");
    }
  };

  useEffect(() => {
    if (addedData?.success) {
      dispatch(getAllPolicy());
      SweetAlertComponent("success", "Policy Added Successfully");
      dispatch({ type: "ADD_POLICY_SUCCESS", payload: null });
    }
  }, [addedData, dispatch]);

  function filehandler(e) {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > maxSize) {
        SweetAlertComponent("error", "File should not be more than 2mb");
      } else {
        setFileSize(e.target.files[0].size);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      }
    }
  }

  function convertDate(date) {
    let formattedDate = new Date(date).toString();
    let splitDateArray = formattedDate.split(" ");

    let convertedDateTime =
      timeFormat(date) +
      " " +
      splitDateArray[2] +
      " " +
      splitDateArray[1] +
      " " +
      splitDateArray[3];

    return convertedDateTime;
  }

  useEffect(() => {
    if (deletedData?.success) {
      dispatch(getAllPolicy());
      SweetAlertComponent("success", "Policy Deleted Successfully");
      dispatch({ type: "DELETE_POLICY_SUCCESS", payload: null });
    }
  }, [deletedData, dispatch]);

  useEffect(() => {
    if (editedData?.success) {
      dispatch(getAllPolicy());
      SweetAlertComponent("success", "Policy Edited Successfully");
      dispatch({ type: "UPDATE_POLICY_SUCCESS", payload: null });
    }
  }, [editedData, dispatch]);

  return {
    isAdmin,
    data,
    title,
    setTitle,
    editData,
    setEditData,
    patchData,
    addPopup,
    setAddPopup,
    editPopup,
    setEditPopup,
    deletePopup,
    setDeletePopup,
    counter,
    setCounter,
    currentTableData,
    currentPage,
    PageSize,
    setCurrentPage,
    deletePolicyHandler,
    filehandler,
    postData,
    fileName,
    loading,
    convertDate,
  };
};
