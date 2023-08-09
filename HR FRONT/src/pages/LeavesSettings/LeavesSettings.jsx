import React from "react";
import EntryCounter from "../../components/entryCounter/entryCounter";
import Pagination from "../../components/pagination/pagination";
import editIcon from "../../assets/leaveSettings/edit.svg";
import deleteIcon from "../../assets/leaveSettings/delete.svg";
import { LeaveSettingsLogic } from "./LeaveSettingsLogic";
import AddLeavePopup from "../../components/popUp/leaveSettingPopup/addPopUp/addLeavePopUp";
import EditLeavePopup from "../../components/popUp/leaveSettingPopup/editPopUp/editPopUp";
import DeletePopUp from "../../components/popUp/leaveSettingPopup/deletePopUp/deletePopUp";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import NavBar from "../../components/navBar/navBar";
import loadingScreen from "../../assets/load.gif";
import DataEmptyComponent from "../../components/DataEmptyComponent/DataEmptyComponent";

const LeavesSettings = () => {
  const {
    data,
    title,
    setTitle,
    noOfDays,
    setnoOfDays,
    setCanItBeForwarded,
    forwardedDays,
    setForwardedDays,
    setStatus,
    addLeaveHandler,
    editData,
    setEditData,
    editLeaveHandler,
    deletePopup,
    setDeletePopup,
    deleteLeaveHandler,
    addPopup,
    setAddPopup,
    editPopup,
    setEditPopup,
    setCounter,
    counter,
    currentTableData,
    currentPage,
    PageSize,
    setCurrentPage,
    loading,
  } = LeaveSettingsLogic();

  return (
    <div className="flex h-screen overflow-scroll">
      <SideBarComponent />
      {addPopup && (
        <AddLeavePopup
          setAddPopup={setAddPopup}
          title={title}
          setTitle={setTitle}
          noOfDays={noOfDays}
          setnoOfDays={setnoOfDays}
          setCanItBeForwarded={setCanItBeForwarded}
          forwardedDays={forwardedDays}
          setForwardedDays={setForwardedDays}
          setStatus={setStatus}
          addLeaveHandler={addLeaveHandler}
        />
      )}
      {editPopup && (
        <EditLeavePopup
          setEditPopup={setEditPopup}
          editData={editData}
          setEditData={setEditData}
          editLeaveHandler={editLeaveHandler}
        />
      )}
      {deletePopup && (
        <DeletePopUp
          editData={editData}
          setDeletePopup={setDeletePopup}
          deleteLeaveHandler={deleteLeaveHandler}
        />
      )}

      <div className=" md:gap-11 gap-5 flex flex-col items-center mx-auto">
        <NavBar heading="Leave Settings" />
        {loading ? (
          <img src={loadingScreen} alt="loading" />
        ) : (
          <div className="min-[950px]:w-[68vw] w-[95vw] flex flex-col items-center gap-9 justify-between h-[75%]">
            <div className=" w-full justify-between items-center">
              <div className="flex sm:flex-row flex-col items-center justify-center md:justify-between gap-9 md:ml-auto">
                {currentTableData !== null &&
                  currentTableData.length !== 0 &&
                  data && (
                    <EntryCounter
                      data={data && data?.data}
                      counter={counter}
                      setCounter={setCounter}
                    />
                  )}

                <button
                  className="px-5 py-2 rounded-lg hover:scale-110 add-btn font-semibold "
                  onClick={() => {
                    setAddPopup(true);
                  }}
                >
                  + Add Leave
                </button>
              </div>
              {currentTableData !== null &&
                currentTableData.length !== 0 &&
                data ? (
                <div className=" w-full overflow-y-auto flex flex-col tableBox mt-5 rounded-xl px-4">
                  <table className="w-full container  h-full  flex flex-row flex-no-wrap  tableList my-5">
                    <thead className="tHeadContainer p-2">
                      <tr className="flex flex-col sm:table-row mb-2 sm:mb-0 p-2">
                        <th className="text-center p-4 font-semibold">#</th>
                        <th className="text-center p-4 font-semibold">Leave Type</th>
                        <th className="text-center p-4 font-semibold">No. of Days</th>
                        <th className="text-center p-4 font-semibold">Status</th>
                        <th className="text-center p-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="w-full p-3">
                      {currentTableData &&
                        currentTableData.map((val, index) => {
                          return (
                            <tr
                              key={index}
                              className="flex flex-col  tableDataBox sm:table-row sm:mx-0 mx-5 mb-9 sm:mb-0"
                            >
                              <td className="text-center p-4">
                                {index < 10 ? "0" + (index + 1) : index + 1}
                              </td>

                              <td className="text-center p-4">
                                {val.leaveType}
                              </td>
                              <td className=" text-center p-4">
                                {val.noOfDays}{" "}
                                {val.forwardedDays !== 0
                                  ? `+ ${val.forwardedDays}`
                                  : ""}
                              </td>
                              <td >
                                <p className={` w-fit ${val.status ? "submit-btn" : "add-btn"} rounded-full px-3 py-1 m-auto`}>
                                  {val.status ? "Active" : "Inactive"}
                                </p>
                              </td>

                              <td className="text-center p-4 flex justify-evenly">
                                <button
                                  className="hover:scale-125 pe-2 "
                                  onClick={() => {
                                    setEditPopup(true);
                                    setEditData(val);
                                  }}
                                >
                                  <img src={editIcon} alt="edit icon " />
                                </button>
                                <button
                                  className="hover:scale-110 px-2 "
                                  onClick={() => {
                                    setDeletePopup(true);
                                    setEditData(val);
                                  }}
                                >
                                  <img src={deleteIcon} alt="delete icon " />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <DataEmptyComponent />
              )}
            </div>
            <div className="pagiNation flex w-full justify-end">
              {currentTableData !== null &&
                currentTableData.length !== 0 &&
                data && (
                  <Pagination

                    currentPage={currentPage}
                    totalCount={data && data?.data?.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeavesSettings;
