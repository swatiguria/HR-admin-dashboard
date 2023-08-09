import React from "react";
import Pagination from "../../components/pagination/pagination";
import { SystemLogic } from "./systemLogic";
import "./systemLog.scss";
import EntryCounter from "../../components/entryCounter/entryCounter";
import { Link } from "react-router-dom";
import documentIcon from "../../assets/systemLog/document.svg";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import NavBar from "../../components/navBar/navBar";
import loadingScreen from "../../assets/load.gif";
import DataEmptyComponent from "../../components/DataEmptyComponent/DataEmptyComponent";
import SortComponent from "../../components/SortComponent/SortComponent";
import dropdownIcon from "../../assets/arrowDropDown.svg"

const SystemLog = () => {
  const {
    counter,
    setCounter,
    currentTableData,
    currentPage,
    PageSize,
    setCurrentPage,
    uniqueDates,
    handleYearChange,
    sortYearData,
    monthFormat,
    timeFormat,
    statusHandler,
    currentYear,
    loading,
    data,
    yearsOptions,
    setPageOnChange,
    userInfo,
  } = SystemLogic();

  //html
  return (
    <div className="flex h-screen overflow-scroll ">
      <SideBarComponent />
      <div className=" md:gap-11 md:pt-10 pt:5 gap-5 flex flex-col items-center mx-auto">
        <NavBar heading="System logs" />
        {loading ? (
          <img src={loadingScreen} alt="loading" />
        ) : (
          <div className="min-[950px]:w-[68vw] w-[95vw] flex flex-col items-center gap-9 justify-between h-[75%]">
            <div className=" w-full justify-between items-center">
              {currentTableData !== null &&
                currentTableData.length !== 0 &&
                data && (
                  <div className="min-[420px]:flex flex-row sm:gap-0 gap-9 w-full justify-between items-center">
                    <EntryCounter
                      data={sortYearData}
                      counter={counter}
                      setCounter={setCounter}
                    />

                    <div className="flex items-center ">
                      <p>Sort By:</p>
                      <button className="flex justify-center items-center download-btn px-1 ml-2">
                        <SortComponent
                          options={yearsOptions}
                          sortHandler={handleYearChange}
                          setPageOnChange={setPageOnChange}
                          placeholder={"Years"}
                          icon={dropdownIcon}
                          value={currentYear}
                        />
                      </button>
                    </div>
                  </div>
                )}
              {currentTableData !== null &&
                currentTableData.length !== 0 &&
                data ? (
                <div className=" w-full overflow-y-auto flex flex-col max-h-[55vh] min-h-fit activityCard mt-5">
                  <div className="title">Activity Timeline</div>
                  <div className="content pt-5">
                    {uniqueDates.map((date, index) => {
                      let count = 0;
                      return (
                        <div key={index}>
                          {currentTableData !== null &&
                            currentTableData.length !== 0 ? (
                            currentTableData.map((item, itemIndex) => {
                              if (item.createdAt.split("T")[0] === date) {
                                count++;
                                return (
                                  <div key={itemIndex}>
                                    {count === 1 && (
                                      <div className="flex items-center" >
                                        <div className="whitespace-nowrap font-medium">
                                          {
                                            item.createdAt
                                              .split("T")[0]
                                              .split("-")[2]
                                          }
                                          {" " + monthFormat(
                                            item.createdAt
                                              .split("T")[0]
                                              .split("-")[1]
                                          )}
                                        </div>
                                        <hr className="border-black border-dashed ml-3 w-full" />

                                      </div>
                                    )}
                                    <div className="md:flex gap-3 py-3 pt-1 text-sm">
                                      <div className="whitespace-nowrap pt-4 opacity-60">
                                        {timeFormat(
                                          item.createdAt
                                        )}
                                      </div>
                                      <div className="rounded-lg w-full h-fit flex md:flex-row  flex-col justify-between items-center border py-3 px-5">
                                        <div className="md:flex ">
                                          {item.message ===
                                            "leave approval of" ? (
                                            <div className="md:flex gap-1 pe-1 items-center justify-center">
                                              <img
                                                className="docSvg"
                                                src={documentIcon}
                                                alt="icon"
                                              />
                                              <p>
                                                <span className="font-bold">{item.approvedBy?.firstName + " " + item.approvedBy?.lastName}</span>{" " + item.approvalStatus.toLowerCase() + " " + item.message + " " + item.employee + " "}
                                                <Link
                                                  className="text-blue-500 underline font-bold whitespace-nowrap"
                                                  to={`/dashboard/employee/edit-leave/${item.leaveID}`}
                                                >
                                                  View Details
                                                </Link>
                                              </p>
                                            </div>
                                          ) : (
                                            <div className="md:flex gap-1 pe-1 justify-center">
                                              <img
                                                className="docSvg"
                                                src={documentIcon}
                                                alt="icon"
                                              />
                                              <p>
                                                <span className="font-bold">
                                                  {item.employee}
                                                </span>
                                                {" " + item.message + " "}
                                                <Link
                                                  className="text-blue-500 underline font-bold whitespace-nowrap"
                                                  to={`/dashboard/employee/edit-leave/${item.leaveID}`}
                                                >
                                                  View Details
                                                </Link>
                                              </p>
                                            </div>
                                          )}



                                        </div>
                                        {item.approvalStatus ===
                                          "Pending" && item?.user?._id !== userInfo?._id && item.approvedBy._id === userInfo?._id && (
                                            <div className="flex gap-2 md:ms-3">
                                              <button
                                                className="submit-btn p-1.5 px-4 rounded-md text-white"
                                                onClick={() => {
                                                  statusHandler(
                                                    item._id, item.leaveID, "Approved"
                                                  );
                                                }}
                                              >
                                                Approve
                                              </button>
                                              <button
                                                className="add-btn p-1.5 px-4 rounded-md text-white"
                                                onClick={() => {
                                                  statusHandler(
                                                    item._id, item.leaveID, "Rejected"
                                                  );
                                                }}
                                              >
                                                Reject
                                              </button>
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })
                          ) : (
                            <DataEmptyComponent />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <DataEmptyComponent />
              )}
            </div>
            <div className="pagiNation flex w-full justify-end items-end ">
              {currentTableData !== null &&
                currentTableData.length !== 0 &&
                data && (
                  <Pagination
                    currentPage={currentPage}
                    totalCount={sortYearData.length}
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

export default SystemLog;
