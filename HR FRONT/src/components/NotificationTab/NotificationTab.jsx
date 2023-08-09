import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import delete_icon from "../../assets/navBar/delete.png";
import { useSelector } from 'react-redux';

const NotificationTab = (props) => {
    const { userInfo } = useSelector((state) => state.signInUser);
    const {
        notification,
        index,
        markAsRead,
        deleteNotificationHandler,
        timeFormat,
        statusHandler,
        toggleshowNotification
    } = props



    const [seeButtons, setSeeButtons] = useState([]);
    const [read, setRead] = useState()

    const toggleButton = (index) => {
        setSeeButtons((prevState) => {
            if (prevState.includes(index))
                return prevState.filter((item) => item !== index);
            return [...prevState, index];
        });
    };

    useEffect(() => {
        if (notification)
            setRead(notification.read)
    }, [notification])

    return (
        <div className={` ${read ? "bg-white" : "grey"}`} >
            <div
                className={`flex items-center border-t py-2`}
                onClick={() => {
                    toggleButton(index);
                    !read && markAsRead(notification._id)
                }}
            >
                <img
                    className="w-[5rem] h-[3rem] object-cover rounded-full"
                    src={
                        notification?.message === "leave approval of"
                            ? notification?.approvedBy.photo
                            : notification?.user.photo
                    }
                    alt="user"
                />
                <div className="px-3">
                    {notification?.message ===
                        "leave approval of" ? (
                        <p>
                            <span className="font-bold text-[#2D3462]">
                                {notification.approvedBy?.firstName +
                                    " " +
                                    notification.approvedBy?.lastName +
                                    " "}
                            </span>
                            <span>
                                {notification.approvalStatus.toLowerCase() +
                                    " " +
                                    notification.message +
                                    " " +
                                    notification.employee}
                            </span>
                            <Link
                                className="view-details border-b-2 ml-2"
                                to={`/dashboard/employee/edit-leave/${notification?.leaveID}`}
                                onClick={() => toggleshowNotification()}
                            >
                                View Details
                            </Link>
                        </p>
                    ) : (

                        <p>
                            <span className="font-bold text-[#2D3462]">
                                {notification.employee + " "}
                            </span>
                            <span>{notification?.message}</span>
                            <Link
                                className="view-details border-b-2 ml-2"
                                to={`/dashboard/employee/edit-leave/${notification?.leaveID}`}
                            >
                                View Details
                            </Link>
                        </p>
                    )}
                    <span className="text-slate-400">
                        {timeFormat(notification.createdAt)}
                    </span>
                </div>
                <button
                    className=" w-20"
                    onClick={() =>
                        deleteNotificationHandler(notification._id)
                    }
                >
                    <img src={delete_icon} alt="delete" />
                </button>
            </div>
            {notification.approvalStatus.toLowerCase() ===
                "pending" &&
                notification?.user?._id !== userInfo?._id &&
                notification.approvedBy._id === userInfo?._id &&
                seeButtons.includes(index) && (
                    <div className="flex gap-2 ps-10 ms-3 pb-2 text-[#555A7F]">
                        <button
                            className="border-2 border-slate-500 px-4 py-1 rounded-md hover:bg-[#697CE4] hover:text-white hover:border-0"
                            onClick={() =>
                                statusHandler(
                                    notification._id,
                                    notification.leaveID,
                                    "Approved"
                                )
                            }
                        >
                            Accept
                        </button>
                        <button
                            className="border-2 border-slate-500 px-4 py-1 rounded-md hover:bg-[#697CE4] hover:text-white hover:border-0"
                            onClick={() =>
                                statusHandler(
                                    notification._id,
                                    notification.leaveID,
                                    "Rejected"
                                )
                            }
                        >
                            Reject
                        </button>
                    </div>
                )}
        </div>
    );
}

export default NotificationTab;
