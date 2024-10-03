import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                const resetTime = 120;
                setTimeLeft(resetTime); // Reiniciar el temporizador a 120 segundos
                sendTimeLeft(resetTime); // Enviar el tiempo reiniciado al backend
            }
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
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

    if (loading) {
        return <div>Cargando pregunta...</div>; // Mostrar un mensaje de carga mientras se obtiene la pregunta
    }

    if (!question) {
        return <div>No se pudo cargar la pregunta.</div>;
    }

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
        console.log('Respuesta correcta: ', question.respuesta_correcta);
        console.log('Respuesta seleccionada: ', selectedAnswer);
        switch (question.dificultad) {
            case "Facil":
                return selectedAnswer === question.respuesta_correcta ? 1 : -1;
            case 'Medio':
                return selectedAnswer === question.respuesta_correcta ? 2 : -2;
            case 'Dificil':
                return selectedAnswer === question.respuesta_correcta ? 3 : -3;
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
        <div className="App h-screen bg-gray-100">
            <Header />
            <div className="flex flex-col h-[82%] w-full items-center pt-20">
                <div className="flex  items-center justify-between h-[10%] w-[90%]  mt-16">
                <p className="text-xl font-bold ml-4">Equipo: </p>
                <p className="text-xl font-bold">Tiempo restante: {formatTime(timeLeft)}</p>
                </div>
                {showQuestion && (
                    <>
                        <div className="flex flex-grow items-center justify-center h-[35%] w-[90%]  rounded-tl-3xl rounded-br-3xl  border-[#FF0033] border-2 border-dashed mt-4">
                            <h1 className="text-4xl font-bold pt-1 pb-1 text-center">{question.enunciado}</h1>
                        </div>
                        <div className="flex flex-row justify-center items-center h-[30%] w-[90%] rounded-2xl pt-20">
                            {question.respuestas.map((respuesta, index) => (
                                <StandardButton
                                    key={index}
                                    text={respuesta}
                                    size="large"
                                    onClick={() => checkAnswer(respuesta, index)}
                                    isCorrect={selectedAnswer !== null && respuesta === question.respuesta_correcta}
                                    isIncorrect={selectedAnswer === respuesta && respuesta !== question.respuesta_correcta}
                                    waiting={waitingButtonIndex === index}
                                />
                            ))}
                        </div>
                        <div className="flex  justify-center items-center h-[4%] w-[90%] rounded-b-2xl translate-y-20">
                        {selectedAnswer !== null && <StandardButton text="Siguiente" size="small" onClick={backToMenu} />}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}