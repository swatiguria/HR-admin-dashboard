import React from "react";
import ReadMore from "../../ReadMore/ReadMore";
import CapitalizeFirstLetter from "../../CapitalizeFirstLetter/CapitalizeFirstLetter";

export default function EmployeeAdditionalInformation({ data }) {
  return (
    <div >
      <div className="flex justify-between py-3">
        <div>
          <div className="flex py-2 gap-2">
            <p className="contact_label">Address:  </p>
            <ReadMore>{data && data?.data?.address}</ReadMore>
          </div>
          <div className="flex py-2 gap-2">
            <p className="contact_label">Joining date: </p>
            <p>{data && data?.data?.createdAt.split("T")[0]}</p>
          </div>
          <div className="flex py-2 gap-2">
            <p className="contact_label">Reports To: </p>
            <p>{data && data?.data?.reportsTo?.firstName}</p>
          </div>
        </div>
        <div>
          <div className="flex py-2 gap-2 ">
            <p className="contact_label">Technical Skills:</p>
            <p >
              {data && data?.data?.skills.map((skill, index) => {
                return (
                  <span key={index} >
                    #{skill.trim() + " "}
                  </span>
                )
              })}</p>
          </div>
          <div className="flex py-2 gap-2">
            <p className="contact_label">Designation:  </p>
            <p>{data && data?.data?.designation}</p>
          </div>
          <div className="flex py-2 gap-2">
            <p className="contact_label">People who reports:</p>
            <p> {data && data?.data?.teamMates?.map((teamMate, index) => {
              return (
                <span key={index}>
                  {
                    index === data?.data?.teamMates.length - 1 ?
                      teamMate
                      :
                      teamMate + ", "
                  }
                </span>
              )

            })}</p>
          </div>
        </div>
        <div>
        </div>
        <div>
          <div className="flex py-2 gap-2">
            <p className="contact_label">Technical Experience:  </p>
            <p>As a {data && data?.data?.designation}</p>
          </div>
          <div className="flex py-2 gap-2">
            <p className="contact_label">Department:  </p>
            <p>{data && data?.data?.department}</p>
          </div>

        </div>
      </div>

      <div className="py-3 ">
        <h2 className=" text-[#474E77;] font-medium">Education</h2>
        {
          data && data?.data?.education.map((item, index) => {
            return (
              <div className="education_content py-2 px-2 my-2 rounded-lg flex justify-between" key={index}>
                <div className="flex-1">
                  <p className="contact_label text-sm">Field of Study</p>
                  <CapitalizeFirstLetter>{item?.field}</CapitalizeFirstLetter>
                </div>
                <div className="flex-1">
                  <p className="contact_label text-sm">Degree</p>
                  <CapitalizeFirstLetter>{item?.degree}</CapitalizeFirstLetter>
                </div>
                <div className="flex-1">
                  <p className="contact_label text-sm">University</p>
                  <CapitalizeFirstLetter>{item?.university}</CapitalizeFirstLetter>
                </div>
                <div className="flex-1">
                  <p className="contact_label text-sm">Start Date</p>
                  <p>{item?.startDate}</p>
                </div>
                <div className="flex-1">
                  <p className="contact_label text-sm">End Date</p>
                  <p>{item?.endDate}</p>
                </div>
                <div className="flex-1 ">
                  <p className="contact_label text-sm">Description</p>
                  <ReadMore>{item?.description}</ReadMore>
                </div>
              </div>
            )
          })
        }
      </div>


    </div>
  );
}
