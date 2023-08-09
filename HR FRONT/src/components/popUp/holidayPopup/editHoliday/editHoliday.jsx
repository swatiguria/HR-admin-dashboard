import crossIcon from "../../../../assets/holiday/cross.svg";
import DatePickerComponent from "../../../DatePickerComponent/DatePickerComponent";
const EditHoliday = (props) => {
  const {
    setEditPopup,
    editHolidayHandler,
    specificId,
    date,
    setDate,
    occassion,
    setOccassion,
  } = props;
  return (
    <div className="popUpContainer z-50 absolute flex justify-center align-middle">
      <div className="popUp w-full lg:w-[30%] md:w-[70%] mx-4 bg-white p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className=" md:mb-8 flex justify-end w-full">
          <div className="cardTitle text-3xl font-bold text-end">Edit</div>
          <button
            className="hover:scale-110 ms-[32%]"
            onClick={() => {
              setEditPopup(false);
            }}
          >
            <img src={crossIcon} alt="cross icon" />
          </button>
        </div>

        <div className="border rounded-md p-1">
          <div className="inputHolder">Date</div>
          <DatePickerComponent
            onChange={(date) => {
              setDate(date);
            }}
            value={date}
          />
        </div>
        <div className="border rounded-md p-1">
          <div className="inputHolder">Occassion</div>
          <input
            className="inputTag w-full"
            type="text"
            placeholder="Enter Occassion"
            value={occassion}
            onChange={(e) => {
              if (
                e.target.value.length <= 30
              ) {
                setOccassion(e.target.value);
              }
            }}
          />
        </div>
        <span className="characterLeft">{occassion.length}/30</span>
        <div className="flex justify-center">
          <button
            className="submit-btn py-2 rounded-md w-[80%] sm:w-[60%] md:w-[30%]"
            onClick={() => {
              editHolidayHandler(specificId, date, setOccassion);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditHoliday;
