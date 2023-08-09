import multer from "multer";
import path from "path";

const storageFile = multer.diskStorage({
  destination: (req, file, callBack) => {
    if (file === "") {
      callBack(null, "");
    }
    callBack(null, "./uploads/fileUploads");
  },
  filename: (req, file, callBack) => {
    return callBack(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const uploadFile = multer({ storage: storageFile }).single("fileUpload");

const storageImage = multer.diskStorage({
  destination: (req, image, callBack) => {
    if (image === "") {
      callBack(null, "");
    }
    callBack(null, "./uploads/employeeImages");
  },
  filename: (req, image, callBack) => {
    return callBack(
      null,
      `${image.fieldname}_${Date.now()}${path.extname(image.originalname)}`
    );
  },
});

export const uploadImage = multer({ storage: storageImage }).single(
  "imageUpload"
);
