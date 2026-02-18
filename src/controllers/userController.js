import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.js";
import bcrypt from 'bcryptjs';

// GET
export const getUserProfile = asyncHandler((req, res) => {
  // check if user exists
  if (!req.user) {
    throw new ApiError('User not found', 404);
  }

  // extract this fields from req.user
  const { _id, name, email, createdAt } = req.user;

  // Return only safe user fields in the response
  return res.status(200).json({
    success: true,
    message: 'User profile fetched successfully',
    data: {
      _id,
      name,
      email,
      createdAt
    }
  });
});


// PUT
export const updateUserProfile = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;
  const updates = {};

  // check if name, email, password exists
  if (name !== undefined) updates.name = name.trim();
  if (email !== undefined) updates.email = email.trim();
  if (password !== undefined) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updates.password = hashedPassword;
  }

  // prevent empty update
  if (Object.keys(updates).length === 0) {
    throw new ApiError('No fields provided for update', 400);
  }

  // update user in database and return the updated document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, updates,
    { new: true, runValidators: true });

  // check if updatedUser was not found and return 404
  if (!updatedUser) {
    throw new ApiError('User not found', 404);
  }

  // send the updated fields to frontend as json w/ status 200
  return res.status(200).json({
    success: true,
    message: 'User profile updated successfully',
    data: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt
    }
  });
});


// DELETE
export const deleteUserProfile = asyncHandler(async (req, res) => {
  // get userId from middleware
  const userId = req.user._id;

  // delete user from database
  const deletedUser = await User.findByIdAndDelete(userId);

  // check if delete was successful
  if (!deletedUser) {
    throw new ApiError('User not found', 404)
  }

  return res.status(200).json({
    success: true,
    message: 'User profile deleted successfully',
    data: deletedUser,
  });
});