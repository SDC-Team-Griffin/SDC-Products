const express = require('express')
const morgan = require('morgan');
const router = require('./routes.js');
const { Pool } = require('pg');

const app = express()

const asyncHandler = require("express-async-handler") // defines wrapper func that hides try..catch block/ code to forward error, only need to write code for case where we assume success

const pool = new Pool ({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

app.use(morgan('dev'));
app.use('/', router);
app.use(express.json());


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}: http://localhost:${port}`)
})