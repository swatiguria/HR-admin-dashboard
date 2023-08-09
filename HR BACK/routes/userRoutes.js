import express from "express";
import {
  registerAdmin,
  loginUser,
  resetPassword,
  forgotPassword,
  resetPasswordOnLogin,
  tokenValidation,
} from "../controllers/userController.js";

const route = express.Router();

route.post("/register", registerAdmin);
route.post("/login", loginUser);
route.post("/reset-password/:id", resetPassword);
route.post("/forgot-password", forgotPassword);
route.post("/token-validation/:id/:token", tokenValidation);
route.post("/reset-password-on-login/:id", resetPasswordOnLogin);

export default route;
