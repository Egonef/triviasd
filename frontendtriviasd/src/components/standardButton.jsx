//Componente de botón estándar que recibe un texto y una función onClick

//Imports
import React from "react";

export default function StandardButton({ text, onClick , size}) {


    let baseClasses = "bg-[#FF0033] text-white text-3xl font-bold py-2 px-4 rounded-2xl mx-16 my-5";


    // Añadir clases de tamaño basadas en el argumento size
    let sizeClasses;
    switch (size) {
        case 'small':
            sizeClasses = "w-24 h-8"; // Ajusta estos valores según tus necesidades
            break;
        case 'medium':
            sizeClasses = "w-56 h-24"; // Ajusta estos valores según tus necesidades
            break;
        case 'large':
            sizeClasses = "w-72 h-36"; // Ajusta estos valores según tus necesidades
            break;
        default:
            sizeClasses = "w-36 h-12"; // Sin tamaño adicional si 'size' no está definido o no coincide
    }


    let buttonClasses = `${baseClasses} ${sizeClasses}`;

    return (
        <button
        onClick={onClick}
        className={buttonClasses}>

        {text}
        </button>
    );
}