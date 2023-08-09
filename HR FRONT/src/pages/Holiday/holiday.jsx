import React from "react";
import { HolidayLogic } from "./holidayLogic";
import edit from "../../assets/holiday/edit.svg";
import deleteIcon from "../../assets/holiday/delete.svg";
import EditHoliday from "../../components/popUp/holidayPopup/editHoliday/editHoliday";
import DeleteHoliday from "../../components/popUp/holidayPopup/deleteHoliday/deleteHoliday";
import downloadIcon from "../../assets/holiday/downloadIcon.svg";
import AddHoliday from "../../components/popUp/holidayPopup/addHoliday/addHoliday";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import NavBar from "../../components/navBar/navBar";
import EntryCounter from "../../components/entryCounter/entryCounter";
import Pagination from "../../components/pagination/pagination";
import loadingScreen from "../../assets/load.gif";
import DataEmptyComponent from "../../components/DataEmptyComponent/DataEmptyComponent";
import ReadMore from "../../components/ReadMore/ReadMore";

const Holiday = () => {
  const {
    data,
    isAdmin,
    specificData,
    setSpecificData,
    addPopup,
    setAddPopup,
    editPopup,
    setEditPopup,
    deletePopup,
    setDeletePopup,
    addHolidayHandler,
    deleteHolidayHandler,
    editHolidayHandler,
    date,
    setDate,
    occassion,
    setOccassion,
    currentTableData,
    dateValue,
    setDateValue,
    occassionValue,
    setOccassionValue,
    editData,
    setEditData,
    specificId,
    setSpecificId,
    counter,
    setCounter,
    PageSize,
    currentPage,
    setCurrentPage,
    downloadPdf,
    loading,
  } = HolidayLogic();

  return (
    <div className="flex h-screen overflow-scroll">
      <SideBarComponent />
      {deletePopup && (
        <DeleteHoliday
          setDeletePopup={setDeletePopup}
          specificData={specificData}
          specificId={specificId}
          deleteHolidayHandler={deleteHolidayHandler}
        />
      )}
      {editPopup && (
        <EditHoliday
          setEditPopup={setEditPopup}
          editHolidayHandler={editHolidayHandler}
          editData={editData}
          setEditData={setEditData}
          specificData={specificData}
          specificId={specificId}
          date={date}
          setDate={setDate}
          occassion={occassion}
          setOccassion={setOccassion}
        />
      )}
      {addPopup && (
        <AddHoliday
          setAddPopup={setAddPopup}
          addHolidayHandler={addHolidayHandler}
          dateValue={dateValue}
          setDateValue={setDateValue}
          occassionValue={occassionValue}
          setOccassionValue={setOccassionValue}
        />
      )}
      <div className=" md:gap-11 md:pt-10 pt:5 gap-5 flex flex-col items-center w-[95vw] min-[950px]:w-[68vw] mx-auto">
        <NavBar heading="Holidays" />
        {loading ? (
          <img src={loadingScreen} alt="loading" />
        ) : (
          <div className="w-[95vw] min-[950px]:w-[68vw]  flex flex-col items-center gap-9 justify-between h-[75%]">
            <div className=" w-full justify-between items-center">
              <div className="flex sm:flex-row flex-col sm:gap-0 gap-9 w-full justify-between items-center">
                {currentTableData !== null &&
                  currentTableData.length !== 0 &&
                  data && (
                    <EntryCounter
                      data={data && data?.data}
                      counter={counter}
                      setCounter={setCounter}
                    />
                  )}
                <div className="flex sm:flex-row flex-col items-center justify-center md:justify-evenly gap-9 md:ml-auto">
                  {currentTableData !== null &&
                    currentTableData.length !== 0 &&
                    data && (
                      <button
                        className="px-5 py-2 rounded-lg hover:scale-110  download-btn "
                        onClick={downloadPdf}
                      >
                        <div className="flex gap-3 items-center">
                          Download PDF
                          <img src={downloadIcon} alt="not found icon" />
                        </div>
                      </button>
                    )}

                  {isAdmin && (
                    <button
                      className="px-5 py-2 rounded-lg hover:scale-110 add-btn"
                      onClick={() => {
                        setAddPopup(true);
                      }}
                    >
                      + Add New
                    </button>
                  )}
                </div>
              </div>
              {currentTableData !== null && currentTableData.length !== 0 ? (
                <div className=" w-full overflow-y-auto flex flex-col tableBox mt-5 rounded-xl px-4">
                  <table className="w-full container  h-full  flex flex-row flex-no-wrap  tableList my-5 mx-auto">
                    <thead className="tHeadContainer p-2">
                      <tr className="flex flex-col  sm:table-row mb-2 sm:mb-0 p-2">
                        <td className=" font-semibold text-left text-lg ps-1">
                          Holidays List
                        </td>
                      </tr>
                      <tr className="flex flex-col  sm:table-row mb-2 sm:mb-0 p-2">
                        <th className="text-left p-4 flex-1 font-semibold">Date</th>
                        <th className="text-left p-4 flex-1 font-semibold">Day</th>
                        <th className="text-left p-4 flex-1 font-semibold">Occassion</th>
                        {isAdmin && <th className="text-center p-4 flex-1 font-semibold">Action</th>}
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      {currentTableData !== null &&
                        currentTableData.map((val, index) => {
                          return (
                            <tr
                              key={index}
                              className="flex flex-col flex-nowrap tableDataBox sm:table-row mx-5 mb-9 sm:mb-0"
                            >
                              <td className="text-center sm:text-left p-4 flex-1">
                                {val?.date?.split("T")[0]}
                              </td>
                              <td className="text-center sm:text-left p-4 flex-1">{val.day}</td>
                              <td className="text-center sm:text-left p-4 flex-1 break-all md:w-[20rem]">
                                <ReadMore>{val.occassion}</ReadMore>
                              </td>
                              {isAdmin && (
                                <td className="text-center p-4 flex justify-evenly flex-1">
                                  <button className="hover:scale-110">
                                    <img
                                      src={edit}
                                      alt="edit icon"
                                      onClick={() => {
                                        setEditPopup(true);
                                        setEditData(val);
                                        setDate(val.date.split("T")[0]);
                                        setOccassion(val.occassion);
                                        setSpecificId(val?._id);
                                      }}
                                    />
                                  </button>
                                  <button className="hover:scale-110">
                                    <img
                                      src={deleteIcon}
                                      alt="delete icon"
                                      onClick={() => {
                                        setSpecificData(val);
                                        setSpecificId(val?._id);
                                        setDeletePopup(true);
                                      }}
                                    />
                                  </button>
                                </td>
                              )}
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

export default Holiday;
