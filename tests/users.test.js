const request = require('supertest');
const express = require('express');
const userRoutes = require('../api/users/users-router');

const app = express();
const db = require('../db-config')
app.use(express.json());
app.use('/api/users', userRoutes);

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

describe('Users API Endpoints', () => {
  
  it('should return a list of users', async () => {
    const res = await request(app).get('/api/users');    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return an empty array if no users exist', async () => {
    await db('users').truncate(); // Clear the users table
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('should create a new user', async () => {
    const newUser = { name: 'Test User', email: 'test@example.com' };
    const res = await request(app).post('/api/users').send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should return 400 for invalid user data', async () => {
    const invalidUser = { name: '' };
    const res = await request(app).post('/api/users').send(invalidUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Name is required and must be a string');
  });

  it('should return a user by ID', async () => {
    const [id] = await db('users').insert({ name: 'Alice', email: 'alice@example.com' });
    const res = await request(app).get(`/api/users/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', id);
    expect(res.body).toHaveProperty('name', 'Alice');
    expect(res.body).toHaveProperty('email', 'alice@example.com');
  });

  it('should return 404 if user does not exist', async () => {
    const res = await request(app).get('/api/users/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('should return 400 if name is missing', async () => {
    const invalidUser = { email: 'invalid@example.com' };
    const res = await request(app).post('/api/users').send(invalidUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Name is required and must be a string');
  });

  it('should return 400 if email is missing', async () => {
    const invalidUser = { name: 'Invalid User' };
    const res = await request(app).post('/api/users').send(invalidUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Valid email is required');
  });

  it('should return 400 if email is not valid', async () => {
    const invalidUser = { name: 'Invalid User', email: 'invalid-email' };
    const res = await request(app).post('/api/users').send(invalidUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Valid email is required');
  });
  
  it('[0] sanity check', () => {
    expect(true).not.toBe(false)
  })

});