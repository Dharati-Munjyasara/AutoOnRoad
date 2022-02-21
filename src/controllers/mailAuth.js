import { resStatus, resError } from '../utils/utilFunction'; // for send status function

import { Otp } from '../models/otpModel';

// create OTP instance and save it in database
export const createOTP = async (req, res) => {
	try {
		// generate otp
		const otp = Math.floor(100000 + Math.random() * 900000);
		const expirationTime = Date.now() + 300000;

		// create new otp instance
		const newOtp = new Otp({
			otp,
			expirationTime,
		});

		const generatedOtp = await newOtp.save(); // save otp in database
		return generatedOtp;
	} catch (error) {
		console.log(error);
		return resError(req, res, { err: 'sorry can not create otp' });
	}
};

