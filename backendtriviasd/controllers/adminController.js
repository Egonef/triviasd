import express from 'express';
import asyncHandler from 'express-async-handler';



//     /admin/test
/*export const test = asyncHandler(async(req, res) => {
    res.send('Admin Route')
})*/

//Creamos un constructor para los equipos
function Team(Name, LeaderName, LeaderEmail) {
    this.Name = Name;
    this.LeaderName = LeaderName;
    this.LeaderEmail = LeaderEmail;
}

var teams = [];
var id = 0;

//Función para registrar un equipo en el sistema (Se guardan en un vector)
export const registerTeam = asyncHandler(async(req, res) => {
    //Creamos un nuevo equipo con los datos recibidos
    const team = new Team(req.body.teamName, req.body.leaderName, req.body.leaderEmail);
    //Comprobamos si el equipo ya está registrado
    if (checkTeam(team.Name)) {
        res.send('Team already registered');
        return;
    }
    //Le asignamos un id y lo guardamos en el vector
    id++;
    team.id = id;
    teams.push(team);
    console.log(teams); // ELIMINAR ANTES DE ENTREGAR
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