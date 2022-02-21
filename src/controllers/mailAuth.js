import { resStatus, resError } from '../utils/utilFunction'; // for send status function

import { Otp } from '../models/otpModel';

// create OTP instance and save it in database
export const createOTP = async (req, res) => {
	try {

		let { otp, expirationTime, now } = req.body;

		// generate otp
		otp = Math.floor(100000 + Math.random() * 900000);
		now = Date.now();
		expirationTime = Date.now() + 300000;

		// create new otp instance
		const newOtp = new Otp({
			otp,
			expirationTime,
		});

		await newOtp.save(); // save otp in database
		console.log(newOtp);
		return resStatus(req, res, { newOtp });
	} catch (error) {
		console.log(error);
		return resError(req, res, { err: 'sorry can not create otp' });
	}
};

