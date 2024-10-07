import React, { useState } from 'react';

const CustomCheckbox = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(prevState => !prevState);
    };

    return (
        <label className="inline-flex items-center">
            <input
                type="checkbox"
                id="check"
                className="hidden"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <span className={`w-7 h-7 border border-gray-300 rounded-tl-lg rounded-br-lg cursor-pointer flex items-center justify-center ${isChecked ? 'bg-[#FF0033]' : 'bg-white'}`}>
                <svg className={`w-4 h-4 text-white ${isChecked ? 'block' : 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </span>
        </label>
    );
};

export default CustomCheckbox;