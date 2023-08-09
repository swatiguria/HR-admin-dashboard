import React, { useState } from "react";
import crossIcon from "../../../assets/departmentPopup/cross.svg";
import SelectComponent from "../../SelectComponent/SelectComponent";

const StatusPopUp = (props) => {
  const {
    title,
    setEditStatusPopup,
    editDataHandler,
    leaveStatus
  } = props;

  let [data, setData] = useState(leaveStatus);
  const statusOptions = [
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];
  return (
    <div className="popUpContainer z-50 absolute flex justify-center align-middle">
      <div className="popUp w-full lg:w-[40%] md:w-[70%] bg-white mx-4 p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className="flex md:mb-8 md:justify-end justify-center">
          <div className="cardTitle text-3xl font-bold text-center w-full">Edit</div>
          <button className="hover:scale-110" onClick={() => {
            setEditStatusPopup(false);
          }}><img src={crossIcon} alt="cross icon" /></button>
        </div>
        <input className="border rounded-md p-3" type="text" placeholder="Title" disabled defaultValue={title} />
        <div className="border rounded-md p-3 pt">
          {
            leaveStatus === "Pending" ?
              <SelectComponent
                options={statusOptions}
                placeholder={"Select Status Type"}
                onChange={(type) => {
                  setData(type.value);
                }}
                value={{ label: data, value: data }}
              />
              : <input type="text" disabled value={leaveStatus} />
          }

        </div>
        <div className="flex justify-center">
          <button className="submit-btn py-2 rounded-md w-[80%] sm:w-[60%] md:w-[30%]"
            onClick={(e) => {
              editDataHandler(title, data);
              setEditStatusPopup(false);
            }}>Update</button>
        </div>
      </div>
    </div>

  )
}

export default StatusPopUp