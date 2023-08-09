import crossIcon from "../../../../assets/holiday/cross.svg";
import DatePickerComponent from "../../../DatePickerComponent/DatePickerComponent";
const AddHoliday = (props) => {
  const {
    setAddPopup,
    addHolidayHandler,
    setDateValue,
    dateValue,
    occassionValue,
    setOccassionValue,
  } = props;
  return (
    <div className="popUpContainer z-50 absolute flex justify-center align-middle">
      <div className="popUp w-full lg:w-[30%] md:w-[70%] bg-white mx-4 p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className=" md:mb-8 flex justify-end w-full">
          <div className="cardTitle text-3xl font-bold text-end">
            Add Holiday
          </div>
          <button
            className="hover:scale-110 ms-[22%]"
            onClick={() => {
              setAddPopup(false);
            }}
          >
            <img src={crossIcon} alt="cross icon" />
          </button>
        </div>
        <div className="border rounded-md p-1">
          <div className="inputHolder">Date</div>
          <DatePickerComponent
            onChange={(date) => {
              setDateValue(date);
            }}
            value={dateValue}
          />
        </div>
        <div className="border rounded-md p-1">
          <div className="inputHolder">Occassion</div>
          <input
            className="inputTag w-full"
            type="text"
            maxLength="30"
            placeholder="Enter Occassion"
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setOccassionValue(e.target.value);
              }
            }}
          />
        </div>
        <span className="characterLeft">{occassionValue.length}/30</span>
        <div className="flex justify-center">
          <button
            className="submit-btn py-2 rounded-md w-[80%] sm:w-[60%] md:w-[30%]"
            onClick={() => {
              addHolidayHandler(dateValue, occassionValue);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHoliday