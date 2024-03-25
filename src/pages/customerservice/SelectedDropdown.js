import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';


function SelectedDropdown({ options, onSelect }) {

    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("전체");

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setOpen(false);
    };

    return(
        <>
            <div className="max-w-[500px] w-full relative z-20">
                <div onClick={() => setOpen(!open)} 
                    tabIndex={0}
                    className="w-full flex items-center justify-between py-4 px-2 border-2 border-gray-400 cursor-pointer focus:outline-none focus:border-yellow-400">
                    <p className="text-base text-gray-600 pl-2">{selectedOption}</p>
                    <MdKeyboardArrowDown className={`text-base transition-all ${open ? "rotate-180" : "rotate-0"}`} />
                </div>
                {open &&
                    <div className='absolute top-full left-0 w-full max-h-[200px] border-2 border-gray-400 z-30 bg-white overflow-y-scroll'>
                        {options.map((option, index) =>
                            <div key={index} className='flex py-2 px-3 cursor-pointer hover:bg-orange-200' onClick={() => handleOptionClick(option)}>
                                <p className='text-sm text-black py-2 pl-1 cursor-pointer'>{option}</p>
                            </div>
                        )}
                    </div>
                }
            </div>
        </>
    );
}

export default SelectedDropdown;

