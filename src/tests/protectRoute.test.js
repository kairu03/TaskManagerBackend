import { connectDB } from "../config/db";
import mongoose from "mongoose";
import request from 'supertest'
import User from "../models/user";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import dotenv from 'dotenv';

dotenv.config();

const testApp = express();
testApp.use(express.json());

testApp.get("/test-protectRoute", protectRoute, (req, res) => {
  res.status(200).json({ 
    success: true, 
    user: req.user 
  });
});

testApp.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: err.message || "Server Error" });
});

let token;

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  const hashedPassword = await bcrypt.hash('sample123', 10)
  const user = await User.create({
    name: 'samplename',
    email: 'samplename@gmail.com',
    password: hashedPassword
  });

  token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
})

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});


describe('protectRoute middleware', () => {
  it('should return a 401 if token is missing', async () => {
    const res = await request(testApp)
    .get('/test-protectRoute')

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Not authorized, token missing');
  });

  it('should return 401 if token format is wrong', async () => {
    const res = await request(testApp)
      .get('/test-protectRoute')
      .set('Authorization', 'Invalidtoken')

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Not authorized, token missing');
  });

  it('should return 401 is token is invalid', async () => {
    const res = await request(testApp)
      .get('/test-protectRoute')
      .set('Authorization', 'Bearer Invalidtoken')

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Not authorized, invalid token');
  });

  it('should return a 404 if user is not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const fakeToken = jwt.sign(
      { id: fakeId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    const res = await request(testApp)
      .get('/test-protectRoute')
      .set('Authorization', `Bearer ${fakeToken}`)

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('should allow access if token is valid', async () => {
    const res = await request(testApp)
      .get('/test-protectRoute')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toHaveProperty('email', 'samplename@gmail.com');
  });
});




