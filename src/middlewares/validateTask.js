import { ApiError } from "../utils/apiError.js";

export const validateCreateTask = (req, res, next) => {
  // get fields from body
  const { title, description } = req.body;

  // check if title is empty
  if (!title?.trim()) {
    throw new ApiError('Title is required', 400);
  }

  // check if description is exists/empty or if its not a string
  if (description !== undefined && typeof description !== 'string') {
    throw new ApiError('Description not valid', 400);
  };

  next(); // continue to controller
};


export const validateUpdateTask = (req, res, next) => {
  // get fields from body
  const { title, description, completed } = req.body;

  // check if title is empty, only if it exists
  if (title !== undefined && !title.trim()) {
    throw new ApiError('Title is required', 400);
  }

  // check if description is not a string, only if description exists
  if (description !== undefined && typeof description !== 'string') {
    throw new ApiError('Description not valid', 400);
  };

  // check if completed is not a boolean, only if completed exists
  if (completed !== undefined && typeof completed !== 'boolean') {
    throw new ApiError('Completed must be true or false');
  };

  next(); // continue to controller
};