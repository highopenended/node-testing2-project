const express = require('express');
const router = express.Router();
const User = require('./users-model');
const {validateUser}=require('./users-middleware')

// GET all users
router.get('/', async (req, res, next) => {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  });
  
  // GET a user by ID
  router.get('/:id', async (req, res, next) => {
    try {
      const user = await User.getUserById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      next(err);
    }
  });
  
  // POST a new user (with validation)
  router.post('/', validateUser, async (req, res, next) => {
    try {
      const [id] = await User.createUser(req.body);
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = router;