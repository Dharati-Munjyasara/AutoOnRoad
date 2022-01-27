// create schema for user model
const mongoose = require('mongoose');
const { Schema , model } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true
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