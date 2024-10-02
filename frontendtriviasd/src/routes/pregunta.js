import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


//Components
import Header from '../components/header';
import StandardButton from '../components/standardButton';

export default function Pregunta() {

    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [timeLeft, setTimeLeft] = useState(null);
    const [questionTimeLeft, setQuestionTimeLeft] = useState(60);


    //Funciones para gestionar el tiempo de la partida
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
                navigate('/RankingGlobal'); // Redirige a otra página cuando el temporizador llega a 0
            }
        }
    }, [timeLeft]);

    //Funcion para formatear el tiempo
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
                setSelectedAnswer('Tiempo agotado'); // Redirige a otra página cuando el temporizador de la pregunta llega a 0
            }
        }
    }, [questionTimeLeft]);

    //Funcion para formatear el tiempo
    const formatTimeq = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

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

    //Funcion para enviar el tiempo restante al backend
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
        try {
            const response = await axios.get('http://localhost:5000/api/caster/selectedQuestion');
            setQuestion(response.data);
            console.log('Pregunta recibida: ');
            console.log(response.data);
        }
        catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }
    useEffect(() => {
        getQuestion();
    }, []);

    if (!question) {
        return <div>Cargando pregunta...</div>;
    }


    //Funcion para compronar si la respuesta es correcta
    function checkAnswer(answer){
        setTimeout(() => {
            setSelectedAnswer(answer);
        }, 2000);
    }

    //Funcion para calcular los puntos que deben de añadirse o restarse al equipo
    function calculatePoints(){
        console.log('Dificultad: ', question.dificultad);
        console.log('Respuesta correcta: ', question.respuesta_correcta);
        console.log('Respuesta correcta: ', selectedAnswer);
        switch (question.dificultad) {

            case "Fácil":
                if(selectedAnswer === question.respuesta_correcta){
                    return 1;
                }else{
                    return -1;
                }
            case 'Media':
                if(selectedAnswer === question.respuesta_correcta){
                    return 2;
                }else{
                    return -2;
                }
            case 'Difícil':
                if(selectedAnswer === question.respuesta_correcta){
                    return 3;
                }else{
                    return -3;
                }
            default:
                return 0;
        }
    }

    //Funcion para enviar al backend los puntos que se deben añadir o restar al equipo
    async function sendPoints(){
        const puntos = calculatePoints();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/addPoints', {puntos});
            console.log(response.data);
        }
        catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }


    

    //Funcion para devolver al menú principal
    function backToMenu() {
        navigate('/RankingLocal');
    }

    return (
        <div className="App h-screen bg-gray-100">
            <Header />
            <div className="flex flex-col h-[82%] w-full items-center">
                <p className="text-xl font-bold">Tiempo restante de la pregunta: {formatTimeq(questionTimeLeft)}</p>
                <p className="text-xl font-bold">Tiempo restante: {formatTime(timeLeft)}</p>
                <div className="flex flex-col items- my-20">
                    <h1 className="text-4xl font-bold">{question.enunciado}</h1>
                </div>
                <div className=" flex justify-center items-center h-[60%] w-[70%] rounded-2xl bg-slate-600">
                    {question.respuestas.map((respuesta, index) => (
                        <StandardButton
                            key={index}
                            text={respuesta}
                            size="medium"
                            onClick={() => checkAnswer(respuesta)}
                            isCorrect={selectedAnswer !== null && respuesta === question.respuesta_correcta}
                            isIncorrect={selectedAnswer === respuesta && respuesta !== question.respuesta_correcta}
                        />
                    ))}
                </div>
                {selectedAnswer !== null && <StandardButton text="Siguiente" size="medium" onClick={backToMenu} />}
            </div>
        </div>
    );
}