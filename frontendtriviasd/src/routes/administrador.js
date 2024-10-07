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
            const response = await axios.get('http://localhost:5000/api/admin/getTeams');
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
            const response = await axios.get('http://localhost:5000/api/admin/startGame');
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
        <div className="App min-h-screen bg-gray-100 flex flex-col">
            <Header/>
            <div className=" flex flex-grow items-center justify-center 2xl:mt-4 sm:mt-24"  >
                <TeamForm/>
            </div>
        </div>
    );
}

export default AdminForm;
