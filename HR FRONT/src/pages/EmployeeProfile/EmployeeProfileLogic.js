import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import {
  getSingleEmployee,
  editEmployee,
  promoteToAdmin,
} from "../../redux/actions/employeeActions";
import { useParams } from "react-router-dom";
import { eliminateNullObjects } from "../../utils/eliminateNullObjects";
import { convertToNormalText } from "../../utils/convertToNormalText";
import { validateEmail } from "../../utils/validateEmail";
import { isStringEmpty } from "../../utils/isStringEmpty";

export const EmployeeProfileLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  const { data: editState } = useSelector((state) => state.editEmployee);
  const { data, loading } = useSelector((state) => state.getSingleEmployee);
  const { data: promoted } = useSelector((state) => state.promoteToAdmin);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState();
  const [imageUpload, setImage] = useState();
  const [contact, setContact] = useState();
  const [about, setAbout] = useState();
  const [skills, setSkills] = useState();

  const [editData, setEditData] = useState({
    dateOfBirth: null,
    gender: null,
    marital: null,
    address: null,
    department: null,
    designation: null,
    reportsTo: null,
    teamMates: null,
  });

  const [workExperience, setWorkExperience] = useState([
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

  const [education, setEducation] = useState([
    {
      field: null,
      degree: null,
      university: null,
      startDate: null,
      endDate: null,
      description: null,
    },
  ]);
  const [editMode, setEditMode] = useState(false);

  const edithandler = () => {
    setEditMode(!editMode);
    setValue("1");
    if (editMode) {
      setEducation(eliminateNullObjects(education));
      setWorkExperience(eliminateNullObjects(workExperience));
    }
  };

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.role?.includes("admin")) {
        setIsAdmin(true);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    for (const i in data && data?.data) {
      Object.keys(editData).forEach((item) => {
        editData[item] = data && data?.data[item];
        return 1;
      });
    }
    setName(`${data && data?.data?.firstName + " " + data?.data?.lastName}`);
    setEmail(data && data?.data?.email);
    setPhoto(data && data?.data?.photo);
    setAbout(data && data?.data?.about);
    setContact(data && data?.data?.contact);
    setSkills(data && data?.data?.skills);
    setEducation(data && data?.data?.education);
    setWorkExperience(data && data?.data?.workExperience);
  }, [data, editData]);

  useEffect(() => {
    if (editState?.success) {
      dispatch(getSingleEmployee(id));
      edithandler();
      SweetAlertComponent("success", "Employee Edited Successfully");
      dispatch({ type: "EDIT_EMPLOYEE_SUCCESS", payload: null });
    }
  }, [editState, id, dispatch]);

  useEffect(() => {
    if (promoted?.success) {
      SweetAlertComponent("success", "Employee Promoted Successfully");
      dispatch({ type: "PROMOTE_TO_ADMIN_SUCCESS", payload: null });
      dispatch(getSingleEmployee(id));
    }
  }, [promoted, dispatch, id]);

  useEffect(() => {
    if (id) dispatch(getSingleEmployee(id));
  }, [id, dispatch]);

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

  const getValues = () => {
    const vals = Object.keys(editData).map((key) => editData[key]);
    return vals;
  };

  function submitHandler() {
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

    if (!validateEmail(email)) {
      SweetAlertComponent("error", "Email not valid");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", name.split(" ")[0]);
    formData.append(
      "lastName",
      name.split(" ")[1] !== undefined ? name.split(" ")[1] : ""
    );
    formData.append("email", email);
    if (imageUpload) {
      formData.append("imageUpload", imageUpload);
    }

    formData.append("contact", contact);
    formData.append("address", getValues()[3]);
    formData.append("gender", getValues()[1]);
    formData.append("marital", getValues()[2]);
    formData.append("dateOfBirth", getValues()[0]);
    formData.append("about", about);
    formData.append("designation", getValues()[5]);
    formData.append("department", getValues()[4]);
    formData.append(
      "reportsTo",
      getValues()[6]._id !== undefined ? getValues()[6]._id : getValues()[6]
    );
    formData.append("teamMates", JSON.stringify(getValues()[7]));
    formData.append("skills", JSON.stringify(skills));

    let educationError = 0;
    let workExperienceError = 0;

    eliminateNullObjects(education).forEach((item) => {
      Object.keys(item).map((val) => {
        if (item[val] === null) {
          educationError = 1;
        }
      });
    });

    eliminateNullObjects(workExperience).forEach((item) => {
      Object.keys(item).map((val) => {
        if (item[val] === null) {
          workExperienceError = 1;
        }
      });
    });

    formData.append(
      "education",
      JSON.stringify(eliminateNullObjects(education))
    );
    formData.append(
      "workExperience",
      JSON.stringify(eliminateNullObjects(workExperience))
    );

    if (
      name &&
      contact &&
      email &&
      educationError !== 1 &&
      workExperienceError !== 1
    ) {
      dispatch(editEmployee(data && data.data?._id, formData));
    } else if (educationError === 1) {
      eliminateNullObjects(education).forEach((item) => {
        Object.keys(item).map((val) => {
          if (item[val] === null) {
            SweetAlertComponent("error", `Enter ${convertToNormalText(val)}`);
            educationError = 1;
          }
        });
      });
    } else if (workExperienceError === 1) {
      eliminateNullObjects(workExperience).forEach((item) => {
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
          isStringEmpty(name)
            ? "Name"
            : isStringEmpty(contact)
            ? "Contact"
            : isStringEmpty(email)
            ? "email"
            : ""
        } 
        is required`
      );
    }
  }

  function promoteToAdminHandler() {
    dispatch(promoteToAdmin(data && data.data?._id, ["admin", "employee"]));
  }
  return {
    data,
    name,
    setName,
    setEmail,
    photo,
    setContact,
    about,
    setAbout,
    education,
    setEducation,
    workExperience,
    setWorkExperience,
    skills,
    setSkills,
    submitHandler,
    promoteToAdminHandler,
    editData,
    setEditData,
    editMode,
    edithandler,
    value,
    handleChange,
    onImageChange,
    isAdmin,
    loading,
  };
};
