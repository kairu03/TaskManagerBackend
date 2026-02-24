import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
import Task from '../models/task.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

beforeAll(async () => {
  await connectDB();

  const password = await bcrypt.hash('sample123', 10)
  const user = await User.create({
    name: 'samplename',
    email: 'samplename@gmail.com',
    password,
  })

  token = jwt.sign(
    {id: user._id},
    process.env.JWT_SECRET,
    { expiresIn: '1d'}
  )
});

afterEach(async () => {
  await Task.deleteMany();
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
})

describe('POST /api/tasks/', () => {
  it('should create new task and return 201', async () => {
    const newTask = {
      title: 'Mastering backend',
      description: 'learn automated test',
      completed: false,
    }

    const res = await request(app)
    .post('/api/tasks/')
    .set('Authorization', `Bearer ${token}`) // attach token
    .send(newTask);

    expect(res.statusCode).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toHaveProperty('title')
    expect(res.body.data).toHaveProperty('description')
    expect(res.body.data).toHaveProperty('completed')
  });

  it('should check if title does not exists and return 400', async () => {
    const checkTitle = {
      title: '',
      description: 'learn automated test',
      completed: false
    }

    const res = await request(app)
    .post('/api/tasks/')
    .set('Authorization', `Bearer ${token}`) // attach token
    .send(checkTitle)

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('message', 'Title is required')
  });
})