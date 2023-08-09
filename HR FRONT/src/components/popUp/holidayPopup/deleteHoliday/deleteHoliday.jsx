import crossIcon from "../../../../assets/holiday/cross.svg"

const DeleteHoliday = (props) => {
  const { setDeletePopup, specificData, deleteHolidayHandler, specificId } = props;
  return (
    <div className="popUpContainer z-50 absolute flex justify-center align-middle">
      <div className="popUp w-full lg:w-[30%] md:w-[70%] mx-4 bg-white p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
        <div className=" md:mb-8 flex justify-end w-full">
          <div className="cardTitle text-3xl font-bold text-end">Delete</div>
          <button className="hover:scale-110 ms-[31%]" onClick={() => {
            setDeletePopup(false)
          }}><img src={crossIcon} alt="cross icon" /></button>
        </div>
        <div className="mb-9">
          <p className="text-center mb-2 sm:mb-4 confirmText">Are you sure you want to delete</p>
          <p className="text-center highlighted-text">{specificData?.occassion} as on {specificData?.date?.split("T")[0]} ?</p>
        </div>
        <div className="flex justify-evenly">
          <button className="delete-btn py-2 rounded-md w-[80%] sm:w-[60%] md:w-[30%]" onClick={() => {
            deleteHolidayHandler(specificId)
          }}>Delete</button>
          <button className="cancel-btn py-2 rounded-md w-[80%] sm:w-[60%] md:w-[30%]" onClick={() => {
            setDeletePopup(false)
          }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteHoliday