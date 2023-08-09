import React, { useState } from "react";
import SelectDateRange from "../../selectLeaveDateRange/selectLeaveDateRange";
import crossIcon from "../../../assets/departmentPopup/cross.svg";

const DateRangePopUp = (props) => {
  const {
    title,
    setEditDatePopup,
    editDataHandler,
    startingDate,
    endingDate,
    setNoOfDaysData,
  } = props;
  const [duration, setDuration] = useState("");

  return (
    <div className="popUpContainer z-50 absolute flex justify-center align-middle">
      <div className="popUp w-full lg:w-[40%] md:w-[70%] bg-white mx-4 p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className="flex md:mb-8 md:justify-end justify-center">
          <div className="cardTitle text-3xl font-bold text-center w-full">Edit</div>
          <button className="hover:scale-110" onClick={() => {
            setEditDatePopup(false);
          }}><img src={crossIcon} alt="cross icon" /></button>
        </div>
        <input
          className="border rounded-md p-3"
          type="text"
          placeholder="Title"
          disabled
          defaultValue={title}
        />
        <div className="border p-5 rounded-md">
          <SelectDateRange
            duration={duration}
            setDuration={setDuration}
            startingDate={startingDate}
            endingDate={endingDate}
            setNoOfDaysData={setNoOfDaysData}

          />
        </div>

        <div className="flex justify-center">
          <button
            className="submit-btn py-2 rounded-md w-[80%] sm:w-[60%] md:w-[30%]"
            onClick={() => {
              editDataHandler(title, duration);
              setEditDatePopup(false);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>

  );
};

export default DateRangePopUp;
