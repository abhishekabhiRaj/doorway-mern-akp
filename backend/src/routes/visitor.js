import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createVisitorController, visitorListController } from '../controllers/VisitorController.js';
import jwt_auth from '../middleware/jwt_auth.js';

const router = express.Router();

//Routes for creating visit
router.post('/create-visit', createVisitorController);
router.get('/visit-list', jwt_auth , visitorListController);

export {router as visitorRouter};