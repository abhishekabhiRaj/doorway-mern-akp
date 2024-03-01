import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginController, registerController } from '../controllers/AuthController.js';

const router = express.Router();

//Routes for login and register
router.post('/register', registerController);
router.post('/login', loginController);

export {router as authRouter} 