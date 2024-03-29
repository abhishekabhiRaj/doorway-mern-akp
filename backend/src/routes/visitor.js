import express from 'express';
import bcrypt from 'bcrypt';
import { createVisitorController, visitorListController, visitorApprovalController, visitorCheckinoutController, visitorMarkCompleteController } from '../controllers/VisitorController.js';
import jwt_auth from '../middleware/jwt_auth.js';
import only_sub_admin from '../middleware/only_sub_admin.js';

const router = express.Router();

//Routes for creating visit
router.post('/create-visit', createVisitorController);
router.get('/visit-list' , jwt_auth, visitorListController);
router.post('/visit-approval', jwt_auth , visitorApprovalController);
router.post('/checkin', jwt_auth , visitorCheckinoutController);
router.post('/mark-complete', jwt_auth, only_sub_admin , visitorMarkCompleteController);

export {router as visitorRouter};