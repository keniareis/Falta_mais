import { Router } from 'express';
const router = Router();

import { login } from '../controllers/authController.js';

router.post('/', login);

export default router;