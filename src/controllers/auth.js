import bcrypt from 'bcrypt'; // import bcryptjs
import User from '../models/userModel'; // import user model
import { resStatus, resError } from '../utils/utilFunction'; // for send status function

// fetch user data
export const fetchUserData = async (req, res) => {
	try {
		const user = await User.find(); // fetch all user data
		return resStatus(req, res, { user }); // send user data
	} catch (err) {
		return resError(req, res, { err: ' sorry can not fetch user data' });
	}
}

// fetch userdata by id 
export const fetchUserById = async (req, res) => {
	try {
		const { id } = req.params; // get id from params
		const user = await User.findById(id); // fetch user data by id
		console.log(user);
		return resStatus(req, res, { user }); // send user data
	} catch (err) {
		return resError(req, res, {	err : 'sorry can not fetch user data' });
	}
}

// send user data to user model 
export const sendUserData = async (req, res) => {
	try {
		const { name, email, password, mobile, garageName, garageAddress } = req.body;
		
		// check if email is already exist
		const user = await User.findOne({ email });
		if (user) {
			return resError(req, res, { err: 'Email already exists' });
		}

		// hashing password with bcrypt
		const hash = await bcrypt.genSalt(password, 10);

		// create new user
		const newUser = new User({
			name,
			email,
			password: hash,
			mobile,
			garageName,
			garageAddress
		});

		// save user
		await newUser.save();
		return resStatus(req, res, { newUser });
	} catch (error) {
		return resError(req, res, { err: 'Data is not inserted' });
	}
};

// delete the user
export const deleteUserData = async (req, res) => {
	try {
		const {id} = req.body;
		const user = await User.findByIdAndDelete(id);
		return resStatus(req, res, { user });
	} catch (err) {
		return resError(req, res, { err: 'sorry can not delete user' });
	}
};

// update the user
export const updateUserData = async (req, res) => {
	try {
		const { name, email, password, mobile, garageName, garageAddress } = req.body;
		const user = await User.findOneAndUpdate({id : req.params.id}, {
			$set: {
			name,
			email,
			password,
			mobile,
			garageName,
			garageAddress
			}
		});
		return resStatus(req, res, { user });
	} catch (error) {
		return resError(req, res, { err: 'sorry can not update user' });
	}	
};