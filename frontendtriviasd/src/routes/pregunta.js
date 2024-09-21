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

    function backToMenu() {
        navigate('/presentador');
    }

    return (
        <div className="App h-screen bg-gray-100">
            <Header />
            <div className="flex flex-col h-[82%] w-full items-center">
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