//Componente de la barra de encabezado superior

//Imports
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {

    const navigate = useNavigate();

    return (
        <header className="flex justify-center h-[8%] bg-[#FF0033]">
            <img onClick={() => navigate("/")} className=" cursor-pointer" src="pingu.png" alt="logo" ></img>
        </header>
    )
}

