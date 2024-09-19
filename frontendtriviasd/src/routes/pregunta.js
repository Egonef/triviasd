import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Pregunta() {
    const { tematica } = useParams();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        async function fetchQuestion() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/caster/getQuestion');
                setQuestion(response.data);
            } catch (error) {
                console.error('Error al obtener la pregunta:', error);
            }
        }

        fetchQuestion();
    }, [tematica]);

    if (!question) {
        return <div>Cargando pregunta...</div>;
    }

    return (
        <div className="question-page">
            <h1 className="text-4xl font-bold">{question.enunciado}</h1>
            <ul>
                {question.respuestas.map((respuesta, index) => (
                    <li key={index}>{respuesta}</li>
                ))}
            </ul>
        </div>
    );
}

export default Pregunta;