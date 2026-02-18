import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import { ApiError } from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';


export const userRegister = asyncHandler(async (req, res) => {

  // get name, email, password from user inputs or body
  const { name, email, password } = req.body;

  // check if user's email exist in the database
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError('User already exists', 400);
  }

  // hash password before saving it in MongoDB
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user in database using hashed password
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // create a JWT token for the new user
  const token = jwt.sign(
    { id: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // send user info and token to frontend
  return res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    },
    token
  });
});


export const userLogin = asyncHandler(async (req, res) => {

  // get email, password from user inputs
  const { email, password } = req.body;

  // console.log("JWT Secret:", process.env.JWT_SECRET);

  // check if user already exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError('Invalid input', 400);
  }

  // check if password match (password from user, password in database)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError('Invalid input', 400);
  }

  // if password match => create a JWT token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // send user info and token to frontend
  return res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token
  });
});