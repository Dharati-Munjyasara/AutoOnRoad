// create schema for user model
import mongoose from 'mongoose';
import Joi from 'joi';

import isEmail from 'validator/lib/isEmail';

const { Schema, model } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
		validate: [isEmail, 'invalid email']
	},
	password: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: true
	},
	garageName: {
		type: String,
		required: false
	},
	garageAddress: {
		type: String,
		required: false
	},
}); // userSchema completed

// validate user data using Joi
export const validateUser = (user) => {
	const schema = {
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(5).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		password: Joi.string().min(4).max(255).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		mobile: Joi.string().min(4).max(20),
		garageName: Joi.string().min(4).max(255),
		garageAddress: Joi.string().min(4).max(255),
	};
	return Joi.validate(user, schema);
}


// conver schema into model
export default model('User', userSchema);	