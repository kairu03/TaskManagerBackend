import mongoose from "mongoose";
import request from 'supertest';
import app from "../app.js";
import { connectDB } from "../config/db.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

beforeAll(async () => {
  // connect to test database first
  await connectDB();
});

afterEach(async () => {
  // clean users after every test  
  await User.deleteMany();
})

afterAll(async () => {
  // drop the test database and close connection
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /api/auth/login', () => {

  beforeEach(async () => {
    await User.create({
      name: 'samplename',
      email: 'samplename@gmail.com',
      password: await bcrypt.hash('sample123', 10)
    });
  });

  it('should logged in the user with a token and return 200', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'samplename@gmail.com',
        password: 'sample123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('name', 'samplename');
    expect(res.body.user).toHaveProperty('email', 'samplename@gmail.com');
    expect(res.body).toHaveProperty('token');
  });

  it('should fail if user does not exists and return 400', async () => {
    const userEmail = {
      email: 'sample@gmail.com',
      password: 'sample123'
    }

    const res = await request(app)
      .post('/api/auth/login')
      .send(userEmail)

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid input');
  });

  it('should fail it password do not match and return 400', async () => {
    const checkPassword = {
      email: 'samplename@gmail.com',
      password: 'wrongsample12345'
    }

    const res = await request(app)
      .post('/api/auth/login')
      .send(checkPassword)

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid input');
  });
});