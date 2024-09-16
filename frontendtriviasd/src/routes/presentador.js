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
    const firstTeamName = registeredTeams.length > 0 ? registeredTeams[0].Name : 'No hay equipos';

    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <div className="flex flex-col  items-center h-[40%] mt-20">
                <p className='text-4xl font-bold '>Turno del Equipo {firstTeamName}</p>
            </div>
            <div className='flex flex-row items-baseline  h-[40%] w-12  o'>
                    <h1 className='text-4xl font-bold ml-14'>Temática:</h1>
                    <StandardButton text="Animales"  size="tiny"/>
                    <StandardButton text="Comida"  size="tiny"/>
                    <StandardButton text="Ropa"  size="tiny"/>
                    <StandardButton text="yoquese"  size="tiny"/>
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