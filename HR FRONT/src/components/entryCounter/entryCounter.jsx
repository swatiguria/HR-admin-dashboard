import "./entryCounterStyle.scss"
import dropdownIcon from "../../assets/arrowDropDown.svg"

export default function EntryCounter({ data, counter, setCounter }) {

  //increase counter
  const increase = () => {
    if (!(counter >= 18 || counter >= data?.length)) {

      setCounter(count => count + 1);
    }
  };

  //decrease counter
  const decrease = () => {
    if (!(counter < 2)) {
      setCounter(count => count - 1);
    }
  };

  return (
    <div className={`flex gap-3 items-center noOfList my-1 ${data === null ? "opacity-0" : data && data.length === 0 ? "opacity-0" : "opacity-100"}`}>
      <span>Show</span>
      <div className="counterContainer flex w-20  justify-around p-2">
        <div className="counterOutput self-center">{(counter < 10) ? '0' + counter : counter}</div>
        <div className=" flex flex-col self-center justify-center">
          <img src={dropdownIcon} alt="dropdownIcon" className=" rotate-180 w-3 mb-2" onClick={increase} />
          <img src={dropdownIcon} alt="dropdownIcon " className="w-3" onClick={decrease} />

        </div>
      </div>

      <span>entries</span>
    </div>

  );
}
