import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createVisitorController, visitorListController, visitorApprovalController } from '../controllers/VisitorController.js';
import jwt_auth from '../middleware/jwt_auth.js';

const router = express.Router();

//Routes for creating visit
router.post('/create-visit', createVisitorController);
router.get('/visit-list', jwt_auth , visitorListController);
router.post('/visit-approval', jwt_auth , visitorApprovalController);

export {router as visitorRouter};