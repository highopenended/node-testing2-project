const request = require('supertest');
const express = require('express');
const userRoutes = require('../api/users/users-router');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('Users API Endpoints', () => {
  // Test GET /users
  it('should return a list of users', async () => {
    const res = await request(app).get('/');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });  
  it('[0] sanity check', () => {
    expect(true).not.toBe(false)
  })
  it('[1] sanity check 1', () => {
    expect(true).not.toBe(false)
  })
});