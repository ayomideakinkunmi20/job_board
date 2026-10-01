import express from 'express';
import{signUp,loggin,} from '../controller/employerController.js';

const router = express.Router();

router.post('/signUp',signUp);
router.post('/loggin',loggin);

export default router