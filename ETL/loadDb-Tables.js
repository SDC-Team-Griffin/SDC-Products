const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

// initializes/magages a pool of available connections to the PostgreSQL database and provides methods to interact with the database
// connections are not directly associated with any specific database or client at that point
// Instead, they are generic connections that can be dynamically assigned to clients as needed
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres', // start with postgres database, then create new db
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const loadDBTables = async () => {
  try {
    await pool.query('CREATE DATABASE sdc_products');
    await pool.end(); // Close the connection to the 'postgres' database

    const sdcPool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });

    const sqlScript = fs.readFileSync('database/SQL-Schema-products.sql', 'utf-8');
    await sdcPool.query(sqlScript);
    await sdcPool.end(); // Close the connection to the 'sdc_products' database

    console.log('sdc_products Database and tables (products, features, styles, photos, skus, related_products) created successfully!');
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

loadDBTables();
