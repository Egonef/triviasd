//Imports
import express from 'express';
import * as ctr from '../controllers/adminController.js';


const router = express.Router();

//Rutas

router.route('/registerTeam').post(ctr.registerTeam);
router.route('/getTeams').get(ctr.getTeams);
router.route('/getTeamsNumber').get(ctr.getTeamsNumber);
router.route('/startGame').get(ctr.startGame);
router.route('/getGameStatus').get(ctr.getGameStatus);
router.route('/saveSelectedTeams').post(ctr.saveSelectedTeams);
router.route('/saveSelectedTeams2').put(ctr.saveSelectedTeams2);

router.route('/getSelectedTeams').get(ctr.getSelectedTeams);



export default router;