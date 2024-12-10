//Componente de la barra de encabezado superior

//Imports
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {

    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 w-full flex justify-center h-[26%]">
            <img onClick={() => navigate("/")} className=" cursor-pointer" src="pingu.png" alt="logo" ></img>
        </header>
    )
}

