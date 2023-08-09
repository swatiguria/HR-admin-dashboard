import React, { useEffect, useState } from "react";
import crossIcon from "../../../assets/departmentPopup/cross.svg";
import SelectComponent from "../../SelectComponent/SelectComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../../../redux/actions/employeeActions";

const EditLeavePopUp = (props) => {
  const {
    title,
    setEditPopup,
    requestToDataId,
    requestToData,
    setRequestToData,
    editDataHandler
  } = props;

  const { userInfo } = useSelector((state) => state.signInUser);
  const { data: employees } = useSelector((state) => state.getAllEmployees);

  const [data, setData] = useState(requestToDataId)
  const [labelData, setLabelData] = useState(requestToData)
  const [managerOptions, setManagerOptions] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (employees?.data) {
      setManagerOptions([]);
      employees?.data.filter(item => !(item._id === userInfo._id)).forEach((val) => {
        setManagerOptions((managerOptions) => [
          ...managerOptions,
          {
            value: val?._id,
            label: val.firstName,
          },
        ]);
      });
    }
  }, [employees, userInfo]);
  return (
    <div className="popUpContainer z-50 absolute flex justify-center align-middle">
      <div className="popUp w-full lg:w-[40%] md:w-[70%] bg-white mx-4 p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className="flex md:mb-8 md:justify-end justify-center">
          <div className="cardTitle text-3xl font-bold text-center w-full">Edit</div>
          <button className="hover:scale-110" onClick={() => {
            setEditPopup(false);
          }}><img src={crossIcon} alt="cross icon" /></button>
        </div>
        <input className="border rounded-md p-3" type="text" placeholder="Title" disabled defaultValue={title} />

        <div className="border rounded-md p-3 md:my-8">
          <SelectComponent
            options={managerOptions}
            placeholder={"Select Status Type"}
            onChange={(type) => {
              setData(type.value);
              setLabelData(type.label)
              setRequestToData(type.label)
            }}
            value={{ label: labelData, value: labelData }}
          />
        </div>

        <div className="flex justify-center">
          <button className="submit-btn py-2 rounded-md w-[80%] sm:w-[60%] md:w-[30%]"
            onClick={(e) => {
              editDataHandler(title, data);
              setEditPopup(false);
            }}>Update</button>

        </div>
      </div>
    </div>
  );
};

export default EditLeavePopUp;
