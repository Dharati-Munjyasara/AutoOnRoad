import bcrypt from 'bcrypt'; // import bcryptjs'

import User from '../models/userModel'; // import user model

import isEmail from 'validator/lib/isEmail';

import { resStatus, resError } from '../utils/utilFunction'; // for send status function

import jwt from 'jsonwebtoken';

import { sendOtp, sendRegisterEmail } from '../utils/emailSender';

// fetch user data
export const fetchUserData = async (req, res) => {
  try {
    const user = await User.find(); // fetch all user data
    return resStatus(req, res, { user }); // send user data
  } catch (err) {
    return resError(req, res, { err: ' sorry can not fetch user data' });
  }
};

// fetch userdata by id 
export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params; // get id from params
    const user = await User.findById(id); // fetch user data by id
    return resStatus(req, res, { user }); // send user data
  } catch (err) {
    return resError(req, res, { err: 'sorry can not fetch user data' });
  }
}


// send user data to user model 
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile, garageName, garageAddress } = req.body;

    // check if name , email is already exist
    const user = await User.findOne({ email });

    if (user) {
      return resError(req, res, { err: 'Email already exists' });
    }

    // validate email using isEmail
    if (!isEmail(email)) {
      return resError(req, res, { err: 'Invalid email' });
    }

    /* promise required for async await
    promise for hash password, name, email, mobile, garageName, garageAddress and create user */
    const [hashPassword, hashMobile, hashGarageName, hashGarageAddress] = await Promise.all([
      bcrypt.hash(password, 10),
      bcrypt.hash(mobile, 10),
      bcrypt.hash(garageName, 10),
      bcrypt.hash(garageAddress, 10),
    ]);

    // create user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      mobile: hashMobile,
      garageName: hashGarageName,
      garageAddress: hashGarageAddress
    });


    // use sendOtp function to send otp to user
    await sendOtp(req, res, { email });
    /* await sendRegisterEmail({ email }); */
    console.log(sendRegisterEmail);

    await newUser.save(); // save user data
    return resStatus(req, res, { newUser });

  } catch (error) {
    console.log(error);
    return resError(req, res, { err: 'Data is not inserted' });
  }
};

// delete the user
export const deleteUserData = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);
    return resStatus(req, res, { user }, { msg: 'User deleted successfully' });
  } catch (err) {
    return resError(req, res, { err: 'sorry can not delete user' });
  }
};

// delte all user
export const deleteAllUserData = async (req, res) => {
  try {
    const user = await User.deleteMany();
    return resStatus(req, res, { user });
  } catch (err) {
    return resError(req, res, { err: 'sorry can not delete user' });
  }
};

// update the user
export const updateUserData = async (req, res) => {
  try {
    const { name, email, password, mobile, garageName, garageAddress } = req.body;
    const user = await User.findOneAndUpdate({ id: req.params.id }, {
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

// authenticate user
export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return resError(req, res, { err: 'Invalid email' });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return resError(req, res, { err: 'Invalid password' });
    }

    // authenticate user with jwt
    jwt.sign({ user }, 'secretkey', { expiresIn: '24h' }, (err, token) => {
      if (err) {
        return resError(req, res, { err: 'sorry can not signup user' });
      }
      return resStatus(req, res, { user, token });
    });
  } catch (err) {
    return resError(req, res, { err: 'sorry can not authenticate user' });
  }
};
