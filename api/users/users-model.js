const db = require('../../db-config');

const getAllUsers = () => {
  return db('users');
};

const getUserById = (id) => {
  return db('users').where({ id }).first();
};

const createUser = (user) => {
  return db('users').insert(user).returning('id');
};

module.exports = { getAllUsers, getUserById, createUser };