import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createVisitorController } from '../controllers/VisitorController.js';

const router = express.Router();

//Routes for creating visit
router.post('/create-visit', createVisitorController);

export {router as visitorRouter};