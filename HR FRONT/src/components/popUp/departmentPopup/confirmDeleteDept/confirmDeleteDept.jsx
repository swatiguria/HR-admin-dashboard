import "./confirmDeleteDeptStyle.scss"
import crossIcon from "../../../../assets/departmentPopup/cross.svg"

const ConfirmDeleteDept = (props) => {
  const {
    setConfirmDelete,
    editData,
    deleteDepartmentHandler
  } = props

  return (
    <div className="popUpContainer z-50 flex justify-center align-middle fixed top-0 left-0">
      <div className="popUp w-full lg:w-[40%] md:w-[70%] bg-white p-4 md:p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className="flex md:mb-8 justify-end w-full">
          <div className="cardTitle text-3xl font-bold">Delete</div>
          <button className="hover:scale-110 ms-[32%]" onClick={() => {
            setConfirmDelete(false)
          }}><img src={crossIcon} alt="cross icon" /></button>
        </div>
        <div className="mb-9">
          <p className="text-center mb-2 sm:mb-4 confirmText">Are you sure you want to delete <span className="highlighted-text">{editData.departmentName} Department </span>?</p>
          <p className="text-center instructionText font-bold">Employess transfered successfully!</p>
          <p className="text-center instructionText ">Now you can delete the department without hesitation.</p>
        </div>
        <div className="flex justify-evenly">
          <button className="delete-btn py-2 w-[40%] sm:w-[40%] md:w-[30%]" onClick={() => {
            deleteDepartmentHandler(editData?._id)
          }}>Delete</button>
          <button className="cancel-btn py-2 w-[40%] sm:w-[40%] md:w-[30%]" onClick={() => {
            setConfirmDelete(false)
          }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteDept