import React, { useEffect, useState } from "react";
import { resetPasswordOnLogin } from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SweetAlertComponent from "../../SweetAlertComponent/SweetAlertComponent";

export default function EmployeeResetPassword({ data }) {
  const { data: reset, errorMsg } = useSelector((state) => state.resetPasswordOnLogin)

  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [show, setShow] = useState(false)
  const [passwordShow, setPasswordShow] = useState(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)
  const [error, setError] = useState("")

  const dispatch = useDispatch()

  const isMatched = (pass) => {
    if (newPassword !== pass) {
      setError("Password does not match")
    }
    else {
      setError("")
    }
  }

  useEffect(() => {
    if (errorMsg) {
      SweetAlertComponent("error", errorMsg)
      dispatch({ type: "RESET_PASSWORD_ON_LOGIN_FAILED", payload: null })
    }

  }, [errorMsg, dispatch])

  const submitHandler = () => {
    if (newPassword === confirmPassword) {
      dispatch(resetPasswordOnLogin(data && data?.data?._id, oldPassword, newPassword))
    }
    else {
      setError("Password does not match")
    }

  }

  useEffect(() => {
    if (reset?.success) {
      SweetAlertComponent("success", "Password Reset Successfully")
      dispatch({ type: "RESET_PASSWORD_ON_LOGIN_SUCCESS", payload: null })
      cancelHandler()
    }
    else if (reset?.success === false) {
      SweetAlertComponent("error", reset?.message)
      dispatch({ type: "RESET_PASSWORD_ON_LOGIN_SUCCESS", payload: null })
    }
  }, [reset, dispatch])

  const cancelHandler = () => {
    setConfirmPassword("")
    setOldPassword("")
    setNewPassword("")
    setError("")
  }


  return (
    <div className="w-full flex justify-center md:items-start items-center flex-col">

      <div className=" rounded-lg search_input w-full md:w-1/2 p-2 ">
        <p className=" text-[#5E6366;]">Old Password</p>
        <div className="flex justify-between">
          {
            passwordShow ?
              <input
                type="text"
                className=" bg-transparent tracking-wider w-full"
                placeholder="Enter Password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value)
                }}
              />
              :
              <input
                type="password"
                className=" bg-transparent tracking-wider w-full"
                placeholder="Enter Password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value)
                }}
              />
          }
          {
            passwordShow ?
              <button onClick={() => { setPasswordShow(!passwordShow) }}>
                <VisibilityOffIcon />
              </button>
              :
              <button onClick={() => { setPasswordShow(!passwordShow) }}>
                <VisibilityIcon />
              </button>
          }

        </div>
      </div>
      <div className=" rounded-lg  search_input w-full md:w-1/2 p-2 my-3">
        <p className=" text-[#5E6366;]">New Password</p>
        <div className="flex justify-between">
          {
            show ?
              <input
                type="text"
                className=" bg-transparent tracking-wider w-full"
                placeholder="Enter Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                }}
              />
              :
              <input
                type="password"
                className=" bg-transparent tracking-wider w-full"
                placeholder="Enter Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                }}
              />
          }
          {
            show ?
              <button onClick={() => { setShow(!show) }}>
                <VisibilityOffIcon />
              </button>
              :
              <button onClick={() => { setShow(!show) }}>
                <VisibilityIcon />
              </button>
          }
        </div>
      </div>
      <div className=" rounded-lg  search_input w-full md:w-1/2 p-2">
        <p className=" text-[#5E6366;]">Confirm Password</p>
        <div className="flex justify-between">
          {
            confirmPasswordShow ?
              <input
                type="text"
                className=" bg-transparent tracking-wider w-full"
                placeholder="Enter Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  isMatched(e.target.value)
                }}
              />
              :
              <input
                type="password"
                className=" bg-transparent tracking-wider w-full"
                placeholder="Enter Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  isMatched(e.target.value)
                }}
              />
          }
          {
            confirmPasswordShow ?
              <button onClick={() => { setConfirmPasswordShow(!confirmPasswordShow) }}>
                <VisibilityOffIcon />
              </button>
              :
              <button onClick={() => { setConfirmPasswordShow(!confirmPasswordShow) }}>
                <VisibilityIcon />
              </button>
          }
        </div>
        <p className="text-red-400">
          {error}
        </p>
      </div>
      <div className="flex gap-8 pt-6">
        <button className="submit-btn flex gap-2 min-h-[2rem] font-semibold rounded-lg px-7 py-2 text-white  align-middle  justify-center" onClick={submitHandler}>
          Submit
        </button>

      </div>
    </div>
  );
}
