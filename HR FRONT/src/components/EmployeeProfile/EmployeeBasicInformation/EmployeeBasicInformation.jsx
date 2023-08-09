import React, { useState, useEffect } from "react";
import SelectComponent from "../../SelectComponent/SelectComponent";
import DatePickerComponent from "../../DatePickerComponent/DatePickerComponent";
import EducationForm from "../../educationForm";
import WorkExperience from "../../workExperience";
import ReadMore from "../../ReadMore/ReadMore"
import CapitalizeFirstLetter from "../../CapitalizeFirstLetter/CapitalizeFirstLetter";
import ChipComponent from "../../chipComponent/chipComponent";
import dateFormatter from "../../../utils/dateFormatter";
import { getAllDepartments } from "../../../redux/actions/departmentActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../../../redux/actions/employeeActions";

export default function EmployeeBasicInformation(props) {
  const { data: departments } = useSelector((state) => state.getAllDepartments);
  const { data: employees } = useSelector((state) => state.getAllEmployees);

  const {
    editMode,
    editData,
    setEditData,
    education,
    setEducation,
    workExperience,
    setWorkExperience
  } = props

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  const [managerOptions, setManagerOptions] = useState([]);
  const [departmentOptions, setOptions] = useState([]);
  const [reportsLabel, setReportsLabel] = useState([]);



  const genderOptions = [
    { value: "male", label: "MALE" },
    { value: "female", label: "FEMALE" },
  ];

  const maritalStatus = [
    { value: "unmarried", label: "UNMARRIED" },
    { value: "married", label: "MARRIED" },
    { value: "divorced", label: "DIVORCED" },
    { value: "widow", label: "WIDOW" },
  ];

  useEffect(() => {
    if (employees?.data) {
      setManagerOptions([]);
      employees?.data.forEach((val) => {
        if (val.designation === "tl") {
          setManagerOptions((managerOptions) => [
            ...managerOptions,
            {
              value: val?._id,
              label: val.firstName,
            },
          ]);
          setReportsLabel(editData?.reportsTo?.firstName)
        }
      });

    }
  }, [employees, editData]);

  const addEducationField = () => {
    const rows = [
      ...education,
      {
        field: null,
        degree: null,
        university: null,
        startDate: null,
        endDate: null,
        description: null,
      },
    ];
    setEducation(rows)
  };

  const addWorkField = () => {
    const rows = [
      ...workExperience,
      {
        designation: null,
        employmentType: null,
        companyName: null,
        location: null,
        startDate: null,
        endDate: null,
        industry: null,
        description: null,
      },
    ];
    setWorkExperience(rows)
  };

  const removeWorkFields = () => {
    const rows = [...workExperience];
    rows.splice(workExperience.length - 1, 1);

    setWorkExperience(rows)
  };

  const removeEducationFields = () => {
    const rows = [...education];
    rows.splice(education.length - 1, 1);
    setEducation(rows)
  };

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (departments?.data) {
      setOptions([]);
      departments?.data.forEach((dept) => {
        setOptions((departmentOptions) => [
          ...departmentOptions,
          {
            value: dept.departmentName,
            label: dept.departmentName,
          },
        ]);
      });
    }
  }, [departments]);

  function editDataHandler(value, attribute) {

    setEditData({ ...editData, [attribute]: value })

  }

  function editWorkDataHandler(value, index) {
    setWorkExperience(prev =>
    ([
      ...prev.map((item, id) => {
        if (id === index) {
          return value
        }
        return item
      })

    ]
    ))

  }

  function editEducationDataHandler(value, index) {
    setEducation(prev =>
    ([
      ...prev.map((item, id) => {
        if (id === index) {
          return value
        }
        return item
      })

    ]
    ))

  }

  return (
    <div>
      {!editMode && <div className="flex justify-between py-3">
        <div >
          <div className="flex py-2 gap-2">
            <p className="">Date of Birth: </p>
            <p>{editData?.dateOfBirth}</p>
          </div>
          <div className="flex py-2 gap-2">
            <p className="">Gender: </p>
            <CapitalizeFirstLetter>{editData?.gender}</CapitalizeFirstLetter>
          </div>
          <div className="flex py-2 gap-2">
            <p className="">Reports To: </p>
            <p>{editData?.reportsTo?.firstName}</p>
          </div>
        </div>
        <div>
          <div className="flex py-2 gap-2">
            <p className="">Marital Status:  </p>
            <CapitalizeFirstLetter>{editData?.marital}</CapitalizeFirstLetter>
          </div>
          <div className="flex py-2 gap-2">
            <p className="">Address:  </p>
            <ReadMore>{editData?.address}</ReadMore>
          </div>
          <div className="flex py-2 gap-2">
            <p className="">People who reports:</p>
            <p> {editData?.teamMates?.map((teamMate, index) => {
              return (
                <span key={index}>
                  {
                    index === editData?.teamMates.length - 1 ?
                      teamMate
                      :
                      teamMate + ", "
                  }
                </span>
              )

            })}</p>
          </div>
        </div>
        <div>
          <div className="flex py-2 gap-2">
            <p className="">Department:  </p>
            <CapitalizeFirstLetter>{editData?.department}</CapitalizeFirstLetter>
          </div>
          <div className="flex py-2 gap-2">
            <p className="">Designation:  </p>
            <CapitalizeFirstLetter>{editData?.designation}</CapitalizeFirstLetter>
          </div>

        </div>
      </div>}

      {editMode && <div className="flex flex-col gap-3">
        <div className="md:grid md:grid-cols-4 gap-6 w-full">
          <div className="flex flex-col border rounded-md p-1 mb-5 md:mb-0">
            <label htmlFor="birthday" className="text-xs">Date of birth</label>
            <DatePickerComponent
              onChange={(date) => {
                editDataHandler(dateFormatter(date, "dd-mm-yyyy"), "dateOfBirth")
              }}
              value={!Object.values(editData).some((x) => x === null || x === undefined) && dateFormatter(editData["dateOfBirth"], "yyyy-mm-dd")}
            />
          </div>
          <div className="flex flex-col border rounded-md p-1 mb-5 md:mb-0">
            <label htmlFor="gender" className="text-xs">Gender</label>
            <div className=" rounded-lg select_box  w-full">
              <SelectComponent
                options={genderOptions}
                placeholder={"Select"}
                onChange={(gender) => {
                  editDataHandler(gender.value, "gender")
                }}
                value={{ label: editData?.gender?.toUpperCase(), value: editData?.gender }}
              />
            </div>
          </div>
          <div className="flex flex-col border rounded-md p-1 mb-5 md:mb-0">
            <label htmlFor="marital" className="text-xs">Marital Status</label>
            <div className=" rounded-lg select_box  w-full">
              <SelectComponent
                options={maritalStatus}
                placeholder={"Select"}
                onChange={(marital) => {
                  editDataHandler(marital.value, "marital")
                }}
                value={{ label: editData?.marital?.toUpperCase(), value: editData?.marital }}
              />
            </div>
          </div>
          <div className="flex flex-col border rounded-md p-1 mb-5 md:mb-0">
            <label htmlFor="address" className="text-xs">Address</label>
            <input
              className="inputTxt"
              type="text"
              id="address"
              placeholder="Enter your current address"
              value={editData?.address}
              onChange={(e) => { editDataHandler(e.target.value, "address") }}
            />
          </div>
        </div>
        <div className="md:grid md:grid-cols-4 gap-6 w-full items-start">
          <div className="flex flex-col border rounded-md p-1 mb-5 md:mb-0">
            <label htmlFor="gender" className="text-xs">Department</label>
            <div className=" rounded-lg select_box  w-full">
              <SelectComponent
                options={departmentOptions}
                placeholder={"Select"}
                onChange={(department) => {
                  editDataHandler(department.value, "department")
                }}
                value={{ label: editData?.department?.toUpperCase(), value: editData?.department }}
              />
            </div>
          </div>
          <div className="flex flex-col border rounded-md p-1 mb-5 md:mb-0">
            <label htmlFor="gender" className="text-xs">Designation</label>
            <div className=" rounded-lg select_box  w-full">
              <input
                className="inputTxt pt-2"
                type="text"
                id="designation"
                placeholder="Enter "
                value={editData?.designation}
                onChange={(e) => { editDataHandler(e.target.value, "designation") }}
              />
            </div>
          </div>
          <div className="flex flex-col border rounded-md p-1 mb-5 md:mb-0">
            <label htmlFor="marital" className="text-xs">Reports To</label>
            <div className=" rounded-lg select_box  w-full">
              <SelectComponent
                options={managerOptions}
                placeholder={"Select"}
                onChange={(reportsTo) => {
                  editDataHandler(reportsTo.value, "reportsTo")
                  setReportsLabel(reportsTo.label)
                }}
                value={{ label: reportsLabel, value: editData?.reportsTo }}
              />
            </div>
          </div>
          <div className="flex flex-col border rounded-md p-1 mb-5 md:mb-0">
            <label htmlFor="address" className="text-xs">Team Mates</label>
            <ChipComponent value={editData?.teamMates} onChange={(val) => { editDataHandler(val, "teamMates") }}
            />
          </div>
        </div>
      </div>}

      <div className="py-3 ">

        <h2 className=" text-[#474E77;] font-medium">Education</h2>

        {!editMode && education && education.length !== 0 &&
          (
            education?.map((item, index) => {

              return (
                <div className="education_content py-2 px-2 my-2 rounded-lg flex justify-between" key={index}>
                  <div className="flex-1">
                    <p className=" text-sm">Field of Study</p>
                    <CapitalizeFirstLetter>{item?.field}</CapitalizeFirstLetter>
                  </div>
                  <div className="flex-1">
                    <p className=" text-sm">Degree</p>
                    <CapitalizeFirstLetter>{item?.degree}</CapitalizeFirstLetter>
                  </div>
                  <div className="flex-1">
                    <p className=" text-sm">University</p>
                    <CapitalizeFirstLetter>{item?.university}</CapitalizeFirstLetter>
                  </div>
                  <div className="flex-1">
                    <p className=" text-sm">Start Date</p>
                    <p>{item?.startDate}</p>
                  </div>
                  <div className="flex-1">
                    <p className=" text-sm">End Date</p>
                    <p>{item?.endDate}</p>
                  </div>
                  <div className="flex-1 ">
                    <p className=" text-sm">Description</p>
                    <ReadMore>{item?.description}</ReadMore>
                  </div>
                </div>
              )
            })
          )

        }
        {editMode && <div className="my-3 bg-transparent">
          {education?.map((item, index) => {
            return (
              <EducationForm data={item} editDataHandler={editEducationDataHandler} key={index} index={index} editMode={"true"} />
            );
          })}</div>}

        {editMode &&
          <div className="flex justify-between w-full">
            <button
              className={`${education?.length >= 1 ? "opacity-100" : "opacity-0"}`}
              onClick={removeEducationFields}
            >
              Remove
            </button>
            <button onClick={addEducationField}>
              Add more
            </button>
          </div>
        }
      </div>

      <div className="py-3 ">
        <h2 className=" text-[#474E77;] font-medium">Work Experience</h2>

        {!editMode &&
          (
            workExperience?.map((item, index) => {
              return (
                <div className="education_content py-2 my-2 rounded-lg flex justify-between px-2" key={index}>
                  <div className="flex-1 ">
                    <p className=" text-sm">Designation</p>
                    <CapitalizeFirstLetter>{item.designation}</CapitalizeFirstLetter>
                  </div>
                  <div className="flex-1 ">
                    <p className=" text-sm">Employement Type</p>
                    <CapitalizeFirstLetter>{item.employmentType}</CapitalizeFirstLetter>
                  </div>
                  <div className="flex-1 ">
                    <p className=" text-sm">Company Name</p>
                    <CapitalizeFirstLetter>{item.companyName}</CapitalizeFirstLetter>
                  </div>
                  <div className="flex-1 ">
                    <p className=" text-sm">Location</p>
                    <CapitalizeFirstLetter>{item.location}</CapitalizeFirstLetter>
                  </div>
                  <div className="flex-1 ">
                    <p className=" text-sm">Start Date</p>
                    <p>{item.startDate}</p>
                  </div>
                  <div className="flex-1 ">
                    <p className=" text-sm">End Date</p>
                    <p>{item.endDate}</p>
                  </div>
                  <div className="flex-1 ">
                    <p className=" text-sm">Industry</p>
                    <ReadMore>{item.industry}</ReadMore>
                  </div>
                  <div className="flex-1 ">
                    <p className=" text-sm">Description</p>
                    <ReadMore>
                      {item.description}
                    </ReadMore>
                  </div>
                </div>
              )
            })
          )
        }

        {editMode && <div className="my-3">{
          workExperience?.map((item, index) => {
            return (
              <WorkExperience data={item} editDataHandler={editWorkDataHandler} index={index} editMode={"true"} key={index} />
            );
          })}
        </div>
        }

        {editMode &&
          <div className="flex justify-between w-full">
            <button
              className={`${workExperience?.length >= 1 ? "opacity-100" : "opacity-0"}`}
              onClick={removeWorkFields}
            >
              Remove
            </button>
            <button onClick={addWorkField}>
              Add more
            </button>
          </div>
        }

      </div>
    </div>
  );
}
