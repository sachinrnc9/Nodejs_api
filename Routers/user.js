
import express from 'express';

import { registerController,login } from '../controllers/user.js';

const router =express.Router();

router.post('/register',registerController)

router.post('/login',login)

export default router