import express from 'express';

import { verifyToken } from '../middleware/auth.js';

import {
	sendUserData,
	fetchUserData,
	fetchUserById,
	deleteUserData,
	updateUserData,
	deleteAllUserData,
	authenticateUser

} from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/fetchUserData', fetchUserData); // fetch user data

router.get('/fetchUserById/:id', fetchUserById); // fetch user by id 

router.post('/registerUser', sendUserData); // send user data

router.delete('/deleteUserData/:id', verifyToken, deleteUserData); // delete user

router.delete('/deleteAllUserData', deleteAllUserData); // delete all user

router.put('/updateUserData/:id', updateUserData); // update user

router.post('/loginUser', authenticateUser); // authenticate user

export default router;
