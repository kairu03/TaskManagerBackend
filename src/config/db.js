import mongoose from 'mongoose';
import { logger } from './logger.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('MongoDB Connected Successfully');
  } catch (error) {
    logger.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
}