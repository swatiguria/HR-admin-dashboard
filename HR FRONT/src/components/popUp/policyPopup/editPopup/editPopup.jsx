import crossIcon from "../../../../assets/departmentPopup/cross.svg";
import React from "react";
import SweetAlertComponent from "../../../SweetAlertComponent/SweetAlertComponent";

const EditPopUp = (props) => {
  const {
    setEditPopup,
    editData,
    setEditData,
    editPolicyHandler
  } = props;

  return (
    <div className="popUpContainer z-50 absolute flex justify-center align-middle">
      <div className="popUp w-full lg:w-[40%] md:w-[70%] bg-white mx-4 p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className="flex md:mb-8 md:justify-end justify-center">
          <div className="cardTitle text-3xl font-bold text-center w-full">
            Edit Policy
          </div>
          <button
            className="hover:scale-110"
            onClick={() => {
              setEditPopup(false);
            }}
          >
            <img src={crossIcon} alt="cross icon" />
          </button>
        </div>
        <div className="border rounded-md p-3">
          <input
            className="w-full"
            type="text"
            placeholder="Title"
            value={editData.title}
            onChange={(e) => {
              if (e.target.value.length <= 25) {
                setEditData((prev) => ({ ...prev, title: e.target.value }));
              }
            }}
          />

        </div>
        <span className="characterLeft">{editData.title.length}/25</span>
        <div className="relative border rounded-md  p-3 md:my-8 resize-none outline-0 flex flex-col">
          <label>Upload Doc</label>
          <input
            type="text"
            readOnly
            placeholder={editData.fileName}
            className="relative "
          />
          <input
            type="file"
            className=" input_file w-full"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const maxSize = 2048000;
                if (e.target.files[0].size > maxSize) {
                  SweetAlertComponent("error", "File should not be more than 2mb");
                } else {
                  setEditData((prev) => ({
                    ...prev,
                    fileUpload: e.target.files[0],
                    fileSize: e.target.files[0].size,
                    fileName: e.target.files[0].name,
                  }));
                }
              }

            }}
          />
        </div>
        <br />
        <div className="flex justify-center">
          <button
            className="submit-btn py-2 w-[80%] sm:w-[60%] md:w-[30%]"
            onClick={() => {
              editPolicyHandler(editData?._id);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopUp