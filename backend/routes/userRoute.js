import { getUsers } from '../controllers/usersController.js';

import express from 'express';

const router = express.Router();

router.get('/get-users', getUsers);

export default router;