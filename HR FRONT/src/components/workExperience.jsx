import React from 'react';
import SelectComponent from "../components/SelectComponent/SelectComponent";
import DatePickerComponent from "../components/DatePickerComponent/DatePickerComponent";
import locIcon from "../assets/addEmployee/location_on.svg"
import dateFormatter from '../utils/dateFormatter'

const WorkExperience = (props) => {
  const
    {
      data,
      editDataHandler,
      editMode,
      index
    } = props


  const designationData = [{ value: "Intern", label: "INTERN" },
  { value: "junior developer", label: "JUNIOR DEVELOPER" },
  { value: "senior developer", label: "SENIOR DEVELOPER" },
  { value: "manager", label: "MANAGER" },]

  const employeeType = [{ value: "intern", label: "INTERN" },
  { value: "Full Time", label: "FULL TIME" },]

  const handleDate = (date, type) => {
    data[type] = date;
    editMode && editDataHandler(data, index)

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    data[name] = value;
    editMode && editDataHandler(data, index)
  };

  const handleSelect = (selected, type) => {
    data[type] = selected.value;
    editMode && editDataHandler(data, index)
  };


  return (
    <div className='grid md:grid-cols-4 py-5  xxl:grid-cols-8 gap-3'>
      <div className='flex flex-col border  rounded-md p-1'>
        <label htmlFor="designation px-1">Designation</label>
        <div className=" rounded-lg select_box  w-full">
          <SelectComponent
            options={designationData}
            placeholder={"Select"}
            readOnly
            onChange={(selected) => {
              handleSelect(selected, "designation");
            }}
            value={editMode && { label: data?.designation?.toUpperCase(), value: data?.designation }}
          />
        </div>
      </div>
      <div className='flex flex-col border rounded-md p-1'>
        <label htmlFor="employment ">Employement Type</label>
        <div className=" rounded-lg select_box  w-full">
          <SelectComponent
            options={employeeType}
            placeholder={"Select"}
            readOnly
            onChange={(selected) => {
              handleSelect(selected, "employmentType");
            }}
            value={editMode && { label: data?.employmentType?.toUpperCase(), value: data?.employmentType }}
          />
        </div>
      </div>
      <div className='flex flex-col border rounded-md p-1'>
        <label>Company Name</label>
        <input
          className="inputTxt bg-transparent"
          type="text"
          placeholder="Enter Company"
          name="companyName"
          onChange={handleChange}
          value={data?.companyName}
        />
      </div>
      <div className="flex  border rounded-md p-1 justify-between">
        <div className=' w-[80%] flex flex-col'><label>Location</label>
          <input
            className="inputTxt w-[80%] bg-transparent"
            type="text"
            placeholder="Select"
            name="location"
            onChange={handleChange}
            value={data?.location}
          />
        </div>
        <div className=' self-center  '><img className=" w-full justify-end" src={locIcon} alt="locIcon" /></div>
      </div>
      <div className='flex flex-col border rounded-md p-1'>
        <label>Start Date</label>
        <DatePickerComponent
          onChange={(date) => {
            handleDate(dateFormatter(date, "dd-mm-yyyy"), "startDate");
          }}
          value={dateFormatter(data?.startDate, "yyyy-mm-dd")}
        />
      </div>
      <div className='flex flex-col border rounded-md p-1'>
        <label htmlFor="birthday">End Date</label>
        <DatePickerComponent
          onChange={(date) => {
            handleDate(dateFormatter(date, "dd-mm-yyyy"), "endDate");
          }}
          value={dateFormatter(data?.endDate, "yyyy-mm-dd")}
        />
      </div>
      <div className='flex flex-col border rounded-md p-1'>
        <label>Industry</label>
        <input
          className="inputTxt bg-transparent"
          type="text"
          placeholder="Select"
          name="industry"
          onChange={handleChange}
          value={data?.industry}
        />

      </div>
      <div className='flex flex-col border rounded-md p-1'>
        <label htmlFor="birthday">Description</label>
        <input
          className="inputTxt bg-transparent"
          type="text"
          placeholder="Select"
          name="description"
          onChange={handleChange}
          value={data?.description}
        />
      </div>

    </div>
  )
}

export default WorkExperience