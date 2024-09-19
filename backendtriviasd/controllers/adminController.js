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
}

export var teams = [];
var id = 0;
var gameReady = false;

//Función para registrar un equipo en el sistema (Se guardan en un vector)
export const registerTeam = asyncHandler(async(req, res) => {
    //Comprobamos si ya hay 4 equipos registrados
    if (teams.length == 4) {
        res.send('Max teams reached');
        return;
    }
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


//Funcion para devolver el número de equipos registrados
export const getTeamsNumber = asyncHandler(async(req, res) => {
    res.send(teams.length.toString());
})

//Funcion para iniciar la trivia
export const startGame = asyncHandler(async(req, res) => {
    //Comprobamos si hay 4 equipos registrados
    if (teams.length < 2) {
        res.send('Not enough teams');
    }else if(teams.length > 4){
        res.send('Too many teams');
    }else {
        teams[0].turn = true;
        gameReady = true;
        res.send('Game started');
        return true;
    }
})

export const getGameStatus = asyncHandler(async(req, res) => {
    res.send(gameReady);
})