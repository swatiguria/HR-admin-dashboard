import { useEffect, useRef, useState } from "react";
import { signInUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SweetAlertComponent from "../../components/SweetAlertComponent/SweetAlertComponent";

export const LoginLogic = () => {
  const { error, userInfo } = useSelector((state) => state.signInUser);

  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [remember, setRemember] = useState(localStorage.getItem("rememberMe"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const btnRef = useRef();

  useEffect(() => {
    if (userInfo?.success) {
      if (btnRef.current) {
        btnRef.current.disabled = false;
      }
      navigate("/dashboard/employee/overview");
    } else if (userInfo?.success === false) {
      if (btnRef.current) {
        btnRef.current.disabled = false;
      }
      SweetAlertComponent("error", userInfo?.message);
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (error) {
      SweetAlertComponent("error", error);
      if (btnRef.current) {
        btnRef.current.disabled = false;
      }
    }
  }, [error]);

  const loginHandler = (e) => {
    e.target.disabled = true;
    if (remember) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", remember);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
    if (email && password) {
      dispatch(signInUser(email, password));
    } else {
      SweetAlertComponent("error", "All fields are required");
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    loginHandler,
    setRemember,
    btnRef,
  };
};
