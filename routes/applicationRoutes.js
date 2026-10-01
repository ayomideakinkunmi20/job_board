import express from 'express';
import {applyToJob,getApplicationForJob} from '../controller/applicationController.js';
import protect from '../middleware/authMiddleWare.js'
const router = express.Router();

router.post('/:id/apply',applyToJob);
router.get('/:id/application',protect,getApplicationForJob);
export default router