import "./editDeptStyle.scss";
import crossIcon from "../../../../assets/departmentPopup/cross.svg";

const EditDeptPopup = (props) => {
  const { editData, setEditPopup, setEditData, editDepartmentHandler } = props;

  return (
    <div className="popUpContainer z-50 absolute flex justify-center align-middle">
      <div className="popUp w-full lg:w-[40%] md:w-[70%] mx-4 bg-white p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className="flex md:mb-8 md:justify-end justify-center">
          <div className="cardTitle text-3xl font-bold text-center w-full"> Edit Department</div>
          <button className="hover:scale-110" onClick={() => {
            setEditPopup(false);
          }}><img src={crossIcon} alt="cross icon" /></button>
        </div>
        <input
          className="border rounded-md p-3"
          type="text"
          placeholder="Title"
          value={editData.departmentName}
          onChange={(e) => {
            if (e.target.value.length <= 25) {
              setEditData((prev) => ({
                ...prev,
                departmentName: e.target.value,
              }));
            }
          }}
        />
        <span className="characterLeft">
          {editData.departmentName.length}/25
        </span>
        <textarea
          className="border rounded-md p-3"
          placeholder="Description"
          rows="5"
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              setEditData((prev) => ({
                ...prev,
                departmentDescription: e.target.value,
              }));
            }
          }}
          value={editData.departmentDescription}
        ></textarea>
        <span className="characterLeft">
          {editData.departmentDescription.length}/50
        </span>
        <div className="flex justify-center">
          <button
            className="submit-btn py-2 w-[80%] sm:w-[60%] md:w-[30%]"
            onClick={() => editDepartmentHandler(editData?._id)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDeptPopup;
