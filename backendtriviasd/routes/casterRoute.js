import express from 'express';
import * as ctr from '../controllers/casterController.js';


const router = express.Router();


router.route('/nextTurn').post(ctr.nextTurn);
router.route('/setTopicandDifficulty').post(ctr.setTopicandDifficulty);
router.route('/selectedQuestion').get(ctr.getSelectedQuestion);
router.route('/saveTimeLeft').post(ctr.saveTimeLeft);
router.route('/getTimeLeft').get(ctr.getTimeLeft);

export default router;