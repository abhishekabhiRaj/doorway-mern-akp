import express from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import LoginController from '../controllers/LoginController.js';

const router = express.Router();

const loginController = new LoginController();
router.post('/register', async (req, res) => loginController.register(req, res));


router.post('/login', async (req, res) => loginController.login(req, res));





// router.put('')

export {router as loginRouter} 