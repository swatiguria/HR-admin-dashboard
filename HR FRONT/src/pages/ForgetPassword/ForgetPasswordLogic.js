import { useEffect, useState } from "react";
import { forgotPassword } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";
import { isStringEmpty } from "../../utils/isStringEmpty";
import { useNavigate } from "react-router-dom";

export const ForgetPasswordLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);
  const { error, data } = useSelector((state) => state.forgotPassword);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      SweetAlertComponent("error", error);
      dispatch({ type: "RESET_PASSWORD_FAILED", payload: null });
    }
  }, [error, dispatch]);

  const sendEmailHandler = () => {
    if (!isStringEmpty(email)) {
      dispatch(forgotPassword(email));
    } else {
      SweetAlertComponent("error", "Email is required");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (data) {
      SweetAlertComponent("success", data?.message);
      dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: null });
    }
  }, [data, dispatch]);

  return {
    email,
    setEmail,
    sendEmailHandler,
  };
};
