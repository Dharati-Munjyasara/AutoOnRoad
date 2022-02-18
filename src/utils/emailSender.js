import nodemailer from 'nodemailer';

import { resStatus, resError } from './utilFunction';

import { createOTP } from '../controllers/mailAuth';

// create function for send otp
// emailObj will return the email from the request body from auth.js
export const sendOtp = async (req, res, emailObj) => {
	try {

		await createOTP(req, res);

		// send otp to user in mail using createOtp function
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'pratikgamer81@gmail.com',
				pass: 'Gamingis007'
			}
		});

		const mailOptions = {
			from: 'showking00765@gmail.com',
			to: emailObj.email,
			subject: 'OTP',
			text: `Your OTP is ${emailObj.otp}`
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email seemailObjnt: ' + info.response);
			}
		});

		return resStatus(req, res, { msg: 'OTP sent to your email' });
	} catch (error) {
		console.log(error);
		return resError(req, res, { err: 'sorry can not send otp' });
	}
};


//create function for sending email
export const sendRegisterEmail = async (emailObj) => {
	try {

		//create transporter
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'pratikgamer81@gmail.com',
				pass: 'Gamingis007'
			}
		});

		//create mail options
		const mailOptions = {
			from: 'showking00765@gmail.com', //sender address
			// get email from registerUser
			to: emailObj.email, //receiver address
			subject: "Account registration", //Subject line
			text: "Thank you for creating account", //plain text body
		};

		//send mail
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Email sent: ' + info.response);
			}

			//close transporter
			transporter.close();
		});
	} catch (error) {
		console.log(error);
	}
};
