import { useEffect, useState } from "react";
import {
  resetPassword,
  tokenValidation,
} from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import { useNavigate, useParams } from "react-router-dom";
import { isStringEmpty } from "../../utils/isStringEmpty";

export const ResetPasswordLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  const { error, data } = useSelector((state) => state.resetPassword);
  const { error: tokenError, data: tokenData } = useSelector(
    (state) => state.tokenValidation
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, token } = useParams();

  useEffect(() => {
    if (id && token) {
      dispatch(tokenValidation(id, token));
    }
  }, [id, token, dispatch]);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (tokenData?.success) {
      dispatch({ type: "TOKEN_VALIDATION_SUCCESS", payload: null });
    } else if (tokenData?.success === false) {
      navigate("/");
    }
  }, [tokenData, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      SweetAlertComponent("error", error);
      dispatch({ type: "RESET_PASSWORD_FAILED", payload: null });
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (tokenError) {
      SweetAlertComponent("error", tokenError);
      dispatch({ type: "TOKEN_VALIDATION_FAILED", payload: null });
    }
  }, [tokenError, dispatch]);

  const isMatched = (pass) => {
    if (password !== pass) {
      setError("Password does not match");
    } else {
      setError("");
    }
  };

  const resetPasswordHandler = () => {
    if (password === confirmPassword) {
      if (!isStringEmpty(password)) {
        dispatch(resetPassword(id, password));
      } else {
        SweetAlertComponent(
          "error",
          `${isStringEmpty(password) && "Password"} is required`
        );
      }
    } else {
      setError("Passwords does not match");
    }
  };

  useEffect(() => {
    if (data?.success) {
      SweetAlertComponent("success", data?.message);
      dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: null });
      setConfirmPassword("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else if (data?.success === false) {
      SweetAlertComponent("error", data?.message);
    }
  }, [data, dispatch, navigate]);

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    resetPasswordHandler,
    isMatched,
    errorMessage,
  };
};
