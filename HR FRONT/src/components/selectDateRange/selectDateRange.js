import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";

import calender from "../../assets/AddLeaveForm/Calendar.svg";
import format from "date-fns/format";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SelectDateRange = ({ setDuration, setNumberOfDays }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside);
  }, []);

  const dateHandle = (val) => {
    setRange(val);
  };

  useEffect(() => {
    setDuration(
      format(range[0].startDate, "dd-MM-yyyy") +
        " to " +
        format(range[0].endDate, "dd-MM-yyyy")
    );
  }, [range, setDuration]);

  const getDays = (date) => new Date(date) / 1000 / 60 / 60 / 24;

  useEffect(() => {
    setNumberOfDays(
      Math.abs(getDays(range[0].startDate) - getDays(range[0].endDate)) + 1
    );
  }, [range, setNumberOfDays]);

  return (
    <>
      <div className="w-full  ">
        <div className="calendarWrap w-full flex flex-col" ref={refOne}>
          <div className="flex">
            <input
              value={`${format(range[0].startDate, "dd-MM-yyyy")} to ${format(
                range[0].endDate,
                "dd-MM-yyyy"
              )}`}
              readOnly
              className="inputBox bg-transparent w-full"
              onClick={() => {
                setOpen(!open);
              }}
            />
            <img
              src={calender}
              alt="calender"
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>

          <div className="relative">
            {open && (
              <DateRange
                onChange={(item) => dateHandle([item.selection])}
                editableDateInputs={true}
                ranges={range}
                months={1}
                direction="horizontal"
                className=" absolute z-10 "
                minDate={new Date()}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectDateRange;
