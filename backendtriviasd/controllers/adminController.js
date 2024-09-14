import express from 'express';
import asyncHandler from 'express-async-handler';



//     /admin/test
/*export const test = asyncHandler(async(req, res) => {
    res.send('Admin Route')
})*/


function TeamConstructor(Name, LeaderName, LeaderEmail) {
    this.Name = Name;
    this.LeaderName = LeaderName;
    this.LeaderEmail = LeaderEmail; 
    
}

var teams = [];

export const registerTeam = asyncHandler(async(req, res) => {
    const { Name, LeaderName, LeaderEmail } = req.body;
    const team = new TeamConstructor(Name, LeaderName, LeaderEmail);
    teams.push(team);
    console.log(team);
    res.send('Team registered');
})