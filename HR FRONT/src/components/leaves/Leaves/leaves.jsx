import React from "react";
import stastics_icon from "../../../assets/Leaves/stastics_icon.svg";
import EntryCounter from "../../entryCounter/entryCounter";
import Pagination from "../../pagination/pagination";
import edit from "../../../assets/Leaves/edit.svg";
import deleteIcon from "../../../assets/Leaves/deleteIcon.svg";
import showIcon from "../../../assets/Leaves/Show.svg";
import { Link } from "react-router-dom";
import LeavesLogic from "./LeavesLogic";
import SideBarComponent from "../../SideBarComponent/SideBarComponent";
import NavBar from "../../navBar/navBar";
import EditEmployeeLeaveLogic from "../../../pages/EditEmployeeLeave/EditEmployeeLeaveLogic.js";
import loadingScreen from "../../../assets/load.gif";
import SortComponent from "../../SortComponent/SortComponent";
import sort from "../../../assets/employeeOverview/sort.svg";
import EditEmployeeLeave from "../../../pages/EditEmployeeLeave/EditEmployeeLeave";
import DataEmptyComponent from "../../../components/DataEmptyComponent/DataEmptyComponent";
import ReadMore from "../../ReadMore/ReadMore";
import DeleteLeaveApplicationPopup from "../../popUp/DeleteLeaveApplicationPopup/DeleteLeaveApplicationPopup";

const Leaves = () => {
  const { singleLeaveHandler } = EditEmployeeLeaveLogic();
  const {
    data,
    sortOptions,
    counter,
    setCounter,
    currentPage,
    setCurrentPage,
    currentTableData,
    PageSize,
    sortHandler,
    deleteLeaveHandler,
    showLeavePopup,
    setShowLeavePopup,
    loading,
    setPageOnChange,
    employee,
    setLeaveId,
    leaveId,
    setShowDeletePopup,
    showDeletePopup,
    setDeleteId,
    deleteId
  } = LeavesLogic();


  return (
    <div className="flex h-screen overflow-scroll">
      <SideBarComponent />
      {showLeavePopup && (
        <EditEmployeeLeave
          leaveId={leaveId}
          setShowLeavePopup={setShowLeavePopup}
        />
      )}
      {
        showDeletePopup &&
        <DeleteLeaveApplicationPopup
          deleteLeaveHandler={deleteLeaveHandler}
          setShowDeletePopup={setShowDeletePopup}
          deleteId={deleteId}
        />
      }
      <div className=" md:gap-11  gap-5 flex flex-col items-center mx-auto">
        <NavBar heading="Leaves" />
        {loading ? (
          <img src={loadingScreen} alt="loading" />
        ) : (
          <div className="min-[950px]:w-[68vw] w-[95vw] h-full flex flex-col items-start gap-9">
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <div className="search_input text-indigo-950 flex gap-10 my-6 flex-row items-center text-center sm:text-left justify-center  p-6 rounded-lg ">
                <p className=" font-semibold">
                  Annual leaves <br />
                  <span className=" text-5xl font-semibold">
                    {employee && employee?.data?.allotedLeaves}
                  </span>
                </p>
                <img
                  className=" w-100 sm:w-auto h-16 sm:h-auto"
                  src={stastics_icon}
                  alt="stastics"
                />
              </div>
              <div className="search_input text-indigo-950 flex gap-10 my-6 flex-row items-center text-center sm:text-left justify-center  p-6 rounded-lg ">
                <p className=" font-semibold">
                  Remaining leaves <br />
                  <span className=" text-5xl font-semibold">
                    {employee && employee?.data?.remainingLeaves}
                  </span>
                </p>
                <img
                  className=" w-100 sm:w-auto h-16 sm:h-auto"
                  src={stastics_icon}
                  alt="stastics"
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-9 justify-between h-[75%]">
              <div className=" w-full ">
                {currentTableData !== null &&
                  currentTableData.length !== 0 &&
                  data && (
                    <div className="min-[340px]:flex sort_container py-2 justify-between ">
                      <EntryCounter
                        data={data}
                        counter={counter}
                        setCounter={setCounter}
                      />

                      <button className="flex justify-center mt-5 md:mt-0 items-center download-btn p-2 w-[20%] h-[2.5rem]">
                        <SortComponent
                          options={sortOptions}
                          sortHandler={sortHandler}
                          setPageOnChange={setPageOnChange}
                          placeholder={"Sort"}
                          icon={sort}
                        />
                      </button>
                    </div>
                  )}
                {currentTableData !== null &&
                  currentTableData.length !== 0 &&
                  data ? (
                  <div className=" w-full overflow-y-auto flex flex-col max-h-[38vh] min-h-fit tableBox mt-5 rounded-xl px-2">
                    <table className="w-full container  h-full  flex flex-row  tableList my-5 mx-auto">
                      <thead className="tHeadContainer p-5">
                        <tr>
                          <td colSpan={2}>
                            <p className=" font-semibold text-xl w-full">
                              Leaves For Employees
                            </p>
                          </td>
                        </tr>
                        <tr className="flex flex-col  sm:table-row mb-2 sm:mb-0 p-2">
                          <th className="text-left py-4 flex-1 font-semibold">Employee Name</th>
                          <th className="text-left py-4 flex-1 font-semibold">Leave Type</th>
                          <th className="text-left py-4 flex-1 font-semibold">From</th>
                          <th className="text-left py-4 flex-1 font-semibold">To</th>
                          <th className="text-left py-4 flex-1 font-semibold">Total No. of Days</th>
                          <th className="text-left py-4 flex-1 font-semibold">Reason</th>
                          <th className="text-left py-4 flex-1 font-semibold">Approved by</th>
                          <th className="text-center py-4 flex-1 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {currentTableData.map((val, index) => {
                          return (
                            <tr
                              key={index}
                              className="flex flex-col  tableDataBox sm:table-row sm:mx-0 mx-5 mb-9 sm:mb-0"
                            >
                              <td className="text-center sm:text-left py-4 flex-1 min-w-[9rem]">
                                {val.employeeName}
                              </td>
                              <td className="text-center sm:text-left py-4 flex-1 min-w-[8rem]">
                                {val.leaveType}
                              </td>
                              <td className="text-center sm:text-left py-4 flex-1 min-w-[7rem]">
                                {val.dateRange.split("to")[0]}
                              </td>
                              <td className="text-center sm:text-left py-4 flex-1 min-w-[7rem]">
                                {val.dateRange.split("to")[1]}
                              </td>
                              <td className="text-center sm:text-left py-4 flex-1 min-w-[5rem]">
                                {val.totalNoOfDays}
                              </td>
                              <td className="text-center sm:text-left py-4 flex-1 break-all sm:w-[10rem]">
                                <ReadMore>
                                  {val.reason}
                                </ReadMore>
                              </td>

                              <td className="text-center sm:text-left py-4 min-w-[7rem]">
                                {val.approvedBy?.firstName}
                              </td>
                              <td className="p-4 h-full  flex justify-evenly items-center gap-2 min-w-[7rem]">
                                <button
                                  className="hover:scale-110"
                                  onClick={() => {
                                    setLeaveId(val?._id);
                                    singleLeaveHandler(val?._id);
                                    setShowLeavePopup(!showLeavePopup);
                                  }}
                                >
                                  <img src={showIcon} alt="show icon" />
                                </button>
                                <button
                                  className="hover:scale-110"
                                  onClick={() => {
                                    singleLeaveHandler(val?._id);
                                  }}
                                >
                                  <Link to={`/dashboard/employee/edit-leave/${val?._id}`}>
                                    <img src={edit} alt="edit icon" />
                                  </Link>
                                </button>
                                <button
                                  className="hover:scale-110"
                                  onClick={() => {
                                    setShowDeletePopup(true)
                                    setDeleteId(val?._id)
                                    // deleteLeaveHandler(val?._id);
                                  }}
                                >
                                  <img src={deleteIcon} alt="delete icon" />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaves;
