// Pagina de registro de equipos
// WIP: Cambiar el boton por componente de boton estandar

// Imports
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
//Componentes
import Header from '../components/header';
import StandardButton from '../components/standardButton';

function TeamSelection() {

    const navigate = useNavigate();

    //Estado para almacenar el número de equipos registrados
    const [registeredTeams, setRegisteredTeams] = useState([]);

    //Estado para almacenar los equipos seleccionados
    const [selectedTeams, setSelectedTeams] = useState([]);

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

    //LLamada para iniciar la partida(MODIFICAR)

    async function startGame() {
        try {
            //Comprobamos cuales son los equipos seleccionados(checked)
            var checkboxes = document.querySelectorAll('input[type="checkbox"]');
            var selectedTeamsTemp = [];
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedTeamsTemp.push(registeredTeams[i]);
                }
            }

            console.log('Equipos seleccionados temporales:');
            console.log(selectedTeamsTemp);
            //Lo guardo aqui aunque no se ni para qué, por si acaso ahi está
            setSelectedTeams(selectedTeamsTemp);


            //Enviamos la solicitud a la API para guardar los equipos seleccionados
            const respuestaPost = await axios.post('http://localhost:5000/api/admin/saveSelectedTeams', selectedTeamsTemp);
            if (respuestaPost.data !== 'Selected teams saved') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al guardar los equipos seleccionados',
                    confirmButtonColor: '#FF0033',
                });
            }

            const respuestaGet = await axios.get('http://localhost:5000/api/admin/startGame');
            console.log(respuestaGet.data);
            if (respuestaGet.data === 'Not enough teams') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No hay suficientes equipos registrados',
                    confirmButtonColor: '#FF0033',
                });
            }else if(respuestaGet.data === 'Too many teams'){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Demasiados equipos seleccionados',
                    confirmButtonColor: '#FF0033',
                });
            }else {
                navigate("/presentador");
            }
        }
        catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    //Llamada a la API para recuperar los equipos registrados
    async function recoverTeams() {
        try {
            console.log('recoverTeams llamado');
            const response = await axios.get('http://localhost:5000/api/admin/loadTeams'); //Cambiar la dirección IP por la de la máquina que corre el backend
            //Imprimir los equipos registrados
            navigate('/seleccionEquipos');
        } catch (error) {
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
            <div className=" flex flex-grow items-center justify-center"  >
                <div className="flex flex-col items-center h-[50%] w-[40%] overflow-y-auto bg-gray-600 p-4 rounded-tl-3xl rounded-br-3xl">
                        {registeredTeams.map((team) => {
                            console.log(team);
                            return (
                                <div className='flex items-center justify-center w-full h-20 bg-gray-500 border-b-2 border-gray-600'>
                                    <input type ="checkbox" id="check"/>
                                    <label className='text-2xl'>{team.Name} </label>
                                </div>
                            )
                        })}
                        <StandardButton text="Iniciar trivia" size="large" onClick={startGame} />
                        <StandardButton text="Recuperar equipos" size="large" onClick={recoverTeams} />
                </div>
            </div>
        </div>
    );
}

export default TeamSelection;
