import React from "react";
import "./EmployeeProfileStyles.scss";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EmployeeBasicInformation from '../../components/EmployeeProfile/EmployeeBasicInformation/EmployeeBasicInformation'
import EmployeeAdditionalInformation from '../../components/EmployeeProfile/EmployeeAdditionalInformation/EmployeeAdditionalInformation'
import EmployeeLeaves from '../../components/EmployeeProfile/EmployeeLeaves/EmployeeLeaves'
import EmployeeResetPassword from '../../components/EmployeeProfile/EmployeeResetPassword/EmployeeResetPassword'
import { EmployeeProfileLogic } from "./EmployeeProfileLogic";
import edit from "../../assets/EmployeeProfile/Edit.svg";
import changeImageIcon from "../../assets/EmployeeProfile/changeImage.svg"
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import NavBar from "../../components/navBar/navBar";
import ReadMore from '../../components/ReadMore/ReadMore'
import ChipComponent from "../../components/chipComponent/chipComponent";
import loadingScreen from '../../assets/load.gif'
import DataEmptyComponent from "../../components/DataEmptyComponent/DataEmptyComponent"

const EmployeeProfile = () => {
    const {
        data,
        setName,
        setEmail,
        photo,
        setContact,
        about,
        setAbout,
        education,
        setEducation,
        workExperience,
        setWorkExperience,
        skills,
        setSkills,
        submitHandler,
        promoteToAdminHandler,
        editData,
        setEditData,
        editMode,
        edithandler,
        value,
        handleChange,
        onImageChange,
        isAdmin,
        loading
    } = EmployeeProfileLogic();

    return (
        <div className="flex h-screen overflow-scroll  " >
            <SideBarComponent />
            <div className=" md:gap-11 gap-5 relative flex flex-col items-center mx-auto h-full">
                <NavBar heading="Employee's Profile" />
                {
                    loading ?
                        <img src={loadingScreen} alt='loading' />
                        :
                        data !== null && data?.data !== null ?
                            <div className='md:w-[70vw] overflow-y-scroll search_input p-2 md:h-[75vh] sm:p-5 w-[95vw] rounded-lg text-[#474E77]'>
                                <div className="flex md:flex-row flex-col md:text-left text-center md:items-start items-center px-5 gap-2 w-full" >
                                    <div className="relative  flex justify-center md:items-start items-center md:w-1/4  rounded-3xl">
                                        <img src={photo ? photo : data && data?.data?.photo} className="min-w-[12rem] h-[12rem] object-cover  rounded-3xl" alt={data && data?.data?.firstName}></img>
                                        {editMode &&
                                            <div className="bg-[rgba(0,0,0,0.5)] w-full absolute top-0 h-full flex justify-center items-center flex-col  rounded-3xl">
                                                <img className=" w-[40%] z-10 opacity-80 top-[15%]" src={changeImageIcon} alt="change icon" />
                                                <p className=" top-[75%] text-[#F4F4F4;] change_Image mt-6">Change Photo</p>
                                                <input type="file" className="absolute w-full h-full rounded-lg opacity-0 z-50" onChange={(e) => onImageChange(e)} accept="image/*" />
                                            </div>
                                        }
                                    </div>

                                    <div className="md:w-3/4 w-full px-3">
                                        <div className="flex lg:flex-row flex-col justify-between  w-full  items-center">
                                            <div className="flex items-center lg:w-1/3 ">
                                                <h2 contentEditable={editMode} suppressContentEditableWarning={true} className={`font-semibold text-2xl pb-3 ${editMode && "bg-white rounded-lg p-2 "}`} onInput={(e) => { setName(e.target.textContent) }}>
                                                    {data && data?.data?.firstName + " " + data?.data?.lastName}
                                                </h2>

                                            </div>
                                            {isAdmin && <div className="flex ml-auto gap-8 pt-2  lg:flex-row flex-col lg:w-2/3 ">
                                                {!editMode && <button className="flex gap-2 ml-auto min-h-[2rem] font-semibold download-btn rounded-lg px-7 py-2   justify-center" onClick={edithandler}>
                                                    Edit <img className=" p-1" src={edit} alt="edit-icon" />
                                                </button>}
                                                {
                                                    !(data && data?.data?.role.includes("admin")) &&
                                                    <button className="add-btn ml-auto rounded-lg px-7 py-2 text-white whitespace-nowrap font-semibold " onClick={promoteToAdminHandler} >
                                                        Promote to Admin
                                                    </button>
                                                }

                                            </div>}
                                        </div>
                                        <div className="flex  lg:flex-row flex-col  w-full md:items-center">
                                            <div className=" md:w-3/4 w-full">
                                                <div className="flex py-2 gap-2 md:justify-start  items-center w-full">
                                                    <p >Contact: </p>
                                                    <p contentEditable={editMode} suppressContentEditableWarning={true} className={`${editMode && "bg-white rounded-lg p-2 "}`} onInput={(e) => { setContact(e.target.textContent) }}>{data && data?.data?.contact}</p>
                                                </div>
                                                <div className="flex py-2 gap-2 md:justify-start  items-center w-full">
                                                    <p className=" ">Email:</p>
                                                    <p contentEditable={editMode} suppressContentEditableWarning={true} className={`${editMode && "bg-white rounded-lg p-2 "}`} onInput={(e) => { setEmail(e.target.textContent) }}>{data && data?.data?.email}</p>

                                                </div >
                                                <div className="flex py-2 gap-2 md:justify-start items-center w-full">
                                                    <p >Technical Skills:</p>
                                                    {
                                                        editMode ?
                                                            <ChipComponent value={skills ? skills : data && data?.data?.skills} onChange={setSkills} />
                                                            :
                                                            <p className={`${editMode && "bg-white rounded-lg p-[.2rem] m-1 outline-0"} md:w-full`} contentEditable={editMode} suppressContentEditableWarning={true} >
                                                                {data && data?.data?.skills.map((skill, index) => {
                                                                    return (
                                                                        <span key={index} >
                                                                            #{skill.trim() + " "}
                                                                        </span>
                                                                    )
                                                                })}</p>
                                                    }


                                                </div>
                                            </div>
                                            <div className="flex flex-row gap-2 md:w-2/3 w-full">
                                                <div >About:</div>
                                                <div className="md:w-full">
                                                    {!editMode ?
                                                        data &&
                                                        <ReadMore>
                                                            {about}
                                                        </ReadMore>
                                                        :
                                                        <>
                                                            <textarea
                                                                className="rounded-lg p-2 w-full resize-none"
                                                                onChange={(e) => { if (e.target.value?.length <= 180) setAbout(e.target.value) }}
                                                                rows={4}
                                                                value={about}
                                                            ></textarea>
                                                            <span className="characterLeft">{about?.length}/180</span>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <TabContext value={value} className="w-[80%]">
                                    <div className=" pt-6 md:w-full px-7 text-sm">
                                        <TabList onChange={handleChange} variant="scrollable" allowScrollButtonsMobile className=" mt-5 rounded-md bg-[#E2E4ED]" >
                                            <Tab className="tabs w-1/4" label="Basic Information" value="1" />
                                            <Tab className="tabs w-1/4" label="Additional Information" value="2" />
                                            <Tab className="tabs w-1/4" label="Leaves" value="3" />
                                            <Tab className="tabs w-1/4" label="Reset Password" value="4" />
                                        </TabList>
                                    </div>
                                    <div>
                                        <TabPanel value="1"><EmployeeBasicInformation
                                            editMode={editMode}
                                            education={education}
                                            setEducation={setEducation}
                                            workExperience={workExperience}
                                            setWorkExperience={setWorkExperience}
                                            data={data}
                                            editData={editData}
                                            setEditData={setEditData} /></TabPanel>
                                        <TabPanel value="2"><EmployeeAdditionalInformation data={data} /></TabPanel>
                                        <TabPanel value="3"><EmployeeLeaves data={data} /></TabPanel>
                                        <TabPanel value="4"><EmployeeResetPassword data={data} /></TabPanel>
                                    </div>
                                </TabContext>

                                {editMode && value === '1' && <div className="flex gap-8 pt-2 px-7  md:flex-row flex-col h-fit justify-end">
                                    <button className="submit-btn rounded-lg px-7 py-2 text-white whitespace-nowrap font-semibold" onClick={submitHandler}>
                                        Submit
                                    </button>
                                    <button className="cancel-btn rounded-lg px-7 py-2 text-white whitespace-nowrap font-semibold" onClick={edithandler}>
                                        Cancel
                                    </button>
                                </div>}
                            </div>
                            :
                            <DataEmptyComponent />
                }
            </div>
        </div>
    );
};

export default EmployeeProfile;
