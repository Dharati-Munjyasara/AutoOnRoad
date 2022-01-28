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
export const sendUserData = async (req, res) => {
  try {
    const { name, email, password, mobile, garageName, garageAddress } = req.body;

    // check if email is already exist
    const user = await User.findOne({ email });

    if (user) {
      return resError(req, res, { err: 'Email already exists' });
    }

    // promise for hash password, name, email, mobile, garageName, garageAddress and create user
    const [hashPassword, hashMobile, hashGarageName, hashGarageAddress] = await Promise.all([
      bcrypt.hash(password, 10),
      bcrypt.hash(mobile, 10),
      bcrypt.hash(garageName, 10),
      bcrypt.hash(garageAddress, 10),
    ]);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      mobile: hashMobile,
      garageName: hashGarageName,
      garageAddress: hashGarageAddress
    });

    await newUser.save(); // save user data
    console.log(newUser);

    return resStatus(req, res, { newUser });
  } catch (error) {
    return resError(req, res, { err: 'Data is not inserted' });
  }
};

// delete the user
export const deleteUserData = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);
    return resStatus(req, res, { user });
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
