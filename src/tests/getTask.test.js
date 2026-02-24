import { connectDB } from "../config/db";
import mongoose from "mongoose";
import request from 'supertest';
import app from "../app";
import jwt from 'jsonwebtoken';
import Task from "../models/task";
import User from "../models/user";
import bcrypt from "bcryptjs";

let user, token;

beforeAll(async () => {
  await connectDB();

  const hashedPassword = await bcrypt.hash('sample123', 10)
  user = await User.create({
    name: 'samplename',
    email: 'samplename@gmail.com',
    password: hashedPassword
  });

  token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
});

afterEach(async () => {
  await Task.deleteMany();
})

afterAll(async () => {
  await User.deleteMany()
  await mongoose.connection.close()
})

describe('GET /api/tasks/', () => {
  it('should fetched all tasks for the logged in user and return 200', async () => {
    await Task.create([
      {
        title: 'Task',
        description: 'learn automated test',
        completed: false,
        user: user._id,
      }
    ]);

    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe('Task fetched successfully')
    expect(res.body.count).toBe(1)
    expect(res.body.data.length).toBe(1)
    expect(res.body.data[0]).toHaveProperty('title')
  })

  it('should return an empty array if user have no tasks', async () => {
    const res = await request(app)
    .get('/api/tasks')
    .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.count).toBe(0)
    expect(res.body.data).toEqual([]);
  })

  it('should return empty array if user has no tasks', async () => {

    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(0);
    expect(res.body.data).toEqual([]);
  });

});



