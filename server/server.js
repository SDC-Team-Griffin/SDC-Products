const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const router = require('./routes.js');
require("dotenv").config();

const app = express()

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

const asyncHandler = require("express-async-handler") // defines wrapper func that hides try..catch block/ code to forward error, only need to write code for case where we assume success

// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from http://localhost:3000
app.use('/', router);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}: http://localhost:${port}`)
})