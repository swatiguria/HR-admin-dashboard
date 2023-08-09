import React from "react";
import EntryCounter from "../../entryCounter/entryCounter";
import Pagination from "../../pagination/pagination";
import edit from "../../../assets/employeeLeaves/edit.svg";
import show from "../../../assets/employeeLeaves/Show.svg";
import { EmployeeLeavesLogic } from "./leavesEmployeeEndLogic";
import SideBarComponent from "../../SideBarComponent/SideBarComponent";
import NavBar from "../../navBar/navBar";
import { Link } from "react-router-dom";
import GetMonthDateAndTime from "../../../utils/GetMonthDateAndTime";
import LeavesLogic from "../../leaves/Leaves/LeavesLogic";
import EditEmployeeLeaveLogic from "../../../pages/EditEmployeeLeave/EditEmployeeLeaveLogic.js";
import loadingScreen from "../../../assets/load.gif";
import DataEmptyComponent from "../../DataEmptyComponent/DataEmptyComponent";
import EditEmployeeLeave from "../../../pages/EditEmployeeLeave/EditEmployeeLeave";
import ReadMore from "../../ReadMore/ReadMore";

const EmployeeLeaves = () => {
  const {
    employeeLeaves,
    counter,
    setCounter,
    currentPage,
    setCurrentPage,
    currentTableData,
    PageSize,
    loading,
    setLeaveId,
    leaveId,
  } = EmployeeLeavesLogic();

  const { monthFormat } = GetMonthDateAndTime();
  const { showLeavePopup, setShowLeavePopup } = LeavesLogic();
  const { singleLeaveHandler } = EditEmployeeLeaveLogic();


  return (
    <div className="flex h-screen overflow-scroll">
      <SideBarComponent />
      {showLeavePopup && (
        <EditEmployeeLeave
          leaveId={leaveId}
          setShowLeavePopup={setShowLeavePopup}
        />
      )}
      <div className=" md:gap-11 gap-5 flex flex-col items-center mx-auto">
        <NavBar heading="Leaves" />
        {loading ? (
          <img src={loadingScreen} alt="loading" />
        ) : (
          <div className="min-[950px]:w-[68vw] w-[95vw] flex flex-col items-center gap-9 justify-between h-[75%]">
            <div className=" w-full justify-between items-center ">
              <div className="flex sm:flex-row flex-col items-center justify-center md:justify-between gap-9 md:ml-auto">
                {currentTableData !== null && currentTableData?.length !== 0 && employeeLeaves !== null && employeeLeaves?.data?.length !== 0 && (
                  <EntryCounter
                    data={employeeLeaves && employeeLeaves.data}
                    counter={counter}
                    setCounter={setCounter}
                  />
                )}

                <Link
                  to="/dashboard/employee/apply-leave"
                  className="px-5 py-2 rounded-lg hover:scale-110  add-btn  font-semibold"
                >
                  + Apply Leave
                </Link>
              </div>
              {currentTableData !== null && currentTableData?.length !== 0 && employeeLeaves !== null && employeeLeaves?.data?.length !== 0 ? (
                <div className=" w-full overflow-y-auto flex flex-col tableBox mt-5 rounded-xl px-4">
                  <table className="w-full container  h-full  flex flex-row flex-no-wrap  tableList my-5 mx-auto">
                    <thead className="tHeadContainer p-2">
                      <tr className="flex flex-col  sm:table-row mb-2 sm:mb-0 p-2">
                        <th className="text-left py-4 flex-1 font-semibold">Applied Date</th>
                        <th className="text-left py-4 flex-1 font-semibold">Leave Dates</th>
                        <th className="text-left py-4 flex-1 font-semibold">No. of Days</th>
                        <th className="text-left py-4 flex-1 font-semibold">Request To</th>
                        <th className="text-left py-4 flex-1 font-semibold">Status</th>
                        <th className="text-center py-4 flex-1 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="w-full p-3">
                      {
                        currentTableData.map((val, index) => {
                          return (
                            <tr key={index} className="flex flex-col  tableDataBox sm:table-row sm:mx-0 mx-5 mb-9 sm:mb-0">
                              <td className="text-center md:text-left py-4 flex-1 min-w-[8rem]">
                                {val.createdAt.split("T")[0].split("-")[2]}{" "}
                                {monthFormat(
                                  val.createdAt.split("T")[0].split("-")[1]
                                )}{" "}
                                {val.createdAt.split("T")[0].split("-")[0]}
                              </td>
                              <td className="text-center md:text-left py-4 flex-1 min-w-[13rem] sm:min-w-[16rem] xl:min-w-[14rem]">
                                {val.dateRange.split("to")[0].split("-")[0]}{" "}
                                {monthFormat(
                                  val.dateRange.split("to")[0].split("-")[1]
                                )}{" "}
                                {val.dateRange.split("to")[0].split("-")[2]}
                                {"-"}
                                {
                                  val.dateRange.split("to")[1].split("-")[0]
                                }{" "}
                                {monthFormat(
                                  val.dateRange.split("to")[1].split("-")[1]
                                )}{" "}
                                {val.dateRange.split("to")[1].split("-")[2]}
                              </td>
                              <td className="text-center md:text-left py-4 flex-1">
                                {val.totalNoOfDays}
                              </td>
                              <td className="text-center md:text-left py-4 flex-1 break-all md:w-[10rem]">
                                <ReadMore>{val.approvedBy?.firstName}</ReadMore>
                              </td>
                              <td
                                className={`text-center md:text-left py-4 flex-1 min-w-[6rem]
                          ${val.approvalStatus === "Approved"
                                    ? "text-[#38A013]"
                                    : val.approvalStatus === "Rejected"
                                      ? "text-[#D93A56]"
                                      : "text-[#da784e]"
                                  }`}
                              >
                                {val.approvalStatus}
                              </td>

                              <td className="text-center md:text-left py-4 flex-1 flex justify-evenly md:justify-between">
                                <Link
                                  to={`/dashboard/employee/edit-leave/${val?._id}`}
                                >
                                  <img src={edit} alt="edit icon" />
                                </Link>
                                <button
                                  className="hover:scale-110 px-2 "
                                  onClick={() => {
                                    setLeaveId(val?._id);
                                    singleLeaveHandler(val?._id);
                                    setShowLeavePopup(!showLeavePopup);
                                  }}
                                >
                                  <img src={show} alt="show icon " />
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
            <div className="pagiNation flex w-full justify-end pt-2">
              {currentTableData !== null && currentTableData?.length !== 0 && employeeLeaves !== null && employeeLeaves?.data?.length !== 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalCount={employeeLeaves && employeeLeaves?.data?.length}
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

export default EmployeeLeaves;
