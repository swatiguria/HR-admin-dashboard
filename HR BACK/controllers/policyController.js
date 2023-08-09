import policyModel from "../models/policySchema.js";
import { result } from "../utils/supportModule.js";
import fs from "fs";

//add policy
export const addPolicy = async (req, res, next) => {
  try {
    let uploadedFile;
    if (!("file" in req)) {
      uploadedFile = "";
    } else {
      uploadedFile = `http://localhost:5000/fileUpload/${req.file.filename}`;
    }
    const object = {
      title: req.body.title,
      fileUrl: uploadedFile,
      fileSize: req.body.fileSize,
      fileName: req.body.fileName,
    };
    const newPolicy = policyModel.create(object);
    if (newPolicy) {
      res.send(result(newPolicy, 200, "Policy added successfully", true));
    } else {
      res.send(result(null, 400, "Error in adding policies", false));
    }
  } catch (error) {
    next(error);
  }
};

//edit policy
export const editPolicy = async (req, res, next) => {
  try {
    const { id } = req.params;
    let uploadedFile;
    const policy = await policyModel.findById(id);
    if (!("file" in req)) {
      uploadedFile = policy.fileUrl;
    } else {
      uploadedFile = `http://localhost:5000/fileUpload/${req.file.filename}`;

      const __dirName = process.cwd();
      fs.unlinkSync(
        __dirName +
          "/uploads/fileUploads/" +
          `${policy.fileUrl.split("fileUpload/")[1]}`
      );
    }
    const object = {
      title: req.body.title,
      fileUrl: uploadedFile,
      fileSize: req.body.fileSize,
      fileName: req.body.fileName,
    };
    const editPolicyDetails = await policyModel.findByIdAndUpdate(id, object);
    if (editPolicyDetails) {
      res.send(
        result(editPolicyDetails, 200, "Policy edited successfully", true)
      );
    } else {
      res.send(result(null, 400, "Error in editing policies", false));
    }
  } catch (error) {
    next(error);
  }
};

// delete
export const deletePolicy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const __dirName = process.cwd();

    const deletePolicyDetails = await policyModel.findById(id);
    const deletePolicyDetailsDel = await policyModel.findByIdAndDelete(id);

    if (deletePolicyDetails.fileUrl) {
      fs.unlinkSync(
        __dirName +
          "/uploads/fileUploads/" +
          `${deletePolicyDetails.fileUrl.split("fileUpload/")[1]}`
      );
    }
    
    if (deletePolicyDetailsDel) {
      res.send(
        result(deletePolicyDetailsDel, 200, "Policy deleted successfully", true)
      );
    } else {
      res.send(result(null, 400, "Error in deleting policy", false));
    }
  } catch (error) {
    next(error);
  }
};

//show policies

export const showPolicy = async (req, res, next) => {
  try {
    const showPolicies = await policyModel.find({});
    if (showPolicies) {
      res.send(
        result(showPolicies, 200, "Policies displayed successfully", true)
      );
    } else {
      res.send(result(null, 400, "Error in displaying policies", false));
    }
  } catch (error) {
    next(error);
  }
};
