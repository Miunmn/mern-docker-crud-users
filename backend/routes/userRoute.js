import { getUsers } from '../controllers/usersController.js';

import express from 'express';

const router = express.Router();

router.get('/get-users', getUsers);

router.post(
  "/create-user",  
  body('first_name').isLength({ min: 1 }).trim().withMessage('First Name min length is 1'),
  body('last_name').isLength({ min: 1 }).trim().withMessage('Last Name min length is 1'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('note').isLength({ min: 1 }).trim().withMessage('Note min length is 1')
);

export default router;