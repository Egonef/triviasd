import express from 'express';
import asyncHandler from 'express-async-handler';
import fs from 'fs';



//     /admin/test
/*export const test = asyncHandler(async(req, res) => {
    res.send('Admin Route')
})*/

//Creamos un constructor para los equipos
function Team(Name, LeaderName, LeaderEmail) {
    this.Name = Name;
    this.LeaderName = LeaderName;
    this.LeaderEmail = LeaderEmail;
    this.turn = false;
    this.score = 30;

}

//Vector donde se guardan todos los equipos registrados
export var teams = [];
//Vector de los equipos seleccionados para la partida actual
export var selectedTeams = [];

//Variable para guardar el nombre del ultimo equipo en responder
export var lastAnswerTeam = '';
//Variable para guardar la dificultad de la pregunta actual
export var questionDifficulty = '';


var id = 0;
var gameReady = false;

//Función para registrar un equipo en el sistema (Se guardan en un vector)
export const registerTeam = asyncHandler(async(req, res) => {

    //Creamos un nuevo equipo con los datos recibidos
    const team = new Team(req.body.teamName, req.body.leaderName, req.body.leaderEmail);
    //Comprobamos si el equipo ya está registrado
    if (checkTeam(team.Name)) {
        res.send('Team already registered');
        return;
    }else if(checkinput(team.Name,team.LeaderName,team.LeaderEmail)){
        res.send('Empty record');
        return;
    }
    //Le asignamos un id y lo guardamos en el vector
    id++;
    team.id = id;
    teams.push(team);
    console.log(teams); // ELIMINAR ANTES DE ENTREGAR
    //Guardamos el email en un archivo
    saveEmail(team.LeaderEmail);
    //Respondemos con un mensaje de confirmación
    res.send('Team registered');
})

//Funcion para comprobar si un equipo ya está registrado
function checkTeam(teamName) {
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].Name == teamName) {
            return true;
        }
    }
    return false;
}

//Funcion para comprobar si algun campo está vacío
function checkinput(teamName,teamleader,leaderemail) {
    if (teamName == '' || teamleader == '' || leaderemail == '') {
        return true;
    }
    return false;
}

//Funcion para guarda los correos en un archivo
function saveEmail(email) {
    fs.appendFile('emails.txt', email + '\n', function (err) {
        if (err) throw err;
    });
}

//Funcion para devolver el vector de equipos
export const getTeams = asyncHandler(async(req, res) => {
    res.send(teams);
})

//Funcion para devolver los equipos seleccionados para esta partida
export const getSelectedTeams = asyncHandler(async(req, res) => {
    res.send(selectedTeams);
})

//Funcion para devolver el número de equipos registrados
export const getTeamsNumber = asyncHandler(async(req, res) => {
    res.send(teams.length.toString());
})

//Funcion para iniciar la trivia //*
export const startGame = asyncHandler(async(req, res) => {
    //Comprobamos si hay 4 equipos registrados
    if (selectedTeams.length < 2) {
        res.send('Not enough teams');
    }else if(selectedTeams.length > 4){
        res.send('Too many teams');
    }else {
        selectedTeams[0].turn = true;
        gameReady = true;
        console.log('Equipos seleccionados para la partida:');
        console.log(selectedTeams);
        res.send('Game started');
        return true;
    }
})


//Funcion que devuelve el estado de la partida
export const getGameStatus = asyncHandler(async(req, res) => {
    res.send(gameReady);
})


//Funcion para guardar los equipos seleccionados
export const saveSelectedTeams = asyncHandler(async(req, res) => {
    console.log('Guardando equipos seleccionados');
    selectedTeams = req.body;
    console.log(selectedTeams);
    res.send('Selected teams saved');
})

//Funcion para guardar los equipos seleccionados
export const saveSelectedTeams2 = asyncHandler(async(req, res) => {
    console.log('Guardando equipos seleccionados');
    selectedTeams = req.body;
    console.log(selectedTeams);
    res.send('Selected teams saved');
})


//Funcion para guardar cual ha sido el ultimo equipo en responder
export const setLastAnswerTeam = asyncHandler(async(req, res) => {
    lastAnswerTeam = req.body.teamName;
    console.log('Ultimo equipo en responder:');
    console.log(lastAnswerTeam);
    res.send('Last answer team saved');
})

//Funcion para añadir puntos a un equipo
export const addPoints = asyncHandler(async(req, res) => {
    console.log('Añadiendo puntos');
    console.log(req.body);
    for (let i = 0; i < selectedTeams.length; i++) {
        if (selectedTeams[i].Name == lastAnswerTeam) {
            selectedTeams[i].score += req.body.puntos;
            console.log('Puntos finales al equipo:');
            console.log(selectedTeams[i].score);
        }
    }
    console.log(selectedTeams);
    res.send('Points added');
})