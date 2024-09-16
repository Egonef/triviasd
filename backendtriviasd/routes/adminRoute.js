//Imports
import express from 'express';
import * as ctr from '../controllers/adminController.js';


const router = express.Router();

//Rutas

router.route('/registerTeam').post(ctr.registerTeam);
router.route('/getTeams').get(ctr.getTeams);
router.route('/getTeamsNumber').get(ctr.getTeamsNumber);
router.route('/startGame').get(ctr.startGame);
router.route('getGameStatus').get(ctr.getGameStatus);





export default router;