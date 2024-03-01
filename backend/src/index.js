import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authRouter } from './routes/auth.js';
import { visitorRouter } from './routes/visitor.js';

mongoose.connect('mongodb://localhost:27017/doorway');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRouter);
app.use('/', visitorRouter);

app.listen(8080, ()=>{
    console.log('Server is running on port 8081');
});