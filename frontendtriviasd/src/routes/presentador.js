//Pagina principal del presentador (WIP: No sabemos si mostrar una seleccion de equipos si se hará automaticamente, se decidirá tras hacer el registro de equipos)

//Imports

import React, { useEffect } from 'react';
import axios from 'axios';
import { useState , useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { animate, AnimatePresence, motion, useCycle } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTrophy } from '@fortawesome/free-solid-svg-icons'; // Importar el icono específico

//Componentes

import Header from '../components/header';
import StandardButton from '../components/standardButton';
import SlideableRanking from '../components/slideableRanking';



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
                endGame();
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

    //Funcion para enviar al backend los equipos que han jugado esta partida
    async function saveTeams2() {
        try {
            const response = await axios.post('http://localhost:5000/api/admin/saveTeams2', registeredTeams); // Enviar el array directamente
            console.log('Los equipos que se mandan para borrar son: ', registeredTeams);
            console.log(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    //Funcion para terminar la partida que resetea el temporizador y te lleva al rabnking global
    function endGame() {
        sendTimeLeft(240);
        saveTeams2();
        navigate('/RankingGlobal');
    }
    //DEBUGEo

    function debug() {
        console.log('Equipos registrados: ', registeredTeams);
        console.log('Tamaño del vector: ', registeredTeams.length);
    }

    //Animaciones

    function setSizeAndDirecction(){
        setIsOpen();
        setDirection();
    }

    const [isOpen, setIsOpen] = useCycle(false, true);
    
    const sideRanking = {
        open: {
            width: '24rem',
            transition: {
                duration: 0.5
            }
        },
        closed: {
            scaleX: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    const [direction, setDirection] = useCycle(true, false);

    const faceDirection = {
        left: {
            rotate: 180,
            transition: {
                duration: 0.5
            }
        },
        right: {
            rotate: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className="App h-screen bg-gray-100 " translate='no'>
            <motion.div 
            className=' absolute z-10' >
                <motion.button 
                className=' w-20 h-20 rounded-br-2xl cursor-pointer border-[#FF0033] border-2 border-dashed text-red-700 text-2xl' 
                initial={false}
                variants={sideRanking}
                animate={isOpen ? "open" : "closed" } 
                onClick={setSizeAndDirecction }>
                    <div className='flex flex-row justify-end items-center mx-4'>
                        <FontAwesomeIcon icon={faTrophy} className='w-5 h-5 text-[#FF0033]' />
                        <motion.div 
                        initial={false}
                        variants={faceDirection}
                        animate={direction ? "right" : "left" }>
                            <FontAwesomeIcon icon={faArrowRight} className='w-5 h-5 ml-2 text-[#FF0033]'/>
                        </motion.div>
                    </div>
                </motion.button>
            </motion.div>
                <AnimatePresence>
                    {isOpen && <SlideableRanking />}
                </AnimatePresence>
            <Header/>
            <div className='flex flex-col items-center align-middle lg:pt-12 md:pt-[2rem] h-screen'>
                <div className="flex  items-center justify-between h-[10%] w-[90%]  mt-16">
                    <p className='lg:text-2xl font-bold'>Equipo: {registeredTeams.length > 0 ? checkTurn() : ''}</p>
                    <div className=' flex justify-center items-center h-24 w-28 text-2xl text-white bg-slate-500 rounded-br-3xl rounded-tl-3xl'><b>{formatTime(timeLeft)}</b></div>
                </div>
                {tema === '' ?
                <>
                    <div className="flex  items-center justify-between h-[5%] w-[100%]">
                    <div className=' flex lg:text-4xl md:text-xl font-bold bg-[#FF0033] lg:w-52 md:w-32 h-[3.5rem] rounded-br-3xl justify-center items-center'>
                        <h1 className='text-white text-center'>Tema</h1>
                    </div>
                </div>
                    <div className='flex flex-col items-center  justify-center lg:h-[60%] lg:w-[45%] md:h-[60%] md:w-[60%] 2xl:h-[50%] 2xl:w-[26%] sm:h-[60%] sm:w-[45%] rounded-tl-3xl rounded-br-3xl  border-[#FF0033] border-2 border-dashed translate-y-[-10%]'>
                        <div className="flex flex-row  w-full h-full">
                            <div className="flex flex-col items-end h-full w-1/2 ">
                                <StandardButton text={<><span>Así</span><br /><span>somos</span></>} size="huge" onClick={() => setTema('Así somos')} marginX="10" />
                                <StandardButton text="Más que alarmas" size="huge" onClick={() => setTema('Mas que alarmas')} marginX="10" />
                            </div>
                            <div className="flex flex-col items-start h-full w-1/2">
                                <StandardButton text="El viaje del cliente" size="huge" onClick={() => setTema('El viaje del cliente')} marginX="10" />
                                <StandardButton text="Sobre todo, personas" size="huge" onClick={() => setTema('Sobre todo, personas')} marginX="10" />
                            </div>
                        </div>
                    </div>
                </>

                    :
                    <>
                    <div className="flex  items-center justify-between h-[5%] w-[100%]">
                        <div className=' flex text-4xl font-bold bg-[#FF0033] w-60 h-[3.5rem] rounded-br-3xl justify-center items-center'>
                            <h1 className='text-white text-center'>Dificultad</h1>
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-center 2xl:h-[27%] 2xl:w-[42%] rounded-tl-3xl rounded-br-3xl  border-[#FF0033] border-2 border-dashed translate-y-[50%]'>
                        <div translate='no'>
                            <StandardButton text="Facil" size="huge" onClick={setEasyDiff}/>
                            <StandardButton text="Media" size="huge" onClick={setMidDiff}/>
                            <StandardButton text="Dificil" size="huge" onClick={setHardDiff}/>
                        </div>
                    </div>
                    </>
                }
                <div className="flex  justify-center items-center h-[4%] w-[100%] lg:translate-y-[-10%] md:translate-y-0">
                <StandardButton text="Terminar partida" size="small" onClick={endGame} marginY="0" />
                </div>
            </div>
        </div>
    )
}

