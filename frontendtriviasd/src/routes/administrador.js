// Pagina de registro de equipos
// WIP: Cambiar el boton por componente de boton estandar

// Imports
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

//Componentes
import Header from '../components/header';
import TeamForm from '../components/teamForm';
import StandardButton from '../components/standardButton';

function AdminForm() {

    //Estado para almacenar el número de equipos registrados
    const [registeredTeams, setRegisteredTeams] = useState([]);

    //Solicitud a la API para obtener el número de equipos registrados
    async function getRegisteredTeams() {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/admin/getTeams');
            console.log(response.data);
            setRegisteredTeams(response.data);
        }
        catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    //LLamada para iniciar la partida

    async function startGame() {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/admin/startGame');
            console.log(response.data);
            if (response.data === 'Not enough teams') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No hay suficientes equipos registrados',
                    confirmButtonColor: '#FF0033',
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'La trivia ha comenzado',
                    confirmButtonColor: '#FF0033',
                });
            }
        }
        catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    useEffect(() => {
        getRegisteredTeams(); // Llama inmediatamente al montar el componente
        const interval = setInterval(() => {
            getRegisteredTeams(); // Llama a la función cada 5 segundos
        }, 1000);

        return () => clearInterval(interval); // Limpieza al desmontar el componente
    }, []);

    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <h1 >Registra a los equipos participantes({registeredTeams.length}/4)</h1>
            <div className=" flex justify-evenly h-[89%] pt-44"  >
                <TeamForm/>
                <div className='flex flex-col items-center h-[50%] w-[40%] overflow-y-auto bg-gray-600'>
                        {registeredTeams.map((team) => {
                            console.log(team);
                            return (
                                <div className='flex items-center justify-center w-full h-20 bg-gray-500 border-b-2 border-gray-600'>
                                    <p className='text-2xl'>{team.Name}</p>
                                </div>
                            )
                        })}
                        <StandardButton text="Iniciar trivia" size="large" onClick={startGame} />
                </div>
            </div>
        </div>
    );
}

export default AdminForm;
