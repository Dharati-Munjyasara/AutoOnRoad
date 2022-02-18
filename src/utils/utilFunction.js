/* eslint-disable no-useless-escape */
export const resStatus = (req, res, data, code = 200) => res.send({
	data,
	code,
	success: true,
});

// error function
export const resError = (req, res, data, code = 500) => res.send({
	data,
	code,
	success: false,
	// errorMessage: ,
});

// create a model will store the details like OTP, expiration time of OTP and a boolean verification field to mark OTP as used or verified.
export const createOTPModel = async (req, res) => {
	try {
		const { otp, email } = req.body;
		const otpModel = new otpModel({
			otp,
			email,
			expirationTime: Date.now() + 300000,
			isVerified: false,
		});
		await otpModel.save();
		return resStatus(req, res, { otpModel });
	} catch (err) {
		return resError(req, res, { err: 'sorry can not create otp' });
	}
};


