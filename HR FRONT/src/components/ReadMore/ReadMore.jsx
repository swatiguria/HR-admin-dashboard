import React, { useState } from 'react';

const ReadMore = ({ children }) => {

    const text = children ? children : "";
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text break-all ">
            {isReadMore ? text.slice(0, 18) : text}
            {
                text.length > 18 &&
                <span onClick={toggleReadMore} className="text-[#697CE4] text-md font-semibold text-xs whitespace-nowrap cursor-pointer">
                    {isReadMore ? "...read more" : " show less"}
                </span>
            }

        </p>
    );
};

export default ReadMore;
