import React from 'react';
import { useSelector } from "react-redux";
import Leaves from '../../components/leaves/Leaves/leaves';
import EmployeeLeaves from '../../components/leaves/LeavesEmployeeEnd/leavesEmployeeEnd';

const LeavesPage = () => {
  const { userInfo } = useSelector((state) => state.signInUser);

  return (
    <>
      {userInfo?.role?.includes('admin') ? <Leaves /> : <EmployeeLeaves />}
    </>
  )
}

export default LeavesPage