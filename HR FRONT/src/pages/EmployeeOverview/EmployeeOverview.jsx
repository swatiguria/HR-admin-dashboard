import React from "react";
import DoughnutChart from "../../components/doughnutChart/doughnutChart";
import "./employeeOverview.scss";
import { EmployeeLogic } from "./EmployeeOverviewLogic"
import SortComponent from "../../components/SortComponent/SortComponent";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import download from "../../assets/employeeOverview/Downlaod.svg";
import EntryCounter from "../../components/entryCounter/entryCounter";
import Pagination from "../../components/pagination/pagination";
import view from "../../assets/employeeOverview/Show.svg";
import SideBar from "../../components/SideBarComponent/SideBarComponent";
import NavBar from "../../components/navBar/navBar";
import { Link } from "react-router-dom";
import loadingScreen from '../../assets/load.gif'
import sort from "../../assets/employeeOverview/sort.svg";
import dropDownIcon from "../../assets/employeeOverview/filter_alt.svg";
import DataEmptyComponent from "../../components/DataEmptyComponent/DataEmptyComponent";

const EmployeeOverview = () => {
  const {
    data,
    departmentOptions,
    filterData,
    counter,
    setCounter,
    filterHandler,
    setPageOnChange,
    currentTableData,
    currentPage,
    PageSize,
    setCurrentPage,
    diffInHours,
    employeeID,
    setEmployeeID,
    name,
    setName,
    designation,
    setDesignation,
    searchHandler,
    sortOptions,
    sortHandler,
    downloadPdf,
    loading,
    searchLoading
  } = EmployeeLogic();


  return (
    <div className="flex h-screen overflow-scroll ">
      <SideBar />
      <div className=" md:gap-4 gap-5 w-[100vw] md:w-[71vw] flex flex-col items-center mx-auto">

        <NavBar heading="Employees Overview" />
        {
          loading ?
            <img src={loadingScreen} alt="loading" />
            :
            <div className="w-[95vw] md:w-[67vw] lg:w-[74vw] mt-0 ">
              <div className=" text-right">
                <Link to="/dashboard/employee/add-employee" className="add-btn p-2 my-3 rounded-xl font-semibold inline-block">
                  + Add New Employee
                </Link>
              </div>

              <div className="py-4  employee_stastics text-center w-full gap-2 grid-cols-2 sm:grid lg:grid xl:flex xl:flex-row  justify-between ">
                <div className="my-2 search_input flex  px-2">

                  <div className=" w-16">
                    <DoughnutChart
                      data1={
                        data &&
                        data?.data?.filter((emp) => emp?.hasResigned === false)
                          .length
                      }
                      data2="0"
                    />
                  </div>
                  <div className="text-start ps-5 py-2 text-blue-950">
                    <p className=" font-semibold text-3xl">

                      {data &&
                        data?.data?.filter((emp) => emp?.hasResigned === false)
                          .length}
                    </p>
                    <p className=" text-[#556E84]"> Total Employee</p>
                  </div>
                </div>
                <div className="my-2 search_input flex px-2">
                  <div className=" w-16">
                    <DoughnutChart
                      data2={data && (data?.data?.filter((emp) => emp?.hasResigned === false).length - data?.data?.filter((emp) => emp?.hasResigned === false).filter(
                        (emp) => diffInHours(emp?.createdAt, Date.now()) <= 160
                      ).length)}
                      data1={
                        data &&
                        data?.data?.filter((emp) => emp?.hasResigned === false)?.filter(
                          (emp) => diffInHours(emp?.createdAt, Date.now()) <= 160
                        ).length
                      }
                    />
                  </div>
                  <div className="text-start ps-5 py-2 text-blue-950">
                    <p className=" font-semibold text-3xl">
                      {data &&
                        data?.data?.filter((emp) => emp?.hasResigned === false).filter(
                          (emp) => diffInHours(emp?.createdAt, Date.now()) <= 160
                        ).length}
                    </p>
                    <p className="  text-[#556E84]">New Employee</p>
                  </div>
                </div>
                <div className="my-2 search_input flex px-2">
                  <div className=" w-16">
                    <DoughnutChart
                      data2={data && (data?.data?.length - data?.data?.filter((emp) => emp?.hasResigned === true)
                        .length)}
                      data1={
                        data &&
                        data?.data?.filter((emp) => emp?.hasResigned === true)
                          .length
                      }
                    />
                  </div>

                  <div className="text-start ps-5 py-2 text-blue-950">
                    <p className=" font-semibold text-3xl">
                      {data &&
                        data?.data?.filter((emp) => emp?.hasResigned === true)
                          .length}
                    </p>
                    <p className="text-[#556E84]">Resigned Employee</p>
                  </div>
                </div>
                <div className="my-2 search_input flex px-2">
                  <div className=" w-16">
                    <DoughnutChart
                      data2={data && (data?.data?.filter((emp) => emp?.hasResigned === false).length - data?.data?.filter((emp) => emp?.hasResigned === false)?.filter((emp) => emp?.gender === "male").length)}
                      data1={
                        data &&
                        data?.data?.filter((emp) => emp?.hasResigned === false)?.filter((emp) => emp?.gender === "male").length
                      }
                    />
                  </div>
                  <div className="text-start ps-5 py-2 text-blue-950">
                    <p className=" font-semibold text-3xl">
                      {data &&
                        data?.data?.filter((emp) => emp?.hasResigned === false).filter((emp) => emp?.gender === "male").length}
                    </p>
                    <p className="  text-[#556E84]">Male Employee</p>
                  </div>
                </div>
                <div className="my-2 search_input flex px-2">
                  <div className=" w-16">
                    <DoughnutChart
                      data2={data && (data?.data?.filter((emp) => emp?.hasResigned === false).length - data?.data?.filter((emp) => emp?.hasResigned === false).filter((emp) => emp?.gender === "female").length)}
                      data1={
                        data &&
                        data?.data?.filter((emp) => emp?.hasResigned === false).filter((emp) => emp?.gender === "female").length
                      }
                    />
                  </div>
                  <div className="text-start ps-5 py-2 text-blue-950">
                    <p className=" font-semibold text-3xl">
                      {data &&
                        data?.data?.filter((emp) => emp?.hasResigned === false).filter((emp) => emp?.gender === "female")
                          .length}
                    </p>
                    <p className="  text-[#556E84]">Female Employee</p>
                  </div>
                </div>
              </div>
              <div className="grid text-center gap-3 grid-cols-2 lg:grid-cols-4 my-2">
                <input
                  type="text"
                  onChange={(e) => setEmployeeID(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchHandler()
                  }}
                  value={employeeID}
                  className="search_input rounded-2xl ps-4 py-4"
                  placeholder="Employees ID"
                />

                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchHandler()
                  }}
                  value={name}
                  className="search_input rounded-2xl ps-4 py-5"
                  placeholder="Employees Name"
                />
                <div className=" search_input text-left rounded-2xl  font-semibold">
                  <label className=" ps-2 font-light text-xs">
                    Designation
                  </label>
                  <SelectComponent
                    options={departmentOptions}
                    placeholder={"Select Designation"}
                    onChange={(e) => setDesignation(e.value)}
                    value={{ label: designation, value: designation }}
                  />
                </div>
                <button
                  className=" text-center text-xl text-white rounded-2xl h-full font-semibold submit-btn mb-7"
                  onClick={searchHandler}
                >
                  SEARCH
                </button>
              </div>
              <div className="show_entries pb-3 self-center">

                <EntryCounter
                  data={filterData}
                  counter={counter}
                  setCounter={setCounter}

                />
              </div>

              <div className=" pb-3 search_input  h-min-fit md:h-[36vh] overflow-auto ">

                <div className=" flex flex-col md:flex-row gap-3 p-5 pb-0 justify-between sticky top-0 grey">
                  <p className=" text-[#2d3462] text-lg font-semibold">
                    Employee Lists
                  </p>

                  <div className="flex flex-col md:flex-row gap-3 w-full lg:w-1/2 xxl:w-[35%] justify-end">
                    <button className="flex justify-center items-center  download-btn md:w-2/5">
                      <SortComponent
                        options={sortOptions}
                        sortHandler={sortHandler}
                        setPageOnChange={setPageOnChange}
                        placeholder={"Sort"}
                        icon={sort}
                      />
                    </button>
                    <button className="flex items-center justify-center download-btn md:w-3/5">
                      <SortComponent
                        options={departmentOptions}
                        sortHandler={filterHandler}
                        setPageOnChange={setPageOnChange}
                        placeholder={"Filter"}
                        icon={dropDownIcon}
                      />
                    </button>
                    <button
                      className="flex my-auto gap-2 px-2 py-3 justify-center download-btn md:w-4/5"
                      onClick={downloadPdf}
                    >
                      <p className=" font-semibold  text-indigo-950">
                        Download PDF
                      </p>
                      <img src={download} alt="download" />
                    </button>
                  </div>
                </div>
                {
                  searchLoading ?
                    <div className="w-[20rem] flex justify-center items-center mx-auto">
                      <img src={loadingScreen} alt="loading" className="w-full h-full" />
                    </div>
                    :
                    filterData !== null && filterData?.length !== 0 && data?.data.length !== 0 ?
                      <div className=" overflow-scroll px-5 py-2">
                        <table className="w-full container  h-full  flex flex-row flex-no-wrap  tableList my-5 text-[#2d3462]">
                          <thead className="tHeadContainer">
                            <tr className="w-full gap-2">
                              <th className="text-left pb-2 px-1 font-semibold">Employee ID</th>
                              <th className="text-left pb-2 px-1 font-semibold">Name</th>
                              <th className="text-left pb-2 px-1 font-semibold">Phone no.</th>
                              <th className="text-left pb-2 px-1 font-semibold">Joining Date</th>
                              <th className="text-left pb-2 px-1 font-semibold">Designation</th>
                              <th className="text-left pb-2 px-1 font-semibold">Department</th>
                              <th className="text-left pb-2 px-1 font-semibold">Role</th>
                              <th className="text-center pb-2 px-1 font-semibold">Action</th>
                            </tr>
                          </thead>
                          <tbody className=" w-full overflow-scroll p-1">
                            {currentTableData &&
                              currentTableData.map((item, index) => {
                                return (
                                  <tr key={index} className=" flex flex-col flex-no wrap pl-6 md:pl-0 tableDataBox sm:table-row sm:mx-0 mx-5 mb-9 sm:mb-0">
                                    <td className="min-w-[6rem] py-3 px-1 text-left">
                                      {item.employeeID}
                                    </td>
                                    <td className="py-2 px-1 w-auto text-left my-auto ">
                                      <div className="flex">
                                        <div className="emp_img md:w-10 md:h-10 ">
                                          <img
                                            src={item.photo}
                                            className="w-[2.5rem] h-[2.5rem] object-cover rounded-full "
                                            alt={item.firstName}
                                          />
                                        </div>
                                        <div className="flex-col px-2 text-left text-[.92rem] ">
                                          <p className="font-medium">{item.firstName}</p>
                                          <p className="font-light">{item.email}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-2 px-1 text-left w-auto">{item.contact}</td>
                                    <td className="md:py-5 py-2 px-1 text-left min-w-[7rem]">
                                      {item.createdAt.slice(0, 10)}
                                    </td>
                                    <td className="md:py-5 py-2 px-1 text-left w-auto">
                                      {item.designation}
                                    </td>
                                    <td className="md:py-5 py-2 px-1 text-left w-auto">
                                      {item.department}
                                    </td>
                                    <td className="md:py-5 py-2 px-1 text-left w-auto">
                                      {item.role?.map((item, index) => {
                                        return (
                                          <p key={index} className="my-[0.2rem]">
                                            {item}
                                          </p>
                                        );
                                      })}
                                    </td>
                                    <td className="text-center p-4 w-auto">
                                      <div className="flex justify-center">
                                        <Link
                                          to={`/dashboard/employee/profile/${item?._id}`}
                                          className="hover:scale-110 "
                                        >
                                          <img src={view} alt="view icon " />
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                      :
                      <DataEmptyComponent />
                }
              </div>

              <div className="pagiNation flex  py-5 justify-end">
                {filterData && filterData?.length !== 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalCount={filterData.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                )}
              </div>
            </div>
        }
      </div>
    </div>
  );
};
export default EmployeeOverview;
