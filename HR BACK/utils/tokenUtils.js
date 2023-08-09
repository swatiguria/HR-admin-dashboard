import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (error) => {
    if (error) {
      return {
        success: false,
        status: 400,
        message: error.message,
      };
    } else {
      return {
        success: true,
        data: null,
        status: 200,
        message: "Token verified",
      };
    }
  });
};
