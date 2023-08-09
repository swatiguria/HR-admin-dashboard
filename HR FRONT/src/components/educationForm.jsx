import React from 'react';
import SelectComponent from "../components/SelectComponent/SelectComponent";
import DatePickerComponent from "../components/DatePickerComponent/DatePickerComponent";
import locIcon from "../assets/addEmployee/location_on.svg"
import dateFormatter from '../utils/dateFormatter'

const EducationForm = (props) => {

  const
    {
      data,
      editDataHandler,
      editMode,
      index
    } = props

  const fieldOfStudyData = [
    { value: "engineering", label: "ENGINEERING" },
    { value: "arts", label: "ARTS" },
    { value: "finance", label: "FINANCE" },
    { value: "law", label: "LAW" }]

  const degreeData = [
    { value: "bachelors", label: "BACHELORS" },
    { value: "masters", label: "MASTERS" },
    { value: "phd", label: "PHD" },]

  const handleChange = (e) => {

    const { name, value } = e.target;
    data[name] = value;
    editMode && editDataHandler(data, index)

  };

  const handleSelect = (selected, type) => {
    data[type] = selected.value;
    editMode && editDataHandler(data, index)

  };

  const handleDate = (date, type) => {
    data[type] = date;
    editMode && editDataHandler(data, index)

  };


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 py-5 gap-3 w-full">
        <div className="flex flex-col border rounded-md p-1 w-full">
          <label>Field of Study</label>
          <div className=" rounded-lg select_box  w-full">
            <SelectComponent
              options={fieldOfStudyData}
              placeholder={"Select"}
              readOnly
              onChange={(selected) => {
                handleSelect(selected, "field");
              }}
              value={editMode && { label: data?.field?.toUpperCase(), value: data?.field }}
            />
          </div>
        </div>
        <div className="flex flex-col border rounded-md p-1">
          <label htmlFor="gender">Degree</label>
          <div className=" rounded-lg select_box  w-full">
            <SelectComponent
              options={degreeData}
              placeholder={"Select"}
              readOnly
              onChange={(selected) => {
                handleSelect(selected, "degree");
              }}
              value={editMode && { label: data?.degree?.toUpperCase(), value: data?.degree }}
            />
          </div>
        </div>
        <div className="flex  border rounded-md p-1 justify-between">
          <div className=' w-[80%] flex flex-col '><label>University</label>
            <input
              className="w-[90%] bg-transparent"
              type="text"
              placeholder="Enter"
              name="university"
              onChange={handleChange}
              value={data?.university}
            />
          </div>
          <div className=' self-center  '><img className=" w-full justify-end" src={locIcon} alt="locIcon" /></div>
        </div>
        <div className="flex flex-col border rounded-md p-1">
          <label>Start Date</label>
          <DatePickerComponent
            onChange={(date) => {
              handleDate(dateFormatter(date, "dd-mm-yyyy"), "startDate");
            }}
            value={dateFormatter(data?.startDate, "yyyy-mm-dd")}
          />
        </div>
        <div className="flex flex-col border rounded-md p-1">
          <label>End Date</label>
          <DatePickerComponent
            onChange={(date) => {
              handleDate(dateFormatter(date, "dd-mm-yyyy"), "endDate");
            }}
            value={dateFormatter(data?.endDate, "yyyy-mm-dd")}
          />
        </div>
        <div className="flex flex-col border rounded-md p-1">
          <label htmlFor="fname">Description</label>
          <input
            className="inputTxt bg-transparent"
            type="text"
            id="fname"
            placeholder="Write Something.."
            name="description"
            onChange={handleChange}
            value={data?.description}
          />
        </div>
      </div>
    </>
  )
}

export default EducationForm