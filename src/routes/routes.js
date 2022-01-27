import express from 'express';

import { fetchUserData } from '../controllers/auth.js';

const router = express.Router();

router.get('/', fetchUserData);

export default router;