//create schema for otp model

import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema, model } = mongoose;
const otpSchema = new Schema({
	otp: {
		type: String,
		required: true,
	},
	expirationTime: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
}); // otpSchema completed

// validate otp data using Joi
export const validateOTP = (otp) => {
	const schema = {
		otp: Joi.string().min(4).max(255).required(),
		email: Joi.string().min(5).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		expirationTime: Joi.date().required(),
		isVerified: Joi.boolean().default(false),
	};
	return Joi.validate(otp, schema);
}

// create model for otp
export const Otp = model('Otp', otpSchema);
