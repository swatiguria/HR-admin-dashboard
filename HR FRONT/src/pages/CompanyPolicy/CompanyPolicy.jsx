import { PolicyLogic } from "./policyLogic";
import download from "../../assets/companyPolicy/download.svg";
import edit from "../../assets/companyPolicy/edit.svg";
import deleteIcon from "../../assets/companyPolicy/delete.svg";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import Navbar from "../../components/navBar/navBar";
import EntryCounter from "../../components/entryCounter/entryCounter";
import Pagination from "../../components/pagination/pagination";
import AddPopUp from "../../components/popUp/policyPopup/addPopup/addPopup";
import EditPopUp from "../../components/popUp/policyPopup/editPopup/editPopup";
import DeletePopUp from "../../components/popUp/policyPopup/deletePopup/deletePopup";
import { Link } from "react-router-dom";
import loadingScreen from "../../assets/load.gif";
import DataEmptyComponent from "../../components/DataEmptyComponent/DataEmptyComponent";

const CompanyPolicy = () => {
  const {
    isAdmin,
    data,
    title,
    setTitle,
    editData,
    setEditData,
    patchData,
    addPopup,
    setAddPopup,
    editPopup,
    setEditPopup,
    deletePopup,
    setDeletePopup,
    counter,
    setCounter,
    currentTableData,
    currentPage,
    PageSize,
    setCurrentPage,
    deletePolicyHandler,
    filehandler,
    postData,
    fileName,
    loading,
    convertDate
  } = PolicyLogic();



  return (
    <div className="flex h-screen overflow-scroll ">
      <SideBarComponent />
      {addPopup && (
        <AddPopUp
          setAddPopup={setAddPopup}
          title={title}
          setTitle={setTitle}
          addPolicyHandler={postData}
          filehandler={filehandler}
          fileName={fileName}
        />
      )}
      {editPopup && (
        <EditPopUp
          editPopup={editPopup}
          setEditPopup={setEditPopup}
          editData={editData}
          setEditData={setEditData}
          editPolicyHandler={patchData}
          filehandler={filehandler}
        />
      )}
      {deletePopup && (
        <DeletePopUp
          editData={editData}
          setDeletePopup={setDeletePopup}
          deletePolicyHandler={deletePolicyHandler}
        />
      )}
      <div className=" md:gap-11 md:pt-10 pt:5 gap-5 flex flex-col items-center mx-auto">
        {isAdmin ? (
          <Navbar heading="Company Settings" />
        ) : (
          <Navbar heading="Company Policies" />
        )}
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
                {isAdmin && (
                  <button
                    className="px-5 py-2 rounded-lg hover:scale-110 add-btn "
                    onClick={() => {
                      setAddPopup(true);
                    }}
                  >
                    + Add New
                  </button>
                )}
              </div>
              {currentTableData !== null &&
                currentTableData.length !== 0 &&
                data ? (
                <div className="overflow-y-auto flex flex-col tableBox mt-5 mx-auto rounded-xl px-4">
                  <table className="w-full container  h-full  flex flex-row flex-no-wrap  tableList my-5">
                    <thead className="tHeadContainer p-2">
                      <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 p-2">
                        <th className="text-left p-4">Policy Title</th>
                        <th className="text-left p-4">Last Modified Date</th>
                        <th className="text-left p-4">Size</th>
                        <th className="text-center p-4">Download</th>
                      </tr>
                    </thead>
                    <tbody className="flex-1 sm:flex-none h-full">
                      {currentTableData &&
                        currentTableData.map((val, index) => {
                          return (
                            <tr
                              key={index}
                              className="flex flex-col flex-no wrap tableDataBox sm:table-row sm:mx-0 mx-5 mb-9 sm:mb-0"
                            >
                              <td className="text-center sm:text-left p-4 flex-1 break-all md:w-[15rem]">
                                {val.title}
                              </td>
                              <td className="text-center sm:text-left p-4 min-w-[12.5rem]">
                                {convertDate(val.updatedAt)}
                              </td>
                              <td className="text-center sm:text-left p-4 min-w-[6rem]">
                                {(val.fileSize / 1024).toFixed(2)} Kb
                              </td>
                              <td className="text-center sm:text-left p-4">
                                <div className="flex justify-evenly p-2">
                                  {isAdmin && (
                                    <button
                                      className="hover:scale-125"
                                      onClick={() => {
                                        setEditPopup(true);
                                        setEditData(val);
                                      }}
                                    >
                                      <img src={edit} alt="edit icon" />
                                    </button>
                                  )}
                                  {isAdmin && (
                                    <button
                                      className="hover:scale-110"
                                      onClick={() => {
                                        setDeletePopup(true);
                                        setEditData(val);
                                      }}
                                    >
                                      <img src={deleteIcon} alt="delete icon" />
                                    </button>
                                  )}
                                  <button className="hover:scale-110">
                                    <Link
                                      to={val.fileUrl}
                                      download="Example-PDF-document"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <img src={download} alt="download icon" />
                                    </Link>
                                  </button>
                                </div>
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
export default CompanyPolicy;
