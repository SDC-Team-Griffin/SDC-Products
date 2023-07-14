const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// initializes/magages a pool of available connections to the PostgreSQL database and provides methods to interact with the database
// connections are not directly associated with any specific database or client at that point
// Instead, they are generic connections that can be dynamically assigned to clients as needed.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const loadData = async () => {
  try {
    // Ensure the connection is successfully established before proceeding.
    const client = await pool.connect(); // Requesting client connection from the pool to perform database operations.

    const productsCSVFilePath = path.join(__dirname, '..', 'CSV-data', 'product.csv');
    const featuresCSVFilePath = path.join(__dirname, '..', 'CSV-data', 'features.csv');
    const stylesCSVFilePath = path.join(__dirname, '..', 'CSV-data', 'styles.csv');
    const photosCSVFilePath = path.join(__dirname, '..', 'CSV-data', 'photos.csv');
    const skusCSVFilePath = path.join(__dirname, '..', 'CSV-data', 'skus.csv');
    const relatedCSVFilePath = path.join(__dirname, '..', 'CSV-data', 'related.csv');

    const sqlScript = fs.readFileSync('ETL/postgreSQL-ETL.sql', 'utf-8');
    const formattedSqlScript = sqlScript
      .replace('$productsCSVFilePath', productsCSVFilePath)
      .replace('$featuresCSVFilePath', featuresCSVFilePath)
      .replace('$stylesCSVFilePath', stylesCSVFilePath)
      .replace('$photosCSVFilePath', photosCSVFilePath)
      .replace('$skusCSVFilePath', skusCSVFilePath)
      .replace('$relatedCSVFilePath', relatedCSVFilePath);

    // ensure query is done

    await client.query(formattedSqlScript);
    client.release();
    console.log('Data loaded successfully!');
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    pool.end();
  }
};

loadData();

// const { Pool } = require('pg');
// const fs = require('fs');
// const path = require('path');

// const pool = new Pool({
//   user: 'darienpoon',
//   host: 'localhost',
//   database: 'sdc_products',
//   password: 'your_password',
//   port: 5432,
// });

// const loadData = async () => {
//   try {
//     const client = await pool.connect();

//     const basePath = __dirname;
//     const productsCSVFilePath = path.join(basePath, 'CSV-data', 'product.csv');
//     const featuresCSVFilePath = path.join(basePath, 'CSV-data', 'features.csv');
//     const stylesCSVFilePath = path.join(basePath, 'CSV-data', 'styles.csv');
//     const photosCSVFilePath = path.join(basePath, 'CSV-data', 'photos.csv');
//     const skusCSVFilePath = path.join(basePath, 'CSV-data', 'skus.csv');
//     const relatedCSVFilePath = path.join(basePath, 'CSV-data', 'related.csv');

//     const sqlScript = `
//       COPY products FROM '${productsCSVFilePath}' DELIMITER ',' CSV HEADER;
//       COPY features FROM '${featuresCSVFilePath}' DELIMITER ',' CSV HEADER;
//       COPY styles FROM '${stylesCSVFilePath}' DELIMITER ',' CSV HEADER;
//       COPY photos FROM '${photosCSVFilePath}' DELIMITER ',' CSV HEADER;
//       COPY skus FROM '${skusCSVFilePath}' DELIMITER ',' CSV HEADER;

//       COPY related_products FROM '${relatedCSVFilePath}' DELIMITER ',' CSV HEADER WHERE related_product_id != '0';

//       UPDATE photos SET url = TRIM(SUBSTRING(url FROM 1 FOR 500));
//     `;

//     await client.query(sqlScript);
//     client.release();
//     console.log('Data loaded successfully.');
//   } catch (error) {
//     console.error('Error loading data:', error);
//   } finally {
//     pool.end();
//   }
// };

// loadData();
