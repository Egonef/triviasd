import express from 'express';
import asyncHandler from 'express-async-handler';
import { getTeams , getGameStatus } from '../controllers/adminController.js';






//Funcion que recorre los equipos para determinar su turno

export const nextTurn = asyncHandler(async(req, res) => {
    console.log(teams);
    for (let i = 0; i < teams.length; i++) {
        if(teams[i].turn == true){
            console.log('turno del equipo: ' + teams[i].Name);
            res.send(teams[i].Name);
            teams[i].turn = false;
            if(i == 3){
                teams[0].turn = true;
            }else{
                teams[i+1].turn = true;
            }
            return;
        }
    }
})
