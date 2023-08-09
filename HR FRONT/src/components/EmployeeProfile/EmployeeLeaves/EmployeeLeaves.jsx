import React from "react";
import stastics_icon from "../../../assets/EmployeeProfile/stastics_icon.svg";

export default function EmployeeAdditionalInformation({ data }) {


  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="search_input text-indigo-950 flex gap-16 my-6 me-6 sm:flex-row flex-col text-center sm:text-left justify-center  p-6 rounded-lg ">
        <p className=" font-semibold">
          Annual leaves <br />
          <span className=" text-5xl font-bold">{data && data?.data?.allotedLeaves}</span>
        </p>
        <img className=" w-100 sm:w-auto ps-10 h-32 sm:h-auto" src={stastics_icon} alt="stastics" />
      </div>
      <div className="search_input text-indigo-950 flex gap-16 sm:flex-row flex-col text-center sm:text-left my-6 me-6  p-6 rounded-lg ">
        <p className=" font-semibold">
          Remaining leaves <br />
          <span className=" text-5xl font-bold">{data && data?.data?.remainingLeaves}</span>
        </p>
        <img className=" w-100 sm:w-auto ps-10 h-32 sm:h-auto" src={stastics_icon} alt="stastics" />
      </div>
    </div>
  );
}
