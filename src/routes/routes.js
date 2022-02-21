import express from 'express';

import {
	registerUser,
	fetchUserData,
	fetchUserById,
	deleteUserData,
	updateUserData,
	deleteAllUserData,
	authenticateUser

} from '../controllers/auth.js';

import {
	createOTP,
} from '../controllers/mailAuth.js';
import { sendOtp } from '../utils/emailSender.js';

const router = express.Router();

router.get('/fetchUserData', fetchUserData); // fetch user data

router.get('/fetchUserById/:id', fetchUserById); // fetch user by id 

router.post('/registerUser', registerUser); // send user data

router.delete('/deleteUserData/:id', deleteUserData); // delete user

router.delete('/deleteAllUserData', deleteAllUserData); // delete all user

router.put('/updateUserData/:id', updateUserData); // update user

router.post('/loginUser', authenticateUser); // authenticate user

router.post('/createOTP', createOTP); //otp send

// send otp
router.post('/sendOtp', sendOtp)

export default router;
