import { getUsers, createUser, updateUser, deleteUser } from '../controllers/usersController.js';
import { body, query } from 'express-validator';

import express from 'express';

const router = express.Router();

router.get('/get-users', getUsers);

router.post(
  "/create-user",  
  body('first_name').isLength({ min: 1 }).trim().withMessage('First Name min length is 1'),
  body('last_name').isLength({ min: 1 }).trim().withMessage('Last Name min length is 1'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('note').isLength({ min: 1 }).trim().withMessage('Note min length is 1'),
  createUser
);

router.put("/update-user", 
  query('id').isLength({ min: 1 }).trim().withMessage('Specify id'),
  body('first_name').optional().isLength({ min: 1 }).trim().withMessage('First Name min length is 1 '),
  body('last_name').optional().isLength({ min: 1 }).trim().withMessage('Last Name min length is 1'),
  body('email').optional().isEmail().withMessage('Email is invalid'),
  body('note').optional().isLength({ min: 1 }).trim().withMessage('Note min length is 1'),
  updateUser
);

router.delete("/delete-user", 
  query('id').isLength({ min: 1 }).trim().withMessage('Specify id'),
  deleteUser
);

export default router;