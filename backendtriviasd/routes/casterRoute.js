import express from 'express';
import * as ctr from '../controllers/casterController.js';


const router = express.Router();


router.route('/nextTurn').post(ctr.nextTurn);
router.route('/getQuestion').get(ctr.getQuestion);
router.route('/setTopicandDifficulty').post(ctr.setTopicandDifficulty);

export default router;