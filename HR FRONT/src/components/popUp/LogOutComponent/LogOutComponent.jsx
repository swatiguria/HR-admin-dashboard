import { useEffect, useRef } from "react";
import crossIcon from "../../../assets/holiday/cross.svg"

const LogOut = (props) => {
  const { setLogOutPopUp, logOutHandler, logOutPopUp } = props;

  const refOne = useRef(null);
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setLogOutPopUp(!logOutPopUp);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);


  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setLogOutPopUp(false);
    }
  };


  return (
    <div className="popUpContainer z-50 flex justify-center align-middle fixed top-0 left-0">
      <div className="popUp w-full lg:w-[30%] md:w-[70%] bg-white p-4 md:p-10 flex flex-col drop-shadow-lg gap-5 m-auto" ref={refOne}>
        <div className="flex md:mb-8 justify-end w-full">
          <div className="cardTitle text-3xl font-bold">Logout</div>
          <button className="hover:scale-110 ms-[31%]" onClick={() => {
            setLogOutPopUp(false)
          }}><img src={crossIcon} alt="cross icon" /></button>
        </div>
        <div className="mb-9">
          <p className="text-center mb-2 sm:mb-4 confirmText">Are you sure you want to Logout ?</p>
        </div>
        <div className="flex justify-evenly">
          <button className="delete-btn py-2 rounded-md w-[80%] sm:w-[60%] md:w-[30%]" onClick={() => {
            setLogOutPopUp(false)
            logOutHandler()
          }}>Logout</button>
          <button className="cancel-btn py-2 rounded-md w-[80%] sm:w-[60%] md:w-[30%]" onClick={() => {
            setLogOutPopUp(false)
          }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default LogOut