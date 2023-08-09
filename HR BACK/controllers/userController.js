import userModel from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/tokenUtils.js";
import forgetPasswordMailer from "../utils/forgetPasswordMailer.js";
import { result } from "../utils/supportModule.js";

export const registerAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const checkEmail = await userModel.findOne({
      email,
    });
    if (!checkEmail) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const createUserAccount = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      });

      if (createUserAccount) {
        res.status(200).json({
          success: true,
          _id: createUserAccount._id,
          email: createUserAccount.email,
          role: createUserAccount.role,
          message: "Account created successfully",
        });
      } else {
        res.send(result(null, 400, "Invalid user", false));
      }
    } else {
      res.send(result(null, 404, "User already exists", false));
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const checkEmail = await userModel.findOne({
      email,
    });

    if (checkEmail) {
      const isMatch = await bcrypt.compare(password, checkEmail.password);
      if (isMatch) {
        res.json({
          success: true,
          role: checkEmail.role,
          token: generateToken(checkEmail._id),
          _id: checkEmail._id,
          photo: checkEmail.photo,
          firstName: checkEmail.firstName,
          lastName: checkEmail.lastName,
        });
      } else {
        res.send(result(null, 400, "Wrong password", false));
      }
    } else {
      res.send(result(null, 404, "Invalid user", false));
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const checkUser = await userModel.findById(id);

    if (checkUser) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const isMatch = await bcrypt.compare(password, checkUser.password);
      if (isMatch) {
        res.send(
          result(
            null,
            400,
            "New password should not be same as old password",
            false
          )
        );
        return;
      }

      checkUser.password = hashedPassword;
      await checkUser.save();

      res.send(result(null, 200, "Password changed successfully", true));
    } else {
      res.send(result(null, 404, "User not found", false));
    }
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      const resultOfForget = await forgetPasswordMailer(
        email,
        checkEmail._id,
        generateToken(checkEmail._id)
      );

      res.send(result(resultOfForget, 200, `Link sent to ${email}`, true));
    } else {
      res.send(result(null, 404, "User not found", false));
    }
  } catch (error) {
    next(error);
  }
};

export const tokenValidation = async (req, res, next) => {
  try {
    const { id, token } = req.params;

    const checkEmail = await userModel.findById(id);
    if (checkEmail) {
      const response = await verifyToken(token);

      res.send(response);
    } else {
      res.send(result(null, 404, "User not found", false));
    }
  } catch (error) {
    next(error);
  }
};

export const resetPasswordOnLogin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const checkUser = await userModel.findById(id);

    if (checkUser) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      let isMatch = await bcrypt.compare(oldPassword, checkUser.password);

      if (isMatch) {
        let isMatch = await bcrypt.compare(newPassword, checkUser.password);
        if (isMatch) {
          res.send(
            result(
              null,
              400,
              "New password should not be same as old password",
              false
            )
          );
          return;
        }
        checkUser.password = hashedNewPassword;

        await checkUser.save();
        res.send(result(null, 200, "Password changed successfully", true));
      } else {
        res.send(result(null, 400, "Wrong Password", false));
      }
    } else {
      res.send(result(null, 404, "User not found", false));
    }
  } catch (error) {
    next(error);
  }
};
