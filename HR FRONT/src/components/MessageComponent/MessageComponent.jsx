import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import GetMonthDateAndTime from '../../utils/GetMonthDateAndTime';


const MessageComponent = ({ item, logData }) => {

    const { timeFormat } = GetMonthDateAndTime();

    const [fName, setName] = useState("")
    const [image, setImage] = useState("")


    function getName(item) {
        logData?.forEach((items) => {
            if (item?.sender === items?._id) {
                setName(items?.firstName + " " + items?.lastName)
                setImage(items?.photo);
            }

        })

    }

    useEffect(() => {
        getName(item)
    }, [item])


    return (
        <div className="flex py-2 items-center justify-start">
            <div className="w-[2.5rem] h-[2.5rem] object-cover">
                <img
                    src={image}
                    alt="Profile "
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
            <div className=' w-4/5 pl-2'>
                <div className="flex  py-1 items-center">
                    <div className="text-[0.9rem] font-bold text-[#575968]">
                        {fName}
                    </div>
                    <div className="text-[0.75rem] font-normal ps-3">
                        {timeFormat(item.createdAt)}
                    </div>
                </div>
                <div
                    className={classnames(
                        "text-[0.9rem] text-[#575968] ",
                        {
                            "font-bold": item?.style[0],
                            "italic": item?.style[1],
                            "line-through": item?.style[2]
                        }
                    )}
                >
                    {item.text}
                </div>
            </div>
        </div>
    );
}

export default MessageComponent;
