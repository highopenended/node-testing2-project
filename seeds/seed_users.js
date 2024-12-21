/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed =  async function(knex) {
  return await knex('users').insert([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
  ]);
};
