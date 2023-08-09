import departmentModel from "../models/departmentSchema.js";
import userModel from "../models/userSchema.js";
import { result } from "../utils/supportModule.js";

//add department

export const addDepartment = async (req, res, next) => {
  try {
    const { departmentName, departmentDescription } = req.body;
    const createDepartment = await departmentModel.create({
      departmentName,
      departmentDescription,
    });
    if (createDepartment) {
      res.status(200).json({
        success: true,
        departmentName: createDepartment.departmentName,
        departmentDescription: createDepartment.departmentDescription,
        message: "Department added",
      });
    } else {
      res.send(result(null, 200, "Invalid department", false));
    }
  } catch (error) {
    next(error);
  }
};

//show departments
export const showDepartment = async (req, res, next) => {
  try {
    const readDepartment = await departmentModel.find({});
    if (readDepartment) {
      res.send(
        result(readDepartment, 200, "Department showed successfully", true)
      );
    } else {
      res.send(result(null, 400, "Error in showing department", false));
    }
  } catch (error) {
    next(error);
  }
};

//delete department
export const deleteDepartment = async (req, res, next) => {
  try {
    const removeDepartment = await departmentModel.findByIdAndDelete(
      req.params.id
    );

    if (removeDepartment) {
      res.send(
        result(removeDepartment, 200, "Department deleted successfully", true)
      );
    } else {
      res.send(result(null, 400, "Error in removing department", false));
    }
  } catch (error) {
    next(error);
  }
};

//edit department
export const editDepartment = async (req, res, next) => {
  try {
    const editData = await departmentModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (editData) {
      res.send(result(editData, 200, "Department edited successfully", true));
    } else {
      res.send(result(null, 400, "Error in editing department", false));
    }
  } catch (error) {
    next(error);
  }
};

// delete Department
export const transferEmployees = async (req, res, next) => {
  try {
    const { employees, department } = req.body;

    for (let i = 0; i < employees.length; i++) {
      const checkUser = await userModel.findOne({ _id: employees[i] });

      if (checkUser) {
        const updated = await userModel.findByIdAndUpdate(employees[i], {
          department: department.toUpperCase(),
        });
      }
    }
    res.send(result(null, 200, "Employee transfered successfully", true));
  } catch (error) {
    next(error);
  }
};
