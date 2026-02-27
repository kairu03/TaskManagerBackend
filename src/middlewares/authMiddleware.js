import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';

export const protectRoute = asyncHandler(async (req, res, next) => {
  
    // get token from headers
    const authHeader = req.headers.authorization;

    // check if token exists
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer')) {
      throw new ApiError('Not authorized, token missing', 401)
    };

    // extract actual token after bearer
    const token = authHeader.split(' ')[1];
    
    //verify token
    // jwt.verify returns the payload we encoded in the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new ApiError('Not authorized, invalid token', 401)
    }
  
    // Find the authenticated user by ID and exclude the password field 
    const user = await User.findById(decoded.id).select('-password');

    // check if user exists
    if (!user) {
      throw new ApiError('User not found', 404)
    }

    // Attach the user info to the request object
    // So that the route handler knows which user is making the request
    req.user = user; 

    // call next() to continue to route
    next();
});

