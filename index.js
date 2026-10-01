import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './configuration/database.js';
import cors from 'cors';
import employerRoutes from './routes/employerRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js'


connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/employer', employerRoutes);
app.use('/api/job',jobRoutes);
app.use('/api/application',applicationRoutes)




const port = process.env.port

app.listen(port);
console.log(`app already in port at ${port} listening`);