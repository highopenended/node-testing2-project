module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './dev.sqlite3'
      },
      useNullAsDefault: true,
    },
    testing: {
      client: 'sqlite3',
      connection: {
        filename: ':memory:'
      },
      useNullAsDefault: true,
    }
  };