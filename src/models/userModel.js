// create schema for user model
import mongoose from 'mongoose';
import { validateEmail } from '../utils/utilFunction'; // for send status function

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
		validate: [validateEmail, 'Please fill a valid email address'],
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

// conver schema into model
export default model('User', userSchema);	