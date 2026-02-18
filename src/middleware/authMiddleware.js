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


// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (user) return res.status(400).json({message: 'user already exists'});

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword
//     });

//     const savedUser = await newUser.save();

//     const token = jwt.sign(
//       { id: savedUser._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     return res.status(200).json({
//       id: savedUser._id,
//       name: savedUser.name,
//       email: savedUser.email,
//       token
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({message: 'server error'})
//   }
// }


// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) return res.status(401).json({message: 'invalid password'});

//     const token = jwt.sign(
//       {id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d'}
//     );

//     return res.status(200).json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       token
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({message: 'server error'})
//   }
// }


// export const protectRoute = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({message: 'not authorized'});
//     };

//     const token = authHeader.split(' ')[1];
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) return res.status(404).json({message: 'user not found'});

//     req.user = user;

//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({message: 'server error'})
//   }
// }


// export const updateTask = async (req, res) => {
//   try {
//     const taskId = req.params.id;
//     const userId = req.user._id;

//     const task = await Task.findById(taskId);
//     if (!task) return res.status(404).json({message: 'task not found'});

//     if (task.user.toString() !== userId.toString()) {
//       return res.status(403).json({message: 'not authorized'});
//     }

//     const updates = {};

//     if (req.body.title !== undefined) {
//       updates.title = req.body.title
//     }
//     if (req.body.description !== undefined) {
//       updates.description = req.body.description
//     }
//     if (req.body.completed !== undefined) {
//       updates.completed = req.body.completed
//     }

//     const updatedTask = await Task.findByIdAndUpdate(taskId, updates, 
//       {new: true, runValidators: true}
//     );

//     return res.status(200).json(updatedTask);

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({message: 'server error'});
//   }
// };

// export const deleteTask = async (req, res) => {
//   try {
//     const taskId = req.params.id;
//     const userId = req.user._id;

//     const task = await Task.findById(taskId);
//     if (!task) return res.status(404).json({message: 'task not found'});

//     if (task.user.toString() !== userId.toString()) {
//       return res.status(403).json({message: 'not authorized'});
//     }

//     const deletedTask = await Task.findByIdAndDelete(taskId);
//     return res.status(200).json(deletedTask);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({message: 'server error'});
//   }
// }