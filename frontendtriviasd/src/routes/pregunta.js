import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
// Components
import Header from '../components/header';
import StandardButton from '../components/standardButton';

export default function Pregunta() {
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null); // Inicializar a null
    const [loading, setLoading] = useState(true); // Estado de carga
    const [showQuestion, setShowQuestion] = useState(false); // Estado para controlar si la pregunta debe mostrarse
    const [waitingButtonIndex, setWaitingButtonIndex] = useState(null);
    const [questionTimeLeft, setQuestionTimeLeft] = useState(60);
    const [registeredTeams, setRegisteredTeams] = useState([]);

    //Solicitud a la API para obtener los equipos registrados
    async function getTeams() {
        try {
            console.log('getTeams llamado');
            const response = await axios.get('http://localhost:5000/api/admin/getSelectedTeams'); //Cambiar la dirección IP por la de la máquina que corre el backend
            setRegisteredTeams(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

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
            } else {
                const resetTime = 240;
                setTimeLeft(resetTime); // Reiniciar el temporizador a 120 segundos
                sendTimeLeft(resetTime); // Enviar el tiempo reiniciado al backend
                saveTeams2(); // Enviar los equipos que han jugado esta partida al backend
                navigate('/RankingGlobal');
            }
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    //Funciones para gestionar el tiempo de la pregunta
    useEffect(() => {
        if (questionTimeLeft !== null) { // Solo iniciar el temporizador si timeLeft no es null
            if (questionTimeLeft > 0) {
                const timerIdq = setInterval(() => {
                    setQuestionTimeLeft(questionTimeLeft - 1);
                }, 1000);
                return () => clearInterval(timerIdq);
            } else {
                setSelectedAnswer('Tiempo agotado');// Redirige a otra página cuando el temporizador de la pregunta llega a 0
            }
        }
    }, [questionTimeLeft]);

    //Funcion para formatear el tiempo
    const formatTimeq = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };


    // Función para obtener el tiempo restante de la partida
    async function getTimeLeft() {
        try {
            const response = await axios.get('http://localhost:5000/api/caster/getTimeLeft');
            console.log('Tiempo restante recibido: ');
            console.log(response.data);
            setTimeLeft(response.data);
        } catch (error) {
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

    useEffect(() => {
        if (selectedAnswer !== null) {
            sendPoints();
        }
    }, [selectedAnswer]);

    async function getQuestion() {
        setLoading(true); // Iniciar el estado de carga
        try {
            const response = await axios.get('http://localhost:5000/api/caster/selectedQuestion');
            setQuestion(response.data);
            console.log('Pregunta recibida: ');
            console.log(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false); // Finalizar el estado de carga
        }
    }

    useEffect(() => {
        getQuestion();
    }, []);

    useEffect(() => {
        if (question) {
            setShowQuestion(true); // Mostrar la pregunta cuando se haya cargado
        }
    }, [question]);


    // Función para comprobar si la respuesta es correcta
    function checkAnswer(answer, index) {
        setWaitingButtonIndex(index);
        setTimeout(() => {
            setSelectedAnswer(answer);
            setWaitingButtonIndex(null);
        }, 2000);
    }

    // Función para calcular los puntos que deben añadirse o restarse al equipo
    function calculatePoints() {
        console.log('Dificultad: ', question.dificultad);
        console.log('Respuesta correcta: ', question.respuestaCorrecta);
        console.log('Respuesta seleccionada: ', selectedAnswer);
        switch (question.dificultad) {
            case "Facil":
                return selectedAnswer === question.respuestaCorrecta ? 2 : -2;
            case 'Medio':
                return selectedAnswer === question.respuestaCorrecta ? 4 : -4;
            case 'Dificil':
                return selectedAnswer === question.respuestaCorrecta ? 6 : -6;
            default:
                return 0;
        }
    }

    // Función para enviar al backend los puntos que se deben añadir o restar al equipo
    async function sendPoints() {
        const puntos = calculatePoints();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/addPoints', { puntos });
            console.log(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }

    // Función para devolver al menú principal
    function backToMenu() {
        navigate('/RankingLocal');
    }

    return (
        <div className="App h-screen bg-gray-100" translate='no'>
            <Header />
            <motion.div className=' h-5 w-full bg-[#FF0033]'
            animate={{ width: `0px` }}
            transition={{ duration: questionTimeLeft }}
            ></motion.div>
            <div className="flex flex-col lg:h-[82%] md:h-[65%] w-full items-center lg:pt-20 md:pt-10">
                <div className="flex  items-center justify-between h-[10%] w-[90%]  lg:mt-16 md:mt-10">
                    <p className="text-xl font-bold ml-4">Pregunta: </p>
                    <div className=' flex justify-center items-center md:h-10 lg:h-10 xl:h-10 h-24 w-28 text-2xl text-white bg-slate-500 rounded-br-3xl rounded-tl-3xl'><b>{formatTime(timeLeft)}</b></div>
                </div>
                {showQuestion && (
                    <>
                        <div className="flex flex-grow items-center justify-center lg:h-[35%] md:h-[15%] md:mt-5 md:mb-5 w-[90%]  rounded-tl-3xl rounded-br-3xl  border-[#FF0033] border-2 border-dashed ">
                            <h1 className="lg:text-4xl md:text-2xl font-bold pt-1 pb-1 text-center">{question.enunciado}</h1>
                        </div>
                        <div className="flex flex-row justify-center items-center h-[30%] w-[90%] rounded-2xl pt-20">
                            {question.opciones.map((respuesta, index) => (
                                <StandardButton
                                    key={index}
                                    text={respuesta}
                                    size="long"
                                    onClick={() => checkAnswer(respuesta, index)}
                                    isCorrect={selectedAnswer !== null && respuesta === question.respuestaCorrecta}
                                    isIncorrect={selectedAnswer === respuesta && respuesta !== question.respuestaCorrecta}
                                    waiting={waitingButtonIndex === index}
                                />
                            ))}
                        </div>
                        <div className="flex  justify-center items-center h-[4%] w-[90%] rounded-b-2xl lg:translate-y-20 md:translate-y-40">
                        {selectedAnswer !== null && <StandardButton text="Siguiente" size="small" onClick={backToMenu} />}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}