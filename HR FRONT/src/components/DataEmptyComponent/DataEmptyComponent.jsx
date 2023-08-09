import React from 'react';
import noResults from "../../assets/no-results (1).png"

const DataEmptyComponent = () => {
    return (
        <div className='flex m-auto items-center text-blue-900 font-semibold justify-center flex-col'>
            <div className='md:w-[8rem] md:h-[8rem] w-[5rem] h-[5rem]  errorIcon my-5' style={{ filter: "brightness(0) saturate(100%) invert(19%) sepia(53%) saturate(2951%) hue-rotate(214deg) brightness(82%) contrast(91%)" }}>
                <img src={noResults} className='w-full h-full object-contain' />
            </div>
            <p className='md:text-2xl text-xl mb-2 flex-wrap text-center'>
                Oops.. We couldn't find the data you're looking for!
            </p>

        </div>
    );
}

export default DataEmptyComponent;
