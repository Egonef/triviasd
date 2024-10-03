import React from "react";

export default function StandardButton({ text, onClick, size, type, isCorrect, isIncorrect, waiting, marginX, marginY }) {

    let baseClasses = "bg-[#FF0033] text-white 2xl:text-3xl sm:text-xl py-2 px-4 rounded-tl-3xl rounded-br-3xl font-serif";

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
            break;
        case 'small':
            sizeClasses = "w-40 h-15 text-2xl";
            break;
        case 'medium':
            sizeClasses = "w-56 h-24";
            break;
        case 'large':
            sizeClasses = "w-72 h-36";
            break;
        case 'huge':
            sizeClasses = "w-56 h-56 ";
            break;
        case 'long':
            sizeClasses = "w-96 h-48";
            break
        default:
            sizeClasses = "";
    }

    // Aplicar márgenes usando el atributo style
    const marginStyle = {
        marginLeft: marginX ? `${marginX}px` : '16px',
        marginRight: marginX ? `${marginX}px` : '16px',
        marginTop: marginY ? `${marginY}px` : '5px',
        marginBottom: marginY ? `${marginY}px` : '5px',
    };

    return (
        <button
            className={`${baseClasses} ${colorClass} ${sizeClasses}`}
            onClick={onClick}
            type={type}
            style={marginStyle}
        >
            {text}
        </button>
    );
}