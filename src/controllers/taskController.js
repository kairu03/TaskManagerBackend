import { ApiError } from '../utils/apiError.js';
import Task from '../models/task.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET
export const getTasks = asyncHandler(async (req, res) => {

  // get userId from req user
  const userId = req.user._id;

  // find all tasks where user == userId
  const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

  // send the requested task to frontend as json w/ status 200
  return res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks, // [] if no tasks
  });
});


// POST
export const createTask = asyncHandler(async (req, res) => {

  // get title, description from request body
  const { title, description } = req.body;
  if (!title?.trim()) {
    throw new ApiError('Title is requried', 400);
  }

  // create new task objecy (not saved yet)
  const newTask = new Task({
    title,
    description: description || '',
    completed: false,
    user: req.user._id
  });

  // save the new task thats been created
  const savedTask = await newTask.save();

  // send the saved new task to frontend as json w/ status 200
  return res.status(201).json({
    success: true,
    data: savedTask,
  });
});


// PUT
export const updateTask = asyncHandler(async (req, res) => {

  // get taskId from req URL parameters
  const taskId = req.params.id;

  // get userId from middleware
  const userId = req.user._id;

  // fetch task from database by taskId
  const task = await Task.findById(taskId);

  // check if no task found
  if (!task) {
    throw new ApiError('Task not found', 404);
  }

  // check ownership using MongoDB's built in comparison
  if (!task.user.equals(userId)) {
    throw new ApiError('Not authorized', 403);
  }

  const updates = {};

  if (req.body.title !== undefined) {
    updates.title = req.body.title;
  }

  if (req.body.description !== undefined) {
    updates.description = req.body.description;
  }

  if (req.body.completed !== undefined) {
    updates.completed = req.body.completed;
  }

  // update task in database
  const updatedTask = await Task.findByIdAndUpdate(taskId, updates,
    { new: true, runValidators: true }
  );

  // send the updated task to frontend as json w/ status 200
  return res.status(200).json({
    success: true,
    data: updatedTask,
  });
});


// DELETE
export const deleteTask = asyncHandler(async (req, res) => {

  // get taskId from req URL parameters
  const taskId = req.params.id;

  // get userId from middleware
  const userId = req.user._id;

  // fetch task from database by taskId
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError('Task not found', 404);
  }

  // check ownership
  if (!task.user.equals(userId)) {
    throw new ApiError('Not authorized', 403)
  }

  // delete the task 
  const deletedTask = await Task.findByIdAndDelete(taskId);

  // send the deleted task to frontend as json w/ status 200
  return res.status(200).json({
    success: true,
    data: deletedTask,
  });
});

