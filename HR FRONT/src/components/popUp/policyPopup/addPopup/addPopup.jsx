import crossIcon from "../../../../assets/departmentPopup/cross.svg"
import React from 'react'

const AddPopUp = (props) => {
    const {
        setAddPopup,
        title,
        setTitle,
        addPolicyHandler,
        filehandler,
        fileName,
        file
    } = props

    return (
        <div className="popUpContainer z-50 absolute flex justify-center align-middle">
            <div className="popUp w-full lg:w-[40%] md:w-[70%] bg-white mx-4 p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
                <div className="flex md:mb-8 md:justify-end justify-center">
                    <div className="cardTitle text-3xl font-bold text-center w-full">Add Policy</div>
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
                                setTitle(e.target.value)
                            }

                        }}
                    />

                </div>
                <span className="characterLeft">{title.length}/25</span>
                <div className="relative border rounded-md  p-3 md:my-8 resize-none outline-0 flex flex-col">
                    <label>Upload Doc</label>
                    {<input type="text" readOnly
                        placeholder="Upload PDF(Not more than 2mb)"
                        className="relative "
                        value={fileName}
                    />}
                    <input type="file"
                        className=" input_file w-full"
                        accept="application/pdf"
                        onInput={(e) => {
                            filehandler(e)
                        }}
                        value={file}
                    />
                </div>
                <br />
                <div className="flex justify-center">
                    <button className="submit-btn py-2 w-[80%] sm:w-[60%] md:w-[30%]"
                        onClick={() => {
                            addPolicyHandler();
                        }}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddPopUp