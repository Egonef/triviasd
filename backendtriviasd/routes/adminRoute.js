//Imports
import express from 'express';
import * as ctr from '../controllers/adminController.js';


const router = express.Router();

//Rutas

router.route('/registerTeam').post(ctr.registerTeam);

export default router;