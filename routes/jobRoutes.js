import express from 'express';
import {createJob,getAllJob,getOne,updateJob,deleteJob} from '../controller/jobController.js';
import protect from '../middleware/authMiddleWare.js';

const router = express.Router();

//pubic routes
router.get('/',getAllJob);
router.get('/:id',getOne);

//protected issue
router.post('/', protect, createJob);
router.put('/:id',protect,updateJob);
router.delete('/:id',protect,deleteJob);

export default router