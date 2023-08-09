import crossIcon from "../../../../assets/departmentPopup/cross.svg";
import arrow from "../../../../assets/departmentPopup/arrowForward.svg";
import { useEffect } from "react";

const DeleteDept = (props) => {
  const {
    setDeletePopup,
    editData,
    employees,
    departmentData,
    departmentName,
    employeesIds,
    openConfirmPopup,
    pushEmployeeIds,
    handleClick,
    selectAllEmployee,
  } = props;

  useEffect(() => {
    if (employees?.data?.length === 0) {
      openConfirmPopup();
    }
  }, [employees?.data]);

  return (
    <>
      {employees?.data?.length > 0 && (
        <div className="popUpContainer z-50 absolute flex justify-center align-middle">
          <div className="popUp w-full lg:w-[40%] md:w-[70%] mx-4 bg-white p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
            <div className=" md:mb-8 w-full flex justify-end">
              <div className="cardTitle text-3xl font-bold">Delete</div>
              <button
                className="hover:scale-110 ms-[35%]"
                onClick={() => {
                  setDeletePopup(false);
                }}
              >
                <img src={crossIcon} alt="cross icon" />
              </button>
            </div>
            <div>
              <p className="text-center mb-2 sm:mb-4 confirmText">
                Are you sure you want to delete{" "}
                <span className="highlighted-text">
                  {editData.departmentName} Department{" "}
                </span>
                ?
              </p>
              <p className="text-center instructionText">
                If yes then transfer employees to any other department before
                deleting the department.
              </p>
            </div>
            <div className=" flex w-full flex-col sm:flex-row justify-evenly items-center ">
              <div
                className="border w-full sm:w-[45%]  rounded-md md:my-8"
                placeholder="Description"
              >
                <div className="max-h-[12rem] overflow-scroll">
                  <div className="rounded-t-md border-b px-3 py-2 sticky top-0 bg-white">
                    <input
                      type="checkbox"
                      className="me-2"
                      onClick={() => {
                        selectAllEmployee();
                      }}
                      checked={employeesIds.length === employees?.data.length}
                    />
                    Employees Consists ({employees?.data?.length})
                  </div>
                  {employees &&
                    employees?.data.map((val, index) => {
                      return (
                        <div
                          key={index}
                          className="px-3 pb-1"
                          onClick={() => {
                            pushEmployeeIds(val?._id);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="me-2"
                            checked={employeesIds.includes(val?._id)}
                            readOnly
                          />
                          {val.firstName + " " + val.lastName}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div>
                <img src={arrow} alt="arrow not found" />
              </div>
              <div
                className="border w-full sm:w-[45%] rounded-md md:my-8"
                placeholder="Description"
              >
                <div className="max-h-[12rem] overflow-scroll">
                  <p className="rounded-t-md border-b py-2 px-3 sticky top-0 bg-white">
                    Transfer to
                  </p>
                  {departmentData &&
                    departmentData?.data
                      .filter(
                        (val) => val.departmentName !== editData.departmentName
                      )
                      .map((val, index) => {
                        return (
                          <p
                            key={index}
                            className="pb-1 px-3"
                            style={{
                              background:
                                departmentName === val.departmentName &&
                                "#697ce4",
                              color:
                                departmentName === val.departmentName &&
                                "#fff",
                            }}
                            onClick={(e) => {
                              handleClick(val.departmentName);
                            }}
                          >
                            {val.departmentName}
                          </p>
                        );
                      })}
                </div>
              </div>
            </div>
            <div className="flex justify-evenly">
              <button
                className="submit-btn py-2 w-[80%] sm:w-[60%] md:w-[30%]"
                onClick={openConfirmPopup}
              >
                Transfer
              </button>
              <button
                className="cancel-btn py-2 w-[80%] sm:w-[60%] md:w-[30%]"
                onClick={() => {
                  setDeletePopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DeleteDept;
