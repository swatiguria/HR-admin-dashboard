import SideBar from "../../components/SideBarComponent/SideBarComponent";
import NavBar from "../../components/navBar/navBar";
import EntryCounter from "../../components/entryCounter/entryCounter";
import Pagination from "../../components/pagination/pagination";
import { TlEmployeesLogic } from "./TLEndEmployeeListLogic";
import SortComponent from "../../components/SortComponent/SortComponent";
import dropDownIcon from "../../assets/addEmployee/arrow_drop_down.svg";
import loadingScreen from "../../assets/load.gif";
import DataEmptyComponent from "../../components/DataEmptyComponent/DataEmptyComponent";

const TlEmployees = () => {
  const {
    counter,
    setCounter,
    currentPage,
    setCurrentPage,
    currentTableData,
    PageSize,
    filterHandler,
    filterData,
    setPageOnChange,
    departmentOptions,
    loading,
  } = TlEmployeesLogic();

  return (
    <div className="flex h-screen overflow-scroll">
      <SideBar />

      <div className=" md:gap-11 md:pt-10 pt:5 gap-5 flex flex-col items-center mx-auto">
        <NavBar heading="Employees List" />
        {loading ? (
          <img src={loadingScreen} alt="loading" />
        ) : (
          <div className="min-[950px]:w-[68vw] w-[95vw] flex flex-col items-center gap-9 justify-between h-[75%]">
            <div className=" w-full justify-between items-center">
              <div className="flex sm:flex-row flex-col sm:gap-0 gap-9 w-full justify-between items-center">
                {filterData !== null && filterData.length !== 0 && (
                  <EntryCounter
                    data={filterData}
                    counter={counter}
                    setCounter={setCounter}
                  />
                )}
                <button className="flex justify-center items-center ml-auto   download-btn py-1 w-2/5 md:w-1/6">
                  <SortComponent
                    options={departmentOptions}
                    sortHandler={filterHandler}
                    setPageOnChange={setPageOnChange}
                    icon={dropDownIcon}
                    placeholder={"Select"}
                  />
                </button>
              </div>
              {currentTableData.length === 0 ? (
                <DataEmptyComponent />
              ) : (
                <div className="container overflow-y-auto mt-5 tableBox rounded-xl mx-auto px-4">
                  <table className="w-full  flex flex-row flex-no-wrap overflow-hidden my-5 tableList">
                    <thead className="tHeadContainer">
                      <tr className="flex flex-col  sm:table-row mb-2 sm:mb-0">
                        <th className="tableHead p-3 text-left font-semibold" width="20%">
                          Employee Name
                        </th>
                        <th className="tableHead p-3 text-left font-semibold" width="20%">
                          Designation
                        </th>
                        <th className="tableHead p-3 text-left font-semibold" width="20%">
                          Email ID
                        </th>
                        <th className="tableHead p-3 text-left font-semibold" width="20%">
                          Contact Number
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      {currentTableData !== null &&
                        currentTableData.length !== 0 &&
                        currentTableData.map((val, index) => {
                          return (
                            <tr
                              key={index}
                              className="flex flex-col  tableDataBox sm:table-row sm:mx-0 mx-5 mb-9 sm:mb-0"
                            >
                              <td className="p-3 text-center sm:text-left">
                                {val.firstName} {val.lastName}
                              </td>
                              <td className="p-3 text-center sm:text-left">
                                {val.designation}
                              </td>
                              <td className="p-3 text-center sm:text-left">{val.email}</td>

                              <td className="p-3 text-center sm:text-left">{val.contact}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="pagiNation flex w-full justify-end">
              {filterData !== null && filterData.length !== 0 && (
                <Pagination

                  currentPage={currentPage}
                  totalCount={filterData && filterData?.length}
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

export default TlEmployees;
