import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import {
  getAllNotifications,
  deleteSingleNotification,
  markSingleNotificationAsRead,
  markAllNotificationAsRead,
} from "../../redux/actions/activityActions";
import { socket } from "../../utils/socketConnection";
import GetMonthDateAndTime from "../../utils/GetMonthDateAndTime";
import { changeApprovalStatus } from "../../redux/actions/employeeLeavesActions";

export const NavBarLogic = () => {
  const { timeFormat } = GetMonthDateAndTime();

  const { userInfo } = useSelector((state) => state.signInUser);
  const { data, loading } = useSelector((state) => state.getAllNotifications);
  const { data: singleNotification } = useSelector(
    (state) => state.markSingleNotificationAsRead
  );
  const { data: editedData } = useSelector(
    (state) => state.changeApprovalStatus
  );
  const { data: allNotificationsAsRead } = useSelector(
    (state) => state.markAllNotificationAsRead
  );
  const { data: deletedData } = useSelector(
    (state) => state.deleteSingleNotification
  );

  const dispatch = useDispatch();

  const [logOutPopUp, setLogOutPopUp] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [activeTab, setActiveTab] = useState(1);

  const refProfileIcon = useRef(null);
  const refNotifIcon = useRef(null);
  const refTabs = useRef(null);
  const refReadBtn = useRef(null);

  const notificationData = useMemo(() => {
    let tempData = null;
    if (data)
      tempData = data?.data.filter((item) =>
        item.user?._id === userInfo?._id
          ? item.message === "leave approval of"
          : item.approvedBy?._id === userInfo?._id
      );

    return tempData;
  }, [data, userInfo?._id]);

  const handleTab = (val) => {
    setActiveTab(val);
  };

  const toggleshowNotification = () => {
    setShowNotification(!showNotification);
  };

  const toggleshowProfile = () => {
    setShowProfile(!showProfile);
  };
  const navigate = useNavigate();

  const logOutHandler = () => {
    setLogOutPopUp(false);
    dispatch(logoutUser());
  };

  const deleteNotificationHandler = (id) => {
    dispatch(deleteSingleNotification(id));
  };

  const markAsRead = (id) => {
    dispatch(markSingleNotificationAsRead(id));
  };

  const markAllAsRead = (id) => {
    dispatch(markAllNotificationAsRead());
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (deletedData?.success) {
      dispatch(getAllNotifications());
    }
  }, [deletedData, dispatch]);

  useEffect(() => {
    if (singleNotification?.success) {
      dispatch(getAllNotifications());
      dispatch({ type: "MARK_SINGLE_AS_READ_SUCCESS", payload: null });
    }
  }, [singleNotification, dispatch]);

  useEffect(() => {
    if (allNotificationsAsRead?.success) {
      dispatch(getAllNotifications());
    }
  }, [allNotificationsAsRead, dispatch]);

  useEffect(() => {
    if (editedData?.success) {
      dispatch(getAllNotifications());
      socket.emit("approvalStatus", {
        requestTo: [editedData.data.user, editedData.data.approvedBy],
      });
    }
  }, [editedData, dispatch]);

  const hideOnClickOutside = (e) => {
    if (refProfileIcon.current && !refProfileIcon.current.contains(e.target)) {
      setShowProfile(false);
    }
  };

  const hideNotificationOnClickOutside = (e) => {
    if (
      refNotifIcon.current &&
      refTabs.current &&
      !refNotifIcon.current.contains(e.target) &&
      !refTabs.current.contains(e.target) &&
      !refReadBtn.current?.contains(e.target)
    ) {
      setShowNotification(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside);
    document.addEventListener("click", hideNotificationOnClickOutside);
  }, []);

  useEffect(() => {
    socket.on(userInfo?._id, (res) => {
      if (res.dataSent) {
        dispatch(getAllNotifications());
      }
    });
  }, [dispatch, userInfo]);

  function statusHandler(notificationId, id, status) {
    dispatch(changeApprovalStatus(id, status));
    deleteNotificationHandler(notificationId);
  }

  return {
    refProfileIcon,
    userInfo,
    logOutPopUp,
    setLogOutPopUp,
    logOutHandler,
    toggleshowNotification,
    toggleshowProfile,
    showProfile,
    showNotification,
    refNotifIcon,
    notificationData,
    activeTab,
    handleTab,
    refTabs,
    deleteNotificationHandler,
    markAsRead,
    markAllAsRead,
    timeFormat,
    statusHandler,
    loading,
    refReadBtn,
  };
};
