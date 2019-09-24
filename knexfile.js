require('dotenv').config();
const DATABASE_URL = process.env.DB_USER

module.exports = {

  production: {
    client: 'pg',
    connection: DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  }

};
