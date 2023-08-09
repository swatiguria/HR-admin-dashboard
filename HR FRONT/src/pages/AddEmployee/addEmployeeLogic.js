import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import { addEmployee } from "../../redux/actions/employeeActions";
import { forgotPassword } from "../../redux/actions/userActions";
import { getAllDepartments } from "../../redux/actions/departmentActions";
import { useNavigate } from "react-router-dom";
import { eliminateNullObjects } from "../../utils/eliminateNullObjects";
import { getAllEmployees } from "../../redux/actions/employeeActions";
import { validateEmail } from "../../utils/validateEmail";
import { isStringEmpty } from "../../utils/isStringEmpty";
import { convertToNormalText } from "../../utils/convertToNormalText";

export const EmployeeLogic = () => {
  const { data, error } = useSelector((state) => state.addEmployee);
  const { data: sendLink, sendEmailError } = useSelector(
    (state) => state.forgotPassword
  );
  const { userInfo } = useSelector((state) => state.signInUser);
  const { data: departments } = useSelector((state) => state.getAllDepartments);
  const { data: employees } = useSelector((state) => state.getAllEmployees);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [imageUpload, setImage] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [marital, setMarital] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [about, setAbout] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const [teamMates, setTeamMates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [workData, setWorkData] = useState([
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
  ]);

  const [educationData, setEducationData] = useState([
    {
      field: null,
      degree: null,
      university: null,
      startDate: null,
      endDate: null,
      description: null,
    },
  ]);
  const [departmentOptions, setOptions] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);

  const submitRef = useRef();

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDepartments());
    if (!userInfo.role.includes("admin")) {
      navigate(`/dashboard/employee/profile/${userInfo?._id}`);
    }
  }, [dispatch, userInfo, navigate]);

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
        }
      });
    }
  }, [employees]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const maxSize = 2048000;

      if (event.target.files[0].size > maxSize) {
        SweetAlertComponent("error", "File should not be more than 2mb");
      } else {
        setPhoto(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
      }
    }
  };

  const addEmployeeHandler = () => {
    if (contact.length > 10 || contact.length < 10) {
      SweetAlertComponent("error", "Mobile Number should be 10 digits");

      return;
    }

    if (contact.length < 0) {
      SweetAlertComponent("error", "Mobile Number cannot be negative");
      return;
    }

    if (isNaN(contact)) {
      SweetAlertComponent("error", "Mobile Number cannot be String");
      return;
    }

    let educationError = 0;
    let workExperienceError = 0;

    eliminateNullObjects(educationData).forEach((item) => {
      Object.keys(item).map((val) => {
        if (item[val] === null) {
          educationError = 1;
        }
      });
    });

    eliminateNullObjects(workData).forEach((item) => {
      Object.keys(item).map((val) => {
        if (item[val] === null) {
          workExperienceError = 1;
        }
      });
    });

    if (
      firstName &&
      lastName &&
      email &&
      gender &&
      dateOfBirth &&
      reportsTo &&
      photo &&
      educationError !== 1 &&
      workExperienceError !== 1
    ) {
      if (validateEmail(email)) {
        dispatch(addEmployee(postData()));
        if (submitRef.current) {
          submitRef.current.disabled = true;
        }
      } else {
        SweetAlertComponent("error", "Email not valid");
        if (submitRef.current) {
          submitRef.current.disabled = false;
        }
      }
    } else if (educationError === 1) {
      eliminateNullObjects(educationData).forEach((item) => {
        Object.keys(item).map((val) => {
          if (item[val] === null) {
            SweetAlertComponent("error", `Enter ${convertToNormalText(val)}`);
            educationError = 1;
          }
        });
      });
    } else if (workExperienceError === 1) {
      eliminateNullObjects(workData).forEach((item) => {
        Object.keys(item).map((val) => {
          if (item[val] === null) {
            SweetAlertComponent("error", `Enter ${convertToNormalText(val)} `);
            workExperienceError = 1;
          }
        });
      });
    } else {
      SweetAlertComponent(
        "error",
        `
        ${
          isStringEmpty(firstName)
            ? "First Name"
            : isStringEmpty(lastName)
            ? "Last Name"
            : isStringEmpty(email)
            ? "Email"
            : isStringEmpty(gender)
            ? "Gender"
            : isStringEmpty(dateOfBirth)
            ? "Date of Birth"
            : isStringEmpty(reportsTo)
            ? "Report to whom"
            : isStringEmpty(photo)
            ? "Profile Picture"
            : ""
        } 
        is required`
      );
    }
  };

  useEffect(() => {
    if (data?.success) {
      dispatch({ type: "ADD_EMPLOYEE_SUCCESS", payload: null });
      if (data && data.data.email) {
        dispatch(forgotPassword(data?.data?.email));
      }
    } else if (data?.success === false) {
      SweetAlertComponent("error", data.message);
      if (submitRef.current) {
        submitRef.current.disabled = false;
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      SweetAlertComponent("error", error.message);
      if (submitRef.current) {
        submitRef.current.disabled = false;
      }
    }
  }, [error]);

  useEffect(() => {
    if (sendEmailError) {
      SweetAlertComponent("error", sendEmailError.message);
      if (submitRef.current) {
        submitRef.current.disabled = false;
      }
    }
  }, [sendEmailError]);

  useEffect(() => {
    if (sendLink?.success) {
      SweetAlertComponent(
        "success",
        "Employee added and Link sent successfully"
      );
      if (submitRef.current) {
        submitRef.current.disabled = false;
      }
      navigate("/dashboard/employee/overview");
      dispatch({ type: "ADD_EMPLOYEE_SUCCESS", payload: null });
      dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: null });
    }
  }, [sendLink]);

  const addWorkField = () => {
    const rows = [
      ...workData,
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
    setWorkData(rows);
  };

  const addEducationField = () => {
    const rows = [
      ...educationData,
      {
        field: null,
        degree: null,
        university: null,
        startDate: null,
        endDate: null,
        description: null,
      },
    ];
    setEducationData(rows);
  };

  const removeWorkFields = (index) => {
    const rows = [...workData];
    rows.splice(index, 1);
    setWorkData(rows);
  };

  const removeEducationFields = (index) => {
    const rows = [...educationData];
    rows.splice(index, 1);
    setEducationData(rows);
  };

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

  const designationOptions = [
    { value: "intern", label: "INTERN" },
    { value: "jrdev", label: "Jr.Dev" },
    { value: "srdev", label: "Sr.Dev" },
    { value: "tl", label: "TL" },
  ];

  const postData = () => {
    const data = new FormData();
    data.append("imageUpload", imageUpload);
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("contact", contact);
    data.append("address", address);
    data.append("gender", gender);
    data.append("marital", marital);
    data.append("dateOfBirth", dateOfBirth);
    data.append("about", about);
    data.append("designation", designation);
    data.append("department", department);
    data.append("reportsTo", reportsTo);
    data.append("skills", JSON.stringify(skills));
    data.append("teamMates", JSON.stringify(teamMates));
    data.append(
      "education",
      JSON.stringify(eliminateNullObjects(educationData))
    );
    data.append(
      "workExperience",
      JSON.stringify(eliminateNullObjects(workData))
    );

    return data;
  };

  return {
    addEmployeeHandler,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    photo,
    setPhoto,
    contact,
    setContact,
    address,
    setAddress,
    gender,
    setGender,
    marital,
    setMarital,
    dateOfBirth,
    setDateOfBirth,
    about,
    setAbout,
    designation,
    setDesignation,
    department,
    setDepartment,
    reportsTo,
    setReportsTo,
    teamMates,
    setTeamMates,
    skills,
    setSkills,
    educationData,
    setEducationData,
    workData,
    setWorkData,
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
    submitRef,
  };
};
