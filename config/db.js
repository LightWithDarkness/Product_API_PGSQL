import pg from 'pg';
import { config } from 'dotenv';

config();

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'product-api',
  port: 5401,
  password: process.env.DB_PASS,
});

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);


  } catch (error) {
    console.error(' Error creating tables:', error);
  } 
};

(async () => {
  try {
    await client.connect();
    await createTables();
    console.log("User,Product tables created successfully");
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
})();

export default client;
