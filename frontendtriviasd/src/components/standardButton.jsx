//Componente de botón estándar que recibe un texto y una función onClick

//Imports
import React from "react";

export default function StandardButton({ text, onClick , size , type , isCorrect , isIncorrect , waiting }) {


    let baseClasses = "bg-[#FF0033] text-white text-3xl  py-2 px-4 rounded-tl-3xl rounded-br-3xl mx-16 my-5 font-serif";

    let colorClass;
    if (waiting) {
        colorClass = "bg-gray-500";
    } else {
        colorClass = isCorrect ? "bg-green-500" : isIncorrect ? "bg-gray-900" : "bg-[#FF0033]";
    }
    // Añadir clases de tamaño basadas en el argumento size
    let sizeClasses;
    switch (size) {
        case 'tiny':
            sizeClasses = "w-32 h-10 text-xl";
            break
        case 'small':
            sizeClasses = "w-40 h-15 text-2xl";
            break;
        case 'medium':
            sizeClasses = "w-56 h-24";
            break;
        case 'large':
            sizeClasses = "w-72 h-36";
            break;
        default:
            sizeClasses = "w-36 h-12";
    }


    let buttonClasses = `${baseClasses} ${sizeClasses} ${colorClass}`;

    return (
        <button
        type={type}
        onClick={onClick}
        className={buttonClasses}
        >
        {text}
        </button>
    );
}