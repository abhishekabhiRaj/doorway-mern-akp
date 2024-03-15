import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authRouter } from './routes/auth.js';
import { visitorRouter } from './routes/visitor.js';
import dotenv from 'dotenv';

// .evn configuration
dotenv.config();

// Using Port from .env
const PORT = process.env.PORT;

// MongoDB Database connection
mongoose.connect(`${process.env.DATABASE_URL + process.env.DATABASE}`);

// Initiallizing Express
const app = express();

// CORS Properties
const corsOpts = {
    origin: process.env.MAIN_URL,
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};

// Using Cross Origin and Express Json Response 
app.use(cors(corsOpts));
app.use(express.json());

// Routes Defined
app.use('/', authRouter);
app.use('/', visitorRouter);

// Start Node App On Port
app.listen(PORT, () => {
    console.log(`Server's Up On Port ${PORT}`);
});