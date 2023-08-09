import userModel from "../models/userSchema.js";
import forgetPasswordMailer from "../utils/forgetPasswordMailer.js";
import { result } from "../utils/supportModule.js";
import leaveSettingModel from "../models/leave_model/leaveSettingSchema.js";
import generateId from "../utils/idGenerate.js";
import bcrypt from "bcryptjs";

//add employee
export const addEmployee = async (req, res, next) => {
  try {
    let uploadImage;
    if (!("file" in req)) {
      uploadImage = "";
    } else {
      uploadImage = `http://localhost:5000/imageUpload/${req.file.filename}`;
    }
    const {
      firstName,
      lastName,
      email,
      contact,
      address,
      gender,
      marital,
      dateOfBirth,
      about,
      designation,
      department,
      reportsTo,
      teamMates,
      skills,
      education,
      workExperience,
    } = req.body;

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.send(result(null, 500, "Mail is in use", false));
    }
    const generatedEmployeeID = await generateId();
    const defaultPass = await bcrypt.hash(dateOfBirth, 12);
    const createEmployee = await userModel.create({
      firstName,
      lastName,
      email,
      employeeID: generatedEmployeeID,
      photo: uploadImage,
      contact,
      address,
      gender,
      marital,
      dateOfBirth,
      about,
      designation,
      department,
      reportsTo,
      teamMates: JSON.parse(teamMates),
      skills: JSON.parse(skills),
      education: JSON.parse(education),
      workExperience: JSON.parse(workExperience),
      role: designation === "tl" ? ["employee", "TL"] : ["employee"],
      password: defaultPass,
    });

    if (createEmployee) {
      let totalAlloted = 0;
      let totalremaining = 0;
      const activeLeaves = await leaveSettingModel.find({ status: true });
      activeLeaves.forEach((leave) => {
        createEmployee.leaveByCategory.push({
          leaveType: leave.leaveType,
          allotedLeaves: leave.noOfDays,
          remainingLeaves: leave.noOfDays,
        });
        totalAlloted = totalAlloted + leave.noOfDays;
        totalremaining = leave.noOfDays + totalremaining;
      });
      createEmployee.allotedLeaves = totalAlloted;
      createEmployee.remainingLeaves = totalremaining;
      createEmployee.save();
      res.send(
        result(createEmployee, 200, "Employee added successfully", true)
      );
    } else {
      res.send(result(null, 400, "Error in adding employee", false));
    }
  } catch (error) {
    next(error);
  }
};

//send password link

export const sendPasswordLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      const resultForForgetPassword = await forgetPasswordMailer(
        email,
        checkEmail._id
      );
      res.send(
        result(resultForForgetPassword, 200, "Reset password link send", true)
      );
    } else {
      res.send(result(null, 400, "Error in sending link", false));
    }
  } catch (error) {
    next(error);
  }
};

//show employee list
export const showEmployeeList = async (req, res, next) => {
  try {
    const readEmployeeList = await userModel.find({});
    if (readEmployeeList) {
      res.send(result(readEmployeeList, 200, "Employee list displayed", true));
    } else {
      res.send(result(null, 400, "Error in displayinging employee", false));
    }
  } catch (error) {
    next(error);
  }
};

//sow individual employee
export const showIndivisualEmployee = async (req, res, next) => {
  try {
    const individualEmployee = await userModel
      .findById(req.params.id)
      .populate("reportsTo");

    if (individualEmployee) {
      res.send(
        result(individualEmployee, 200, "individual employee displayed", true)
      );
    } else {
      res.send(
        result(null, 400, "Error in displaying individual employee", false)
      );
    }
  } catch (error) {
    next(error);
  }
};

//edit individual employee
export const editIndivisualEmployee = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contact,
      address,
      gender,
      marital,
      dateOfBirth,
      about,
      designation,
      department,
      reportsTo,
      teamMates,
      skills,
      education,
      workExperience,
      role,
    } = req.body;
    const { id } = req.params;
    const user = await userModel.findById(id);

    if ("file" in req) {
      user.photo = `http://localhost:5000/imageUpload/${req.file.filename}`;
    }

    user.education = education ? JSON.parse(education) : user?.education;

    user.workExperience = workExperience
      ? JSON.parse(workExperience)
      : user?.workExperience;

    user.skills = skills ? JSON.parse(skills) : user?.skills;

    user.teamMates = teamMates ? JSON.parse(teamMates) : user?.teamMates;

    user.reportsTo = user.reportsTo || reportsTo;

    user.save();

    const individualEmployee = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        email,
        contact,
        address,
        gender,
        marital,
        dateOfBirth,
        about,
        designation,
        department,
        reportsTo,
        role,
      }
    );

    if (individualEmployee) {
      res.send(
        result(individualEmployee, 200, "Employee details updated", true)
      );
    } else {
      res.send(result(null, 400, "Employee details not updated", false));
    }
  } catch (error) {
    next(error);
  }
};

//search employee

export const searchEmployee = async (req, res, next) => {
  try {
    const { employeeID, name, department } = req.query;

    const getEmployeeByName = await userModel
      .find({
        $and: [
          {
            employeeID: {
              $regex: employeeID ? employeeID : "",
              $options: "i",
            },
          },
          {
            $or: [
              {
                firstName: {
                  $regex: name ? name : "",
                  $options: "i",
                },
              },
              {
                lastName: {
                  $regex: name ? name : "",
                  $options: "i",
                },
              },
            ],
          },
          {
            department: {
              $regex: department ? department : "",
              $options: "i",
            },
          },
        ],
      })
      .then((data) => {
        if (data.length === 0) {
          return null;
        } else {
          return data;
        }
      });
    if (getEmployeeByName) {
      res.send(result(getEmployeeByName, 200, "Employee found", true));
    } else {
      res.send(result(null, 400, "Employee not found", false));
    }
  } catch (error) {
    next(error);
  }
};

export const getEmployeeByDepartment = async (req, res, next) => {
  try {
    const { department } = req.query;

    const employees = await userModel.find({
      department: {
        $in: [department.toUpperCase(), department, department.toLowerCase()],
      },
    });

    if (employees) {
      res.send(result(employees, 200, "Employee found", true));
    } else {
      res.send(result(null, 400, "Employee not found", false));
    }
  } catch (error) {
    next(error);
  }
};
