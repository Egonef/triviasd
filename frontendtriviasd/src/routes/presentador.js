//Pagina principal del presentador (WIP: No sabemos si mostrar una seleccion de equipos si se hará automaticamente, se decidirá tras hacer el registro de equipos)

//Imports

import React, { useEffect } from 'react';
import axios from 'axios';
import { useState , useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


//Componentes

import Header from '../components/header';
import StandardButton from '../components/standardButton';



export default function Presentador(){

    const navigate = useNavigate();

    //Estado para almacenar los equipos registrados
    const [registeredTeams, setRegisteredTeams] = useState([]);

    //Estado para almacenar el estado de la partida
    const [gameState, setGameState] = useState(false);

    //Estado para almacenar la temática seleccionada
    const [tema, setTema] = useState('');

    //Estado para almacenar la dificutad seleccionada
    const [dificultad, setdificultad] = useState('');

    const [currentTeam, setCurrentTeam] = useState(null); // Variable para guardar el equipo actual

    const [timeLeft, setTimeLeft] = useState(null); // Temporizador inicializado a 60 segundos

    useEffect(() => {
        getTimeLeft(); // Recuperar el tiempo restante del backend al cargar la página
    }, []);

    useEffect(() => {
        if (timeLeft !== null) { // Solo iniciar el temporizador si timeLeft no es null
            if (timeLeft > 0) {
                const timerId = setInterval(() => {
                    setTimeLeft(prevTimeLeft => {
                        const newTimeLeft = prevTimeLeft - 1;
                        sendTimeLeft(newTimeLeft); // Enviar el tiempo restante al backend
                        return newTimeLeft;
                    });
                }, 1000);
                return () => clearInterval(timerId);
            } else { //AQUI SE ACABA DE TERMINAR LA PARTIDA , HAY QUE PREPARAR PARA LA SIGUIENTE
                sendTimeLeft(120) // Reiniciar el temporizador a 60 segundos
                navigate('/RankingGlobal'); // Redirige a otra página cuando el temporizador llega a 0
            }
        }
    }, [timeLeft]);

    //Funcion para obtener el tiempo restante de la partida
    async function getTimeLeft() {
        try {
            const response = await axios.get('http://localhost:5000/api/caster/getTimeLeft');
            console.log('Tiempo restante recibido: ');
            console.log(response.data);
            setTimeLeft(response.data);
        }
        catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    // Función para enviar el tiempo restante al backend
    async function sendTimeLeft(newTimeLeft) {
        try {
            const response = await axios.post('http://localhost:5000/api/caster/saveTimeLeft', {
                timeLeft: newTimeLeft
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }


    // Función que se ejecuta al hacer clic en el botón
    const setEasyDiff = async () => {
        setCurrentTeam(checkTurn());
        await nextTurn();
        setdificultad('Facil');
    };
    const setMidDiff = async () => {
        setCurrentTeam(checkTurn());
        await nextTurn();
        setdificultad('Medio');
    };
    const setHardDiff = async () => {
        setCurrentTeam(checkTurn());
        await nextTurn();
        setdificultad('Dificil');
    };



    //Solicitud a la API para obtener los equipos registrados
    async function getTeams() {
        try {
            console.log('getTeams llamado');
            const response = await axios.get('http://localhost:5000/api/admin/getSelectedTeams'); //Cambiar la dirección IP por la de la máquina que corre el backend
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
                const response = await axios.get('http://localhost:5000/api/admin/getGameStatus'); //Cambiar la dirección IP por la de la máquina que corre el backend
                setGameState(response.data);
            }
        }catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }


    // Función para cambiar el turno de los equipos
    async function nextTurn() {
        try {
            const response = await axios.post('http://localhost:5000/api/caster/nextTurn', {
                registeredTeams
            }); // Cambiar la dirección IP por la de la máquina que corre el backend
            console.log(response.data);
            setRegisteredTeams(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    //Función para imprimir el estado de la partida ( solo para debuggear)
    function printGameStatus() {
        console.log("Valor real de gameState: ", gameState);
    }


    // useEffect para actualizar el backend cuando registeredTeams cambie
    useEffect(() => {
        if (registeredTeams.length > 0) {
            updateTeams();
        }
    }, [registeredTeams]);

    // Función para actualizar el estado de los equipos en el backend
    async function updateTeams() {
        console.log('updateTeams llamado');
        console.log("Equipos a enviar: ", registeredTeams);
        try {
            const response = await axios.put('http://localhost:5000/api/admin/saveSelectedTeams2', registeredTeams); // Envía el array directamente
            console.log(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    //Funcion para enviar al backend el ultimo equipo que iba a responder
    async function sendLastAnswerTeam(teamName) {
        try {
            const response = await axios.post('http://localhost:5000/api/admin/setLastAnswerTeam', {
                teamName
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }


    // useEffect para llamar a getTeams cuando gameState cambie
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
                sendLastAnswerTeam(currentTeam); //he cambiado solo esto, antes era registeredTeams[i].Name
                console.log('Ultimo equipo en responder: ', currentTeam);
                return registeredTeams[i].Name;
            }
        }
    }

    async function searchQuestion() {
        try {
            if (tema !== '' && dificultad !== '') {
                const response = await axios.post('http://localhost:5000/api/caster/setTopicandDifficulty', {
                    tema,
                    dificultad
                });
                console.log(response.data.enunciado);
            }
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    //DEBUGEo

    function debug() {
        console.log('Equipos registrados: ', registeredTeams);
        console.log('Tamaño del vector: ', registeredTeams.length);
    }

    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <div className='flex flex-col items-center align-middle pt-20 h-screen'>
                <div className="flex  items-center justify-between h-[10%] w-[90%]  mt-16">
                    <p className='text-2xl font-bold'>Equipo: {registeredTeams.length > 0 ? checkTurn() : ''}</p>
                    <p className="text-xl font-bold">Tiempo restante: {formatTime(timeLeft)}</p>
                </div>
                <div className="flex  items-center justify-between h-[5%] w-[100%]">
                    <div className=' flex text-4xl font-bold bg-[#FF0033] w-60 h-[3.5rem] rounded-br-3xl justify-center items-center'>
                        <h1 className='text-white text-center'>Tema</h1>
                    </div>
                </div>
                {tema === '' ?

                    <div className='flex flex-col items-center  justify-center  h-[75%] w-[35%] rounded-tl-3xl rounded-br-3xl  border-[#FF0033] border-2 border-dashed translate-y-[-10%]'>
                        <div className="flex flex-row  w-full h-full">
                            <div className="flex flex-col  h-full w-1/2">
                                <StandardButton text={<><span>Así</span><br /><span>somos</span></>} size="huge" onClick={() => setTema('Así somos')} />
                                <StandardButton text="Más que alarmas" size="huge" onClick={() => setTema('Captación')} />
                            </div>
                            <div className="flex flex-col  h-full w-1/2">
                                <StandardButton text="El viaje del cliente" size="huge" onClick={() => setTema('Portfolio')} />
                                <StandardButton text="Sobre todo, personas" size="huge" onClick={() => setTema('Soporte a Negocio')} />
                            </div>
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