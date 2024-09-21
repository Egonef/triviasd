//Componente de botón estándar que recibe un texto y una función onClick

//Imports
import React from "react";

export default function StandardButton({ text, onClick , size , type , isCorrect , isIncorrect }) {


    let baseClasses = "bg-[#FF0033] text-white text-3xl font-bold py-2 px-4 rounded-2xl mx-16 my-5";

    let colorClass = isCorrect ? "bg-green-500" : isIncorrect ? "bg-blue-500" : "bg-[#FF0033]";

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