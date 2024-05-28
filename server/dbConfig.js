require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DEV_DATABASE_USERNAME,
  host: process.env.DEV_DATABASE_HOST,
  database: process.env.DEV_DATABASE,
  password: process.env.DEV_DATABASE_PASSWORD,
  port: process.env.DEV_DATABASE_PORT,
});

async function connectToDatabase() {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}

connectToDatabase();

module.exports = pool;
