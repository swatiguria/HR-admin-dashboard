import React from "react";
import Chat from "../../components/chat/chat";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EditLeavePopUp from "../../components/popUp/editLeavePopUp/EditLeavePopUp";
import { useNavigate } from "react-router-dom";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import NavBar from "../../components/navBar/navBar";
import DateRangePopUp from "../../components/popUp/dateRangePopUp/dateRangePopUp";
import EditEmployeeLeaveLogic from "./EditEmployeeLeaveLogic";
import StatusPopUp from "../../components/popUp/statusPopUp/statusPopUp";
import loadingScreen from "../../assets/load.gif";
import DataEmptyComponent from "../../components/DataEmptyComponent/DataEmptyComponent";
import crossIcon from "../../assets/departmentPopup/cross.svg";
import CapitalizeFirstLetter from "../../components/CapitalizeFirstLetter/CapitalizeFirstLetter";

const EditEmployeeLeave = ({ setShowLeavePopup, leaveId }) => {
  const {
    editPopup,
    setEditPopup,
    editDatePopup,
    setEditDatePopup,
    editStatusPopup,
    setEditStatusPopup,
    title,
    setTitle,
    setEditData,
    leaveDates,
    leaveDatesTitle,
    requestTo,
    requestToTitle,
    leaveStatus,
    leaveStatusTitle,
    employeeNameData,
    noOfDaysData,
    requestToData,
    approvalStatusData,
    reasonData,
    appliedDateData,
    editDataHandler,
    submitHandler,
    path,
    id,
    startDateData,
    endDateData,
    appliedDate,
    appliedMonth,
    setNoOfDaysData,
    loading,
    initialData,
    singleData,
    requestToDataId,
    setRequestToData,
    userInfo,
  } = EditEmployeeLeaveLogic();

  let editURL = `/dashboard/employee/edit-leave/${id}`;
  let style = `md:w-[68vw] w-[95vw] mb-5 flex flex-col h-full overflow-scroll  items-center gap-9`;
  let popUp = `fixed top-0 right-0 z-50 w-full overflow-scroll  popUpContainer flex justify-center items-center `;

  const navigate = useNavigate();

  const cancelHandler = () => {
    if (path === editURL) {
      navigate(-1);
    } else {
      setShowLeavePopup((prev) => !prev);
    }
  };

  return (
    <div className="flex h-screen  overflow-scroll">
      {path === editURL && <SideBarComponent />}
      {editPopup && (
        <EditLeavePopUp
          setEditPopup={setEditPopup}
          title={title}
          editDataHandler={editDataHandler}
          requestToDataId={requestToDataId}
          setRequestToData={setRequestToData}
          requestToData={requestToData}
        />
      )}
      {editDatePopup && (
        <DateRangePopUp
          setEditDatePopup={setEditDatePopup}
          title={title}
          editDataHandler={editDataHandler}
          startingDate={startDateData}
          endingDate={endDateData}
          setNoOfDaysData={setNoOfDaysData}
        />
      )}
      {editStatusPopup && (
        <StatusPopUp
          setEditStatusPopup={setEditStatusPopup}
          title={title}
          editDataHandler={editDataHandler}
          leaveStatus={approvalStatusData}
        />
      )}
      <div className=" md:gap-4 gap-5 h-full overflow-hidden flex flex-col items-center mx-auto">
        {path === editURL && <NavBar heading="Leaves" />}
        {loading ? (
          path === editURL ? (
            <img src={loadingScreen} alt="loading" />
          ) : (
            <div className="absolute right-0 z-50 flex w-screen md:h-screen justify-center items-center">
              <img src={loadingScreen} alt="loading" className="m-auto" />
            </div>
          )
        ) : (
          <div className={path !== editURL ? popUp : style}>
            {initialData !== null &&
              initialData.length !== 0 &&
              singleData.length !== 0 ? (
              <div
                className={`bg-white  overflow-scroll rounded-lg p-5 drop-shadow-lg ${path === editURL ? "w-full" : " w-[90%] md:w-2/3 h-min-fit"
                  } `}
              >
                <div className="flex justify-between pb-4">
                  <div className="text-[#2D3462] font-semibold pb-5 text-lg mx-5">
                    {employeeNameData}
                  </div>
                  {path !== editURL && (
                    <button className="hover:scale-110" onClick={cancelHandler}>
                      <img src={crossIcon} alt="cross icon" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 mx-auto sm:grid-cols-5 gap-5 sm:mx-5">
                  <div className="flex flex-col">
                    <p className="text-[0.8rem] text-[#2D3462] pb-3">
                      Applied Date
                    </p>

                    <div className="font-bold text-[0.8rem] text-[#2D3462] opacity-50">
                      {appliedDate ? (
                        <>
                          {appliedDate[2]} {appliedMonth} {appliedDate[0]}
                        </>
                      ) : (
                        <>{appliedDateData}</>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p
                        className="text-[0.8rem] text-[#2D3462] pb-3"
                        ref={leaveDatesTitle}
                      >
                        Leave Dates
                      </p>
                      {path === editURL && approvalStatusData === "Pending" && (
                        <button
                          className="pb-3"
                          onClick={() => {
                            setEditDatePopup(true);
                            setTitle(leaveDatesTitle.current.textContent);
                            setEditData(leaveDates.current.textContent);
                          }}
                        >
                          <DriveFileRenameOutlineIcon
                            fontSize="small"
                            style={{ color: "#2D3462", opacity: "50%" }}
                          />
                        </button>
                      )}
                    </div>

                    <div
                      className="font-bold text-[0.8rem] text-[#2D3462]"
                      ref={leaveDates}
                    >
                      {startDateData}-{endDateData}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.8rem] text-[#2D3462] pb-3">
                      No.of Days
                    </p>
                    <div className="font-bold text-[0.8rem] text-[#2D3462]">
                      {noOfDaysData}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p
                        className="text-[0.8rem] text-[#2D3462] pb-3"
                        ref={requestToTitle}
                      >
                        Request To
                      </p>
                      {path === editURL && approvalStatusData === "Pending" && (
                        <button
                          className="pb-3"
                          onClick={() => {
                            setEditPopup(true);
                            setTitle(requestToTitle.current.textContent);
                            setEditData(requestTo.current.textContent);
                          }}
                        >
                          <DriveFileRenameOutlineIcon
                            fontSize="small"
                            style={{ color: "#2D3462", opacity: "50%" }}
                          />
                        </button>
                      )}
                    </div>
                    <div
                      className="font-bold text-[0.8rem] min-w-fit max-w-[10rem] break-all text-[#2D3462]"
                      ref={requestTo}
                    >
                      <CapitalizeFirstLetter>
                        {requestToData}
                      </CapitalizeFirstLetter>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p
                        className="text-[0.8rem] text-[#2D3462] pb-3"
                        ref={leaveStatusTitle}
                      >
                        Approval Status
                      </p>
                      {path === editURL &&
                        approvalStatusData === "Pending" &&
                        initialData?.user?._id !== userInfo?._id &&
                        initialData.approvedBy._id === userInfo?._id && (
                          <button
                            className="pb-3"
                            onClick={() => {
                              setEditStatusPopup(true);
                              setTitle(leaveStatusTitle.current.textContent);
                            }}
                          >
                            <DriveFileRenameOutlineIcon
                              fontSize="small"
                              style={{ color: "#2D3462", opacity: "50%" }}
                            />
                          </button>
                        )}
                    </div>
                    {approvalStatusData !== "Pending" && (
                      <div
                        className={`font-bold text-[0.8rem] text-[#2D3462] 
                          ${approvalStatusData === "Approved"
                            ? "text-[#38A013]"
                            : approvalStatusData === "Rejected"
                              ? "text-[#D93A56]"
                              : "text-[#da784e]"
                          }`}
                        ref={leaveStatus}
                      >
                        {approvalStatusData}
                      </div>
                    )}
                  </div>
                </div>
                <div className="border p-2 rounded-md mt-8 sm:mx-5">
                  <div className="text-[0.8rem] text-[#474E77] pb-2">
                    Reason
                  </div>
                  <div className=" h-[3rem] overflow-scroll text-[1rem] text-[#474E77]">
                    {reasonData}
                  </div>
                </div>
                <div className="text-[0.8rem] text-[#2D3462] pt-5 mx-5">
                  Message your <span className="font-bold">Team Member</span>
                </div>
                <Chat leaveId={leaveId} />
                {path === editURL && (
                  <div className="flex flex-row-reverse gap-7 me-5">
                    <button
                      className="cancel-btn py-1.5 px-6 rounded-lg text-[0.8rem]"
                      onClick={cancelHandler}
                    >
                      Cancel
                    </button>
                    {initialData.approvalStatus === "Pending" &&
                      <button
                        className="submit-btn text-white py-1.5 px-6 rounded-lg text-[0.8rem]"
                        onClick={submitHandler}
                      >
                        Update
                      </button>}
                  </div>
                )}
              </div>
            ) : (
              <DataEmptyComponent />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditEmployeeLeave;
