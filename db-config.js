const knex = require('knex');
const config = require('./knexfile');

const environment = process.env.NODE_ENV || 'development';
console.log(`Using ${environment} environment for database`);

module.exports = knex(config[environment]);