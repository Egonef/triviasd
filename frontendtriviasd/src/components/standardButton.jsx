//Componente de botón estándar que recibe un texto y una función onClick

//Imports
import React from "react";

export default function StandardButton({ text, onClick , width , height}) {
    return (
        <button
        onClick={onClick}
        className={`bg-[#FF0033] text-white text-3xl font-bold py-2 px-4 rounded-2xl w-${width} h-${height} mx-16 my-5`}        >
        {text}
        </button>
    );
}