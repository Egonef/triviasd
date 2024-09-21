import express from 'express';
import asyncHandler from 'express-async-handler';
//import fs from 'fs';
import fs from 'fs/promises';
import { getTeams , getGameStatus, teams } from '../controllers/adminController.js';



//Funcion que recorre los equipos para determinar su turno

export const nextTurn = asyncHandler(async(req, res) => {
    var teams = req.body.registeredTeams;
    console.log('Equipos antes de cambiar turnos' + teams);
    for (let i = 0; i < teams.length; i++) {
        if(teams[i].turn == true){
            console.log('termina turno del equipo: ' + teams[i].Name);
            teams[i].turn = false;
            if(i == teams.length - 1){
                teams[0].turn = true;
            }else{
                teams[i+1].turn = true;
            }
            console.log('Equipos depues de cambiar turno: ' + teams);
            res.send(teams);
            return;
        }
    }
})





var tema = '';
var dificultad = '';
var selectedQuestion;

//Funcion que guarda el tema y la dificultad seleccionada
export const setTopicandDifficulty = asyncHandler(async(req, res) => {
    tema = req.body.tema;
    dificultad = req.body.dificultad;
    console.log(tema);
    console.log('Dificultad mandada por la solicitud post: '  + req.body.dificultad);
    console.log(dificultad);
    try {
        // Esperar a que getQuestion se resuelva antes de imprimir y enviar la respuesta
        const question = await getQuestion(tema, dificultad);
        console.log('Pregunta enviada: ');
        console.log(question);
        selectedQuestion = question;
        res.send(question);
    } catch (error) {
        console.error('Error al obtener la pregunta:', error);
        res.status(500).send('Error al obtener la pregunta');
    }
    return;
})

//Funcion que busca una pregunta segun la temática y la dificultad
async function getQuestion(tema, dificultad){

    // Leer el archivo JSON que contiene las preguntas
    const data = await fs.readFile('./preguntas.json', 'utf8');
    const questions = JSON.parse(data).preguntas;
     // Filtrar las preguntas según la categoría dada
    const filteredQuestions = questions.filter(question =>
        question.tematica === tema && question.dificultad === dificultad
    );
    for (let i = 0; i < filteredQuestions.length; i++) {
        console.log('Preguntas filtradas: ');
        console.log(filteredQuestions[i].enunciado);
    }
     // Si no se encuentran preguntas con la categoría dada
    if (filteredQuestions.length === 0) {
        console.log('No se encontraron preguntas con la temática y dificultad dadas');
        return ('No se encontraron preguntas con la temática y dificultad dadas');
    }

    // Escoger una pregunta aleatoria de la lista filtrada
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    console.log('Indice aleatorio seleccionado: ' + randomIndex);
    //console.log(filteredQuestions[randomIndex]);
    const randomQuestion = filteredQuestions[randomIndex];
    console.log('Pregunta aleatoria seleccionada: ' + randomQuestion.enunciado);
    // Enviar la pregunta aleatoria como respuesta

    return randomQuestion;
}


//Función que devuelve la pregunta seleccionada
export const getSelectedQuestion = asyncHandler(async(req, res) => {
    res.send(selectedQuestion);
    console.log('Pregunta enviada qetselectedquetion: ');
    console.log(selectedQuestion);
    return;
});