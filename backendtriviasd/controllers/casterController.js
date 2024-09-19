import express from 'express';
import asyncHandler from 'express-async-handler';
import fs from 'fs';
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


//Funcion que busca una pregunta segun la temática
export const getQuestion = asyncHandler(async(req, res) => {
    const {tema} = req.body;
    console.log(tema);
     // Leer el archivo JSON que contiene las preguntas
    const data = await fs.readFile('./preguntas.json', 'utf8');
    const questions = JSON.parse(data).preguntas;
      // Filtrar las preguntas según la categoría dada
    const filteredQuestions = questions.filter(question => question.tematica === tema);

      // Si no se encuentran preguntas con la categoría dada
    if (filteredQuestions.length === 0) {
        res.status(404).send({ message: 'No se encontraron preguntas para la categoría dada' });
        return;
    }

     // Escoger una pregunta aleatoria de la lista filtrada
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const randomQuestion = filteredQuestions[randomIndex];

     // Enviar la pregunta aleatoria como respuesta
    res.send(randomQuestion);
    return;
})