import React from "react";
import "./applyLeaveStyle.scss";
import stastics_icon from "../../assets/AddLeaveForm/stastics_icon.svg";
import { ApplyLeaveFormLogic } from "./ApplyLeaveFormLogic";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import SelectDateRange from "../../components/selectDateRange/selectDateRange";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import NavBar from "../../components/navBar/navBar";
import { useNavigate } from "react-router-dom";

const ApplyLeaveForm = () => {

  const {
    setDateRange,
    setIsHalfDay,
    setNumberOfDays,
    setReason,
    setApprovedBy,
    addLeaveHandeler,
    allotedLeaves,
    remainingLeaves,
    setApplyLeaveType,
    leaveOptions,
    approvedBy,
    handleLeaveType,
    managerOptions,
    setApprovedByLabel,
    approvedByLabel
  } = ApplyLeaveFormLogic();


  const navigate = useNavigate()

  return (
    <div className='flex h-screen overflow-scroll '>
      <SideBarComponent />
      <div className=" md:gap-11 md:pt-10 pt:5 gap-5 flex flex-col items-center mx-auto">
        <NavBar heading="Apply Leave" />
        <div className='md:w-[68vw] w-[95vw] h-full overflow-scroll  flex flex-col '>
          <div
            className=" rounded-lg select_box sm:w-2/4   xl:w-1/4 bg-[white]"
          >
            <SelectComponent
              options={leaveOptions}
              placeholder={"Select Leave Type"}
              onChange={(type) => {
                handleLeaveType(type.value)
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="search_input text-indigo-950 flex gap-16 my-6 me-6 sm:flex-row flex-col text-center sm:text-left justify-center  p-6 rounded-lg ">
              <p className=" font-semibold">
                Total Leaves <br />
                <span className=" text-5xl font-bold">{allotedLeaves}</span>
              </p>
              <img
                className=" w-100 sm:w-auto ps-10 h-32 sm:h-auto"
                src={stastics_icon}
                alt="stastics"
              />
            </div>
            <div className="search_input text-indigo-950 flex gap-16 sm:flex-row flex-col text-center sm:text-left my-6 me-6  p-6 rounded-lg ">
              <p className=" font-semibold">
                Remaining Leaves <br />
                <span className=" text-5xl font-bold">{remainingLeaves}</span>
              </p>
              <img
                className=" w-100 sm:w-auto ps-10 h-32 sm:h-auto"
                src={stastics_icon}
                alt="stastics"
              />
            </div>
          </div>
          <div className=" max-w-4xl font-semibold mb-5  search_input p-6 rounded-lg">
            <p className="py-2">Apply Leave</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
              <div className="flex flex-col  border rounded-md p-1 z-50">
                <label htmlFor="fname">Leave Type</label>

                <SelectComponent
                  options={leaveOptions}
                  placeholder={"Select"}
                  onChange={(type) => {
                    handleLeaveType(type.value)
                    setApplyLeaveType(type.value);
                  }}
                />
              </div>
              <div className="flex flex-col border rounded-md p-1">
                <label htmlFor="birthday">Choose Dates</label>
                <div className="flex columns-3 justify-between">
                  <SelectDateRange
                    setDuration={setDateRange}
                    setNumberOfDays={setNumberOfDays}
                  />

                </div>
              </div>
              <div className="flex columns-6 border  align-middle rounded-md p-1 justify-between z-20">
                <p className=" col-span-4 font-normal">Is it a half day?</p>
                <div>
                  <input
                    type="radio"
                    name="radio"
                    className="radio"
                    id="yes"
                    value="true"
                    onChange={(e) => {
                      setIsHalfDay(e.target.value);
                    }}
                  />

                  <label htmlFor="yes" className="px-3">
                    Yes
                  </label>

                  <input
                    type="radio"
                    name="radio"
                    id="no"
                    value="false"
                    className="radio"
                    onChange={(e) => {
                      setIsHalfDay(e.target.value);
                    }}
                  />
                  <label htmlFor="no" className="px-3">
                    No
                  </label>
                </div>
              </div>
              <div className="flex justify-between border rounded-md px-3 leaves_avialable p-1">
                <p>Total number of leaves available</p>
                <p>{remainingLeaves}</p>
              </div>
              <div className="flex flex-col sm:col-span-2 border rounded-md p-1">
                <label htmlFor="about">Reason</label>
                <textarea
                  className="inputTxt font-thin"
                  name="about"
                  id="about"
                  rows="6"
                  placeholder="Write your reason for leave.."
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-col sm:col-span-2  border rounded-md p-1">
                <label htmlFor="fname">

                  Request To
                </label>
                <SelectComponent
                  options={managerOptions}
                  placeholder={"Request To"}
                  onChange={(type) => {
                    setApprovedBy(type.value)
                    setApprovedByLabel(type.label)
                  }}
                  value={{ label: approvedByLabel, value: approvedBy }}
                />
              </div>

            </div>
            <div className="flex sm:flex-row-reverse flex-col-reverse gap-5 py-4">
              <button className=" cancel-btn font-bold py-2 px-8 "
                onClick={() => {
                  navigate(-1)
                }}>
                Cancel
              </button>
              <button
                className=" submit-btn font-bold py-2 px-8"
                onClick={addLeaveHandeler}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;
