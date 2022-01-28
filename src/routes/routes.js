import express from 'express';

import {
	sendUserData,
	fetchUserData,
	fetchUserById,
	deleteUserData,
	updateUserData,
	deleteAllUserData,
	authenticateUser

} from '../controllers/auth.js';

const router = express.Router();

router.get('/fetchUserData', fetchUserData); // fetch user data

router.get('/fetchUserById/:id', fetchUserById); // fetch user by id 

router.post('/sendUserData', sendUserData); // send user data

router.delete('/deleteUserData/:id', deleteUserData); // delete user

router.delete('/deleteAllUserData', deleteAllUserData); // delete all user

router.put('/updateUserData/:id', updateUserData); // update user

router.post('/authenticateUser', authenticateUser); // authenticate user

export default router;
