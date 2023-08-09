import React from "react";
import notification_icon from "../../assets/navBar/notification.svg";
import "./styles.scss";
import { Link } from "react-router-dom";
import { NavBarLogic } from "./navbarlogic";
import LogOut from "../popUp/LogOutComponent/LogOutComponent";
import NotificationTab from "../NotificationTab/NotificationTab";
import CircularProgress from '@mui/material/CircularProgress';

const NavBar = ({ heading }) => {
  const {
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
    timeFormat,
    statusHandler,
    loading,
    markAllAsRead,
    refReadBtn
  } = NavBarLogic();


  return (
    <div className="navbar-container relative w-full pt-2">
      {logOutPopUp && (
        <LogOut
          setLogOutPopUp={setLogOutPopUp}
          logOutHandler={logOutHandler}
          logOutPopUp={logOutPopUp}
        />
      )}
      <div className="flex justify-between items-center py-3 navbar  text-sm">
        <h2 className="navHeading font-bold text-2xl md:text-4xl ml-10 md:ml-5">
          {heading}
        </h2>

        <div className="flex gap-x-3 md:gap-x-10 p-2 min-h-fit relative">
          <img
            src={notification_icon}
            alt="notification"
            className="notification_icon px-3 py-2  rounded-full"
            onClick={toggleshowNotification}
            ref={refNotifIcon}
          />
          {
            notificationData && notificationData?.filter(item => !item.read).length > 0 &&
            <div className="bg-red-600 text-white absolute rounded-full h-5 w-5 z-25 left-10 text-center">{notificationData?.filter(item => !item.read).length}</div>
          }

          <div className="h-[2.5rem] " ref={refProfileIcon}>
            <img
              src={userInfo && userInfo?.photo}
              className="w-[2.5rem] h-[2.5rem] sm:w-[2.5rem] object-cover rounded-full"
              alt="profile"
              onClick={toggleshowProfile}
            />
          </div>
        </div>
      </div>
      {showProfile && (
        <div className=" absolute profile-popup  rounded-xl text-sm">
          <div className="p-3 pl-4 rounded-t-xl font-bold text-blue-800">
            Hi {userInfo && userInfo?.firstName} !
          </div>

          {userInfo && (
            <Link
              to={`/dashboard/employee/profile/${userInfo?._id}`}
              className="font-bold  p-4 profile_list"
            >
              My Profile
            </Link>
          )}

          <div
            className=" font-bold p-4 rounded-b-xl cursor-pointer profile_list"
            onClick={() => {
              setLogOutPopUp(true);
            }}
          >
            Log Out
          </div>
        </div>
      )}

      {showNotification && (
        <div
          className={`absolute notification-popup py-7 rounded-xl text-sm  h-[60vh] overflow
        ${userInfo?.role?.includes("admin") && userInfo?.role?.includes("TL")
              ? "w-[25rem]"
              : "w-[23rem]"
            }`}
        >
          <div className="py-3 px-7 flex items-center justify-between">
            <h2 className="font-semibold md:text-xl pb-3 text-[#474E77]">
              Notifications
            </h2>
            {
              notificationData?.filter(item => !item.read).length > 0 &&
              <button className="font-semibold md:text-sm pb-3 highlighted-text"
                ref={refReadBtn}
                onClick={() => {
                  markAllAsRead()
                }}>
                Mark all as read
              </button>
            }

          </div>

          <div className="tabs h-[80%] overflow-auto" ref={refTabs}>
            <div className="tab-link flex px-2  sticky top-0 bg-white">
              <div
                onClick={() => handleTab(1)}
                className={`w-full text-center tab text-[#474E77] cursor-pointer ${activeTab === 1 ? "active-tab" : "opacity-30 "
                  }`}
              >
                All
              </div>
              <div
                onClick={() => handleTab(2)}
                className={`w-full text-center tab text-[#474E77] cursor-pointer ${activeTab === 2 ? "active-tab" : "opacity-30 "
                  }`}
              >
                Employees
              </div>
              {userInfo?.role?.includes("admin") &&
                userInfo?.role?.includes("TL") && (
                  <div
                    onClick={() => handleTab(3)}
                    className={`w-full text-center tab text-[#474E77] cursor-pointer ${activeTab === 3 ? "active-tab" : "opacity-30 "
                      }`}
                  >
                    Team Leaders
                  </div>
                )}
            </div>
            <div>
              <hr className="w-full" />
            </div>
            {
              loading ?
                <div className="flex justify-center w-full h-full items-center">
                  <CircularProgress color="secondary" className="m-auto" />
                </div>
                :

                <div className="px-2">
                  <div className="overflow-auto">
                    {activeTab === 1
                      ? notificationData &&
                      notificationData.map((notification, index) => {
                        return (
                          <NotificationTab
                            notification={notification}
                            index={index}
                            markAsRead={markAsRead}
                            deleteNotificationHandler={deleteNotificationHandler}
                            timeFormat={timeFormat}
                            statusHandler={statusHandler}
                            key={index}
                            toggleshowNotification={toggleshowNotification}
                          />
                        );
                      })
                      : activeTab === 2
                        ? notificationData &&
                        notificationData
                          ?.filter(
                            (item) =>
                              !item.user.role.includes("admin") &&
                              !item.user.role.includes("TL")
                          )
                          .map((notification, index) => {
                            return (
                              <NotificationTab
                                notification={notification}
                                index={index}
                                markAsRead={markAsRead}
                                deleteNotificationHandler={deleteNotificationHandler}
                                timeFormat={timeFormat}
                                statusHandler={statusHandler}
                                key={index}
                                toggleshowNotification={toggleshowNotification}
                              />
                            );
                          })
                        : userInfo?.role?.includes("admin") &&
                        userInfo?.role?.includes("TL") &&
                        notificationData &&
                        notificationData
                          .filter((item) => item.user.role.includes("TL"))
                          .map((notification, index) => {
                            return (
                              <NotificationTab
                                notification={notification}
                                index={index}
                                markAsRead={markAsRead}
                                deleteNotificationHandler={deleteNotificationHandler}
                                timeFormat={timeFormat}
                                statusHandler={statusHandler}
                                key={index}
                                toggleshowNotification={toggleshowNotification}
                              />
                            );
                          })}
                  </div>
                </div>
            }
          </div>
          {notificationData && notificationData.length > 0 ? (
            <Link
              to="/dashboard/activity/system-logs"
              className="m-auto border-b-2 see-more pt-4"
            >
              See More
            </Link>
          ) : (
            <div className="flex w-full items-center justify-center see-more p-5">
              No new notifications !
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
