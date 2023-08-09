
import crossIcon from "../../../../assets/leaveSettings/cross.svg";
import SelectComponent from "../../../SelectComponent/SelectComponent";

import React from "react";

const EditLeavePopup = (props) => {
  const { editData, setEditData, setEditPopup, editLeaveHandler } = props;
  const leaveOptions = [
    { value: "Medical Leave", label: "Medical Leave" },
    { value: "Casual Leave", label: "Casual Leave" },
    { value: "Loss of Pay", label: "Loss of Pay" },
    { value: "Sick leave", label: "Sick leave" },
  ];

  return (
    <div className="popUpContainer z-50 absolute flex justify-center align-middle">
      <div className="popUp w-full lg:w-[40%] md:w-[70%] bg-white mx-4 p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className="grid ">
          <div className=" columns-2">
            <div className=" text-end  pt-2 font-bold  text-2xl text-[#2D3462;]">
              Edit
            </div>
            <div className=" text-end">
              <button
                className="hover:scale-110 "
                onClick={() => {
                  setEditPopup(false);
                }}
              >
                <img src={crossIcon} alt="cross icon" />
              </button>
            </div>
          </div></div>

        <div className="flex flex-col border  rounded-md p-1">
          <label htmlFor="gender " className=" text-[#5E6366]">
            Leave Title
          </label>
          <div className=" rounded-lg z-30">
            <SelectComponent
              options={leaveOptions}
              placeholder={"Select"}
              value={{ value: editData.leaveType, label: editData.leaveType }}
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, leaveType: e.value }));
              }}
            />
          </div>
        </div>

        <div className="flex flex-col border  rounded-md p-1 ">
          <label htmlFor="gender " className=" text-[#5E6366;]">
            No. of Days
          </label>
          <div className=" rounded-lg z-20">
            <input
              type="number"
              onChange={(e) => {
                if (e.target.value > 0) {
                  setEditData((prev) => ({ ...prev, noOfDays: e.target.value }));
                } else {
                  setEditData((prev) => ({ ...prev, noOfDays: 0 }));
                }
              }}
              className="w-full p-1"
              value={editData.noOfDays}
            />
          </div>
        </div>

        <div className="flex columns-6 border p-3  align-middle rounded-md  justify-between">
          <p className=" col-span-4 font-normal text-[#2D3462;]">
            Can it be forwarded?
          </p>
          <div>
            <input
              type="radio"
              name="radio"
              className="radio z-10"
              id="yes"
              value={true}
              checked={
                editData.canItBeForwarded === true || editData.canItBeForwarded === "true"
              }
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  canItBeForwarded: e.target.value,
                }));
              }}
            />

            <label htmlFor="yes" className="px-3">
              Yes
            </label>

            <input
              type="radio"
              name="radio"
              id="no"
              value={false}
              checked={
                editData.canItBeForwarded === false || editData.canItBeForwarded === "false"
              }
              className="radio"
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  canItBeForwarded: e.target.value,
                }));
              }}
            />
            <label htmlFor="no" className="px-3">
              No
            </label>
          </div>
        </div>

        <div className="flex columns-2 ">
          <p className="w-full  m-auto text-[#2D3462;]">
            If “YES” then how many days?
          </p>
          <div className="flex flex-col border w-full rounded-md p-1">
            <label htmlFor="gender " className=" text-[#5E6366;]">
              No. of Days
            </label>
            <div className=" rounded-lg   z-20">
              <input
                type="number"
                onChange={(e) => {
                  if (e.target.value > 0) {
                    setEditData((prev) => ({ ...prev, forwardedDays: e.target.value }));
                  } else {
                    setEditData((prev) => ({ ...prev, forwardedDays: 0 }));
                  }
                }}
                className="w-full p-1"
                value={editData.forwardedDays}
              />
            </div>
          </div>
        </div>

        <div className="flex columns-6 border p-3  align-middle rounded-md justify-between">
          <p className=" col-span-4 font-normal text-[#2D3462;]">Status</p>
          <div>
            <input
              type="radio"
              name="radio2"
              className="radio z-10"
              id="yes"
              value={true}
              checked={
                editData.status === true || editData.status === "true"
              }
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, status: e.target.value }));
              }}
            />

            <label htmlFor="yes" className="px-3 text-[#2D3462;]">
              Active
            </label>

            <input
              type="radio"
              name="radio2"
              id="no"
              value={false}
              className="radio"
              checked={
                editData.status === false || editData.status === "false"
              }
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, status: e.target.value }));
              }}
            />
            <label htmlFor="no" className="px-3 text-[#2D3462;]">
              Deactive
            </label>
          </div>
        </div>

        <div className="flex justify-center gap-7">
          <button
            className="submit-btn p-2 rounded-md"
            onClick={() => editLeaveHandler(editData?._id)}
          >
            Submit
          </button>
          <button
            className="cancel-btn py-2 rounded-md  min-w-fit px-5"
            onClick={() => {
              setEditPopup(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLeavePopup