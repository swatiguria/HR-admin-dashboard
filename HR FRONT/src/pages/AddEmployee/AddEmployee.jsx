import React from "react";
import "./AddEmployee.scss";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import DatePickerComponent from "../../components/DatePickerComponent/DatePickerComponent";
import uploadIcon from "../../assets/addEmployee/upload.svg";
import EducationForm from "../../components/educationForm";
import WorkExperience from "../../components/workExperience";
import NavBar from "../../components/navBar/navBar";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import { EmployeeLogic } from './addEmployeeLogic'
import ChipComponent from "../../components/chipComponent/chipComponent";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const {
    addEmployeeHandler,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    photo,
    contact,
    setContact,
    address,
    setAddress,
    setGender,
    setMarital,
    dateOfBirth,
    setDateOfBirth,
    about,
    setAbout,
    setDesignation,
    setDepartment,
    setReportsTo,
    teamMates,
    setTeamMates,
    skills,
    setSkills,
    educationData,
    workData,
    addEducationField,
    removeEducationFields,
    addWorkField,
    removeWorkFields,
    genderOptions,
    maritalStatus,
    departmentOptions,
    managerOptions,
    onImageChange,
    designationOptions,
    submitRef
  } = EmployeeLogic()

  const navigate = useNavigate()

  return (
    <div className="flex h-screen overflow-scroll  " >
      <SideBarComponent />
      <div className=" md:gap-11 md:pt-10 pt:5 gap-5 flex flex-col items-center mx-auto">
        <NavBar heading="Add Employee" />
        <div className='min-[950px]:w-[68vw] w-[95vw] h-full overflow-scroll  flex flex-col '>

          <div className="search_input p-5 w-full rounded-xl shadow-lg">
            <div className="heading">Add New Employee</div>
            <div className="cardTitle ">Basic Information</div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="md:grid md:grid-cols-3 md:gap-6 md:w-[90%] flex flex-col gap-3">
                <div className="flex flex-col border rounded-md p-1">
                  <label htmlFor="firstNameBasic">First Name</label>
                  <input
                    className="inputTxt"
                    type="text"
                    id="firstNameBasic"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }}
                  />
                </div>
                <div className="flex flex-col border rounded-md p-1">
                  <label htmlFor="lastNameBasic">Last Name</label>
                  <input
                    className="inputTxt"
                    type="text"
                    id="lastNameBasic"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }}
                  />
                </div>
                <div className="flex flex-col border rounded-md p-1">
                  <label htmlFor="email">Email ID</label>
                  <input
                    className="inputTxt"
                    type="email"
                    id="email"
                    placeholder="Enter your mailid"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="flex flex-col border rounded-md p-1">
                  <label htmlFor="contact">Contact Number</label>
                  <input
                    className="inputTxt"
                    type="tel"
                    id="contact"
                    placeholder="Enter your contact number"
                    value={contact}
                    onChange={(e) => { setContact(e.target.value) }}

                  />
                </div>
                <div className="flex flex-col md:col-span-2 border rounded-md p-1">
                  <label htmlFor="address">Address</label>
                  <input
                    className="inputTxt"
                    type="text"
                    id="address"
                    placeholder="Enter your current address"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                  />
                </div>
                <div className="flex flex-col border rounded-md p-1">
                  <label htmlFor="gender">Gender</label>
                  <div className=" rounded-lg select_box  w-full">
                    <SelectComponent id="gender"
                      options={genderOptions}
                      placeholder={"Select"}
                      onChange={(selected) => { setGender(selected.value) }}
                    />
                  </div>
                </div>
                <div className="flex flex-col border rounded-md p-1">
                  <label htmlFor="marital">Marital Status</label>
                  <div className=" rounded-lg select_box  w-full">
                    <SelectComponent
                      id="marital"
                      options={maritalStatus}
                      placeholder={"Select"}
                      onChange={(selected) => { setMarital(selected.value) }}
                    />
                  </div>
                </div>
                <div className="flex flex-col border rounded-md p-1">
                  <label htmlFor="birthday">Date of birth</label>
                  <DatePickerComponent
                    onChange={(date) => { setDateOfBirth(date) }}
                    value={dateOfBirth}
                  />
                </div>
                <div className="flex flex-col col-span-3 border rounded-md p-1">
                  <label htmlFor="about">About</label>
                  <textarea
                    className="inputTxt outline-0 resize-none"
                    name="about"
                    id="about"
                    rows="4"
                    placeholder="Write here something..."
                    value={about}
                    onChange={(e) => { setAbout(e.target.value) }}
                  ></textarea>
                </div>
              </div>
              <div className="relative text-center w-[10rem]  bg-slate-200 h-[9rem] upload rounded-md self-center md:self-start">
                {photo ? (
                  <>
                    <img src={photo} className="h-[9rem] w-[10rem] rounded-md object-cover" alt="profile" />
                  </>
                ) :
                  (
                    <>
                      <img className="m-auto mt-5" src={uploadIcon} alt="Upload" />
                      <div className="p-2">Upload employee photo</div>
                    </>
                  )}
                <input type="file" onChange={(e) => { onImageChange(e) }} className="absolute opacity-0 top-0 left-0 h-full w-full"
                  name="avatar"
                  accept="image/png,image/jpg,image/jpeg" />
              </div>
            </div>
          </div>
          <div className="search_input w-full p-5 rounded-xl shadow-lg mt-10">
            <div className="cardTitle py-2">Additional Information</div>

            <div className="flex flex-col w-full md:flex-row gap-3">
              <div className="md:w-full w-auto flex flex-col gap-6">
                <div className="md:grid md:grid-cols-3  md:gap-6 flex flex-col gap-3">
                  <div className="flex flex-col border rounded-md  p-1">
                    <label htmlFor="designation">Designation</label>
                    <div className=" rounded-lg select_box  w-full">
                      <SelectComponent
                        id="designation"
                        options={designationOptions}
                        placeholder={"Select"}
                        onChange={(selected) => { setDesignation(selected.value) }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-md p-1">
                    <label htmlFor="deparment">Department</label>
                    <div className=" rounded-lg select_box  w-full">
                      <SelectComponent
                        id="deparment"
                        options={departmentOptions}
                        placeholder={"Select"}
                        onChange={(selected) => { setDepartment(selected.value) }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-md p-1">
                    <label htmlFor="manager">Reports To</label>
                    <div className=" rounded-lg select_box  w-full">
                      <SelectComponent
                        id="manager"
                        options={managerOptions}
                        placeholder={"Select"}
                        onChange={(selected) => { setReportsTo(selected.value) }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col border rounded-md p-1">
                    <label htmlFor="teamMates">Team Mates</label>
                    <ChipComponent value={teamMates} onChange={setTeamMates} />

                  </div>
                  <div className="flex flex-col border rounded-md p-1">
                    <label htmlFor="skills">Skills</label>
                    <ChipComponent value={skills} onChange={setSkills} />
                  </div>
                </div>
              </div>
            </div>


            <div className="cardTitle pt-4 pb-2">Education</div>

            {educationData.map((data, i) => {
              return (
                <EducationForm
                  data={data}
                  key={i}
                />
              );
            })}
            <div className="flex justify-start ">
              {educationData.length >= 1 &&
                <button

                  onClick={removeEducationFields}
                >
                  Remove
                </button>
              }
            </div>
            <div className="flex justify-end ">
              <button onClick={() => addEducationField()}>
                Add more
              </button>
            </div>

            <div className="cardTitle pt-4 pb-2">Work Experience</div>

            {workData.map((data, i) => {
              return (
                <WorkExperience
                  data={data}
                  key={i}
                />
              );
            })}
            <div className="flex justify-start ">
              {workData.length >= 1 &&
                <button
                  onClick={removeWorkFields}
                >
                  Remove
                </button>
              }
            </div>
            <div className="flex justify-end">
              <button onClick={() => addWorkField()}>
                Add more
              </button>
            </div>

            <div className=" flex py-5 justify-end">
              <button className="submit-btn text-white rounded-md py-2 px-8" ref={submitRef} onClick={addEmployeeHandler}>Submit</button>
              <button
                className=" bg-slate-400  text-white font-bold py-2 px-8 ml-6 rounded-md"
                onClick={() => {
                  navigate(-1)
                }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddEmployee;
