//Pagina principal del presentador (WIP: No sabemos si mostrar una seleccion de equipos si se hará automaticamente, se decidirá tras hacer el registro de equipos)

//Imports

import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

//Componentes

import Header from '../components/header';
import StandardButton from '../components/standardButton';


export default function Presentador(){

    //Estado para almacenar los equipos registrados
    const [registeredTeams, setRegisteredTeams] = useState([]);

    //Solicitud a la API para obtener los equipos registrados
    async function getTeams() {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/admin/getTeams'); //Cambiar la dirección IP por la de la máquina que corre el backend
            console.log(response.data);
            setRegisteredTeams(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    //Llamamos a la función para obtener los equipos registrados al cargar la página
    useEffect(() => {
        getTeams();
    });

    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <div className="flex flex-col items-center h-[92%] pt-44">
                <h1 className="text-4xl"><b>Escoge los equipos participantes:</b></h1>
                <div className='flex flex-col h-[70%] w-[70%] mt-10 bg-gray-400 rounded-lg shadow-2xl'>
                    <div className='flex items-center justify-center h-[15%] w-full bg-gray-600 rounded-t-md'>
                        <StandardButton text="Recargar" onClick={getTeams} size="tiny"/>
                    </div>
                    <div className='flex flex-col items-center h-[85%] w-full overflow-scroll'>
                        {registeredTeams.map((team) => {
                            console.log(team);
                            return (
                                <div className='flex items-center justify-center w-[97%] h-20 min-h-20 mt-4 bg-gray-500 border-b-2 border-gray-600 rounded-2xl'>
                                    <p className='text-2xl'>{team.Name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}



/* Version alternativa de la lista de equipos
<div className='flex items-center h-[85%] w-full overflow-y-auto'>
                        {registeredTeams.map((team) => {
                            console.log(team);
                            return (
                                <div className='flex items-center justify-center w-full h-20 bg-gray-500 border-b-2 border-gray-600'>
                                    <p className='text-2xl'>{team.Name}</p>
                                </div>
                            )
                        })}
                    </div>
*/