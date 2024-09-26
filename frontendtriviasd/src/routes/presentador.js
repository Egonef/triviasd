//Pagina principal del presentador (WIP: No sabemos si mostrar una seleccion de equipos si se hará automaticamente, se decidirá tras hacer el registro de equipos)

//Imports

import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


//Componentes

import Header from '../components/header';
import StandardButton from '../components/standardButton';



export default function Presentador(){

    const navigate = useNavigate();

    //Estado para almacenar los equipos registrados
    var teamLock = false;
    const [registeredTeams, setRegisteredTeams] = useState([]);

    //Estado para almacenar el estado de la partida
    const [gameState, setGameState] = useState(false);

    //Estado para almacenar la temática seleccionada
    const [tema, setTema] = useState('');

    //Estado para almacenar la dificutad seleccionada
    const [dificultad, setdificultad] = useState('');

    // Función que se ejecuta al hacer clic en el botón
    const setEasyDiff = () => {
        setdificultad('Fácil');
    };
    const setMidDiff = () => {
        setdificultad('Media');
    };
    const setHardDiff = () => {
        setdificultad('Difícil');
    };


    //Funcion para actualizar el estado de los equipos en el backend 
    async function updateTeams() {
        console.log('updateTeams llamado');
        console.log("Equipos a enviar: ", registeredTeams);
        try {
            const response = await axios.post('http://localhost:5000/api/admin/saveSelectedTeams', {
                registeredTeams
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    //Solicitud a la API para obtener los equipos registrados
    async function getTeams() {
        try {
            console.log('getTeams llamado');
            const response = await axios.get('http://127.0.0.1:5000/api/admin/getSelectedTeams'); //Cambiar la dirección IP por la de la máquina que corre el backend
            console.log('getTeams devuelve: ');
            //Imprimir los equipos registrados
            console.log(response.data);
            if (gameState === true) {
                console.log('Registrando equipos');
                setRegisteredTeams(response.data);
            }
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }
    //Solicitud a la API para obtener el estado de la partida
    async function checkgameready() {
        try {
            if (gameState === false) {
                const response = await axios.get('http://127.0.0.1:5000/api/admin/getGameStatus'); //Cambiar la dirección IP por la de la máquina que corre el backend
                setGameState(response.data);
            }
        }catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    //Funcion para actualizar el estado de los equipos en el backend
    async function updateTeams2() {
        console.log('updateTeams llamado');
        console.log("Equipos a enviar: ", registeredTeams);
        try {
            const response = await axios.put('http://127.0.0.1:5000/api/admin/saveSelectedTeams2', registeredTeams);
            console.log(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }


    //Funcion para cambiar el turno de los equipos
    async function nextTurn() {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/caster/nextTurn' , {
                registeredTeams
            }); //Cambiar la dirección IP por la de la máquina que corre el backend
            console.log(response.data);
            setRegisteredTeams(response.data);
            updateTeams2();
        }
        catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    //Función para imprimir el estado de la partida ( solo para debuggear)
    function printGameStatus() {
        console.log("Valor real de gameState: ", gameState);

    }

    useEffect(() => {
        // Esta función se ejecutará cada vez que gameState cambie.
        console.log("gameState cambió a:", gameState);
        if (gameState) {
            getTeams();
        }
        // Aquí puedes poner cualquier lógica que dependa del valor actualizado de gameState.
    }, [gameState]);

    //Funcion para comprobar si la partida está lista
    useEffect(() => {
        const interval = setInterval(() => {
            checkgameready();
        }, 2000); // Se ejecuta cada 1000 milisegundos (1 segundo)

        return () => clearInterval(interval); // Limpieza al desmontar el componente
    }, []);


    //Funcion para comprobar is la dicultad se ha seleccionado y buscar una pregunta
    useEffect(() => {
        searchQuestion();
        if (dificultad !== '' && searchQuestion() !== '') {
            navigate('/pregunta');
        }
    }, [dificultad]);

    //Funcion para comprobar cual es el equipo que tiene el turno
    function checkTurn() {
        console.log('Modificando texto de turno')
        console.log(registeredTeams);
        for (let i = 0; i < registeredTeams.length; i++) {
            if (registeredTeams[i].turn === true) {
                console.log('Turno del equipo: ', registeredTeams[i].Name);
                return registeredTeams[i].Name;
            }
        }
    }

    async function searchQuestion() {
        try {
            if (tema !== '' && dificultad !== '') {
                const response = await axios.post('http://127.0.0.1:5000/api/caster/setTopicandDifficulty', {
                    tema,
                    dificultad
                });
                console.log(response.data.enunciado);
            }
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }


    //DEBUGEo

    function debug() {
        console.log('Equipos registrados: ', registeredTeams);
        console.log('Tamaño del vector: ', registeredTeams.length);
    }

    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <div className='flex flex-col items-center align-middle'>
                <div className="flex flex-col  items-center h-[40%] mt-20">
                    <p className='text-4xl font-bold '>Turno del Equipo {registeredTeams.length > 0 ? checkTurn() : 'patata'}</p>
                </div>
                {tema === '' ?
                    <div className='flex flex-col items-center  h-[40%] w-[60%] p-10 my-24 rounded-2xl bg-gray-500'>
                        <h1 className='text-4xl font-bold'>Temática:</h1>
                        <div>
                            <StandardButton text="Animales" size="medium" onClick={() => setTema('Animales')}/>
                            <StandardButton text="Comida" size="medium" onClick={() => setTema('Comida')}/>
                        </div>
                        <div>
                            <StandardButton text="Ropa" size="medium" onClick={() => setTema('Ropa')}/>
                            <StandardButton text="yoquese" size="medium" onClick={() => setTema('Yoquese')}/>
                        </div>
                    </div>

                    :

                    <div className='flex flex-col items-center  h-[40%] w-[60%] p-10 my-24 rounded-2xl bg-gray-500'>
                        <h1 className='text-4xl font-bold'>Dificultad:</h1>
                        <div>
                            <StandardButton text="Facil" size="medium" onClick={setEasyDiff}/>
                            <StandardButton text="Media" size="medium" onClick={setMidDiff}/>
                            <StandardButton text="Dificil" size="medium" onClick={setHardDiff}/>
                        </div>
                    </div>
                }

                <StandardButton text="Siguiente Turno" size="big" onClick={nextTurn}/>
                <StandardButton text="Inicio de la Partida" size="big" onClick={debug}/>
                <Link to="http://localhost:3000/admin" className=' bg-slate-600 h-10 w-10' ></Link>
            </div>
        </div>
    )
}

//He quitado la etiquieta link pq no me funcnionabax

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