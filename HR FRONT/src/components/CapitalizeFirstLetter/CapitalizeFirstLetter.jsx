import React from 'react';

const CapitalizeFirstLetter = ({ children }) => {
    const text = children ? children : "";
    return (
        <p>
            {
                text.charAt(0).toUpperCase() + text.slice(1)
            }
        </p>
    )
}

export default CapitalizeFirstLetter;
