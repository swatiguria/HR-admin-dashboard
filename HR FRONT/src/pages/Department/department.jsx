import React from "react";
import { DepartmentLogic } from "./departmentLogic";
import edit from "../../assets/department/edit.svg";
import deleteIcon from "../../assets/department/delete.svg";
import AddDepartmentPopup from "../../components/popUp/departmentPopup/addDepartment/AddDepartmentPopup";
import EditDeptPopup from "../../components/popUp/departmentPopup/editDeptPopup/editDeptPopup";
import EntryCounter from "../../components/entryCounter/entryCounter";
import Pagination from "../../components/pagination/pagination";
import DeleteDept from "../../components/popUp/departmentPopup/deleteDeptPopup/deleteDept";
import ConfirmDeleteDept from "../../components/popUp/departmentPopup/confirmDeleteDept/confirmDeleteDept";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import NavBar from "../../components/navBar/navBar";
import loadingScreen from "../../assets/load.gif";
import DataEmptyComponent from "../../components/DataEmptyComponent/DataEmptyComponent";
import ReadMore from "../../components/ReadMore/ReadMore";

const Department = () => {
  const {
    data,
    title,
    setTitle,
    desc,
    setDesc,
    addDepartmentHandler,
    confirmDelete,
    setConfirmDelete,
    deletePopup,
    setDeletePopup,
    editPopup,
    setEditPopup,
    addPopup,
    setAddPopup,
    setCounter,
    counter,
    currentTableData,
    editData,
    setEditData,
    currentPage,
    PageSize,
    setCurrentPage,
    editDepartmentHandler,
    deleteDepartmentHandler,
    employees,
    openTransferEmployeesPopup,
    departmentName,
    employeesIds,
    openConfirmPopup,
    pushEmployeeIds,
    handleClick,
    loading,
    selectAllEmployee,
  } = DepartmentLogic();

  return (
    <div className="flex h-screen overflow-scroll ">
      <SideBarComponent />
      {confirmDelete && (
        <ConfirmDeleteDept
          setConfirmDelete={setConfirmDelete}
          editData={editData}
          deleteDepartmentHandler={deleteDepartmentHandler}
        />
      )}
      {deletePopup && (
        <DeleteDept
          setDeletePopup={setDeletePopup}
          editData={editData}
          employees={employees}
          departmentData={data}
          departmentName={departmentName}
          employeesIds={employeesIds}
          openConfirmPopup={openConfirmPopup}
          pushEmployeeIds={pushEmployeeIds}
          handleClick={handleClick}
          selectAllEmployee={selectAllEmployee}
        />
      )}
      {editPopup && (
        <EditDeptPopup
          setEditPopup={setEditPopup}
          editData={editData}
          setEditData={setEditData}
          editDepartmentHandler={editDepartmentHandler}
        />
      )}
      {addPopup && (
        <AddDepartmentPopup
          setAddPopup={setAddPopup}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          addDepartmentHandler={addDepartmentHandler}
        />
      )}
      <div className=" md:gap-11 md:pt-10 pt:5 gap-5 flex flex-col items-center mx-auto">
        <NavBar heading="Departments" />
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
                  className="px-5 py-2 rounded-lg hover:scale-110 add-btn "
                  onClick={() => {
                    setAddPopup(true);
                  }}
                >
                  + Add New
                </button>
              </div>
              {currentTableData !== null &&
                currentTableData.length !== 0 &&
                data ? (
                <div className=" w-full overflow-y-auto flex flex-col items-center justify-center tableBox mt-5 px-4 rounded-xl">
                  <table className="w-full container  h-full  flex flex-row flex-no-wrap  tableList my-5">
                    <thead className="tHeadContainer p-2">
                      <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 p-2">
                        <th className="text-left p-4 font-semibold">Department</th>
                        <th className="text-left p-4 font-semibold">Description</th>
                        <th className="text-center p-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      {currentTableData &&
                        currentTableData.map((val, index) => {
                          return (
                            <tr
                              key={index}
                              className="flex flex-col flex-no wrap tableDataBox sm:table-row sm:mx-0 mx-5 mb-9 sm:mb-0"
                            >
                              <td className="text-center sm:text-left p-4 flex-1 break-all md:w-[20rem]">
                                <ReadMore>{val.departmentName}</ReadMore>
                              </td>
                              <td className="text-center sm:text-left p-4 flex-1 break-all md:w-[20rem]">
                                <ReadMore>{val.departmentDescription}</ReadMore>
                              </td>
                              <td className="text-center p-4 flex-1 flex justify-evenly">
                                <button className="hover:scale-110">
                                  <img
                                    src={edit}
                                    alt="edit icon"
                                    onClick={() => {
                                      setEditPopup(true);
                                      setEditData(val);
                                    }}
                                  />
                                </button>
                                <button className="hover:scale-110">
                                  <img
                                    src={deleteIcon}
                                    alt="delete icon"
                                    onClick={() => {
                                      openTransferEmployeesPopup(val);
                                    }}
                                  />
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
                    totalCount={data && data.data.length}
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

export default Department;
