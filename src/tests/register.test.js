import { connectDB } from '../config/db.js';
import mongoose from "mongoose";
import request from 'supertest';
import app from "../app.js";
import User from "../models/user.js";

beforeAll(async () => {
  // connect to test database first
  await connectDB();
});

afterEach(async () => {
  // clean users after every test  
  await User.deleteMany();
})

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/auth/register', () => {
  it('should create a new user with a token and return 201', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'samplename',
        email: `samplename@gmail.com`,
        password: 'sample123',
      });


    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Register successful');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('name', 'samplename');
    expect(res.body.user).toHaveProperty('email', 'samplename@gmail.com');
    expect(res.body).toHaveProperty('token');
  });

  it('should fail if user already exists and return 400', async () => {
    const userInput = {
      name: 'same user',
      email: 'samplename@gmail.com',
      password: 'sample123'
    };

    // first create the user
    await request(app)
      .post('/api/auth/register')
      .send(userInput);

    // second attempt should fail
    const res = await request(app)
      .post('/api/auth/register')
      .send(userInput);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });
});