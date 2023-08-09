import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SelectDateRange = ({ setDuration, duration, startingDate, endingDate, setNoOfDaysData }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(startingDate),
      endDate: new Date(endingDate),
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


  const getDays = (date) => new Date(date) / 1000 / 60 / 60 / 24;
  useEffect(() => {
    setNoOfDaysData(
      Math.abs(getDays(range[0].startDate) - getDays(range[0].endDate)) + 1
    );
  }, [range, setNoOfDaysData]);

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


  return (
    <>
      <div className="w-full">
        <div className="calendarWrap" ref={refOne}>
          <input
            value={duration}
            readOnly
            className="inputBox bg-transparent w-full"
            onClick={() => {
              setOpen(!open);
            }}

          />
          <div >
            {open && (
              <DateRange
                onChange={(item) => dateHandle([item.selection])}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={1}
                direction="horizontal"
                className="calendarElement absolute z-10 "
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