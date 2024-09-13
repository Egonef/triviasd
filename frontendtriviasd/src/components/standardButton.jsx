//Imports

import React from "react";

export default function StandardButton({ text, onClick }) {
    return (
        <button
        onClick={onClick}
        className="bg-[#FF0033] text-white text-3xl font-bold py-2 px-4 rounded-2xl w-72 h-36 mx-16"
        >
        {text}
        </button>
    );
}