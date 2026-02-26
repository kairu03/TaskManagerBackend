import validator from 'validator';
import { ApiError } from "../utils/apiError.js";

export const validateRegister = (req, res, next) => {
  // get fields from body
  const { name, email, password } = req.body;

  // check if fields are empty
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    throw new ApiError('All fields are required', 400);
  }

  // check if emails format is not valid or is empty
  if (!validator.isEmail(email)) {
    throw new ApiError('Invalid email', 400);
  }

  // check if password is atleast 6 characters or is empty
  if (password.trim().length < 6) {
    throw new ApiError('Password must be at least 6 characters', 400);
  }

  next(); // continue to controller
};


export const validateLogin = (req, res, next) => {
  // get fields from req body
  const { email, password } = req.body;

  // check if email and password exists/empty
  if (!email || !password) {
    throw new ApiError('Email and password are  required', 400)
  }

  next(); // continue to controller
};


export const validateProfileUpdate = (req, res, next) => {
  // get fields from body
  const { name, email, password } = req.body;

  // check if name is empty, only if name exists
  if (name !== undefined && !name.trim()) {
    throw new ApiError('Name required', 400)
  }

  // check if email format is valid, only if email exists
  if (email !== undefined && !validator.isEmail(email)) {
    throw new ApiError('Invalid email', 400);
  }

  // check if password is atleast 6 characters, only if password exists 
  if (password.trim() !== undefined && password.trim().length < 6) {
    throw new ApiError('Password must be at least 6 characters', 400);
  }

  next() // // continue to controller
};