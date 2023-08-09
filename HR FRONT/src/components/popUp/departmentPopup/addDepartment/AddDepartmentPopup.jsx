import crossIcon from "../../../../assets/departmentPopup/cross.svg";
import React from "react";

const AddDepartmentPopup = (props) => {
  const {
    setAddPopup,
    title,
    setTitle,
    desc,
    setDesc,
    addDepartmentHandler
  } =
    props;

  return (
    <div className="popUpContainer z-50 absolute flex justify-center align-middle">
      <div className="popUp w-full lg:w-[40%] md:w-[70%] bg-white mx-4 p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className="flex md:mb-8 md:justify-end justify-center">
          <div className="cardTitle text-3xl font-bold text-center w-full"> Add Department</div>
          <button className="hover:scale-110" onClick={() => {
            setAddPopup(false);
          }}><img src={crossIcon} alt="cross icon" /></button>
        </div>
        <div className="border rounded-md p-3">
          <input
            className="w-full"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= 25) {
                setTitle(e.target.value);
              }
            }}
          />
        </div>
        <span className="characterLeft">{title.length}/25</span>
        <textarea
          className="border rounded-md p-3  resize-none outline-0"
          placeholder="Description"
          rows="5"
          value={desc}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              setDesc(e.target.value);
            }
          }}
        />
        <span className="characterLeft">{desc.length}/50</span>
        <div className="flex justify-center">
          <button
            className="submit-btn py-2 w-[80%] sm:w-[60%] md:w-[30%]"
            onClick={addDepartmentHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentPopup