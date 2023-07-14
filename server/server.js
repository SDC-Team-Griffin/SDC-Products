const express = require('express')
const morgan = require('morgan');
const router = require('./routes.js');
require("dotenv").config();

const app = express()

const asyncHandler = require("express-async-handler") // defines wrapper func that hides try..catch block/ code to forward error, only need to write code for case where we assume success

// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(morgan('dev'));
app.use('/', router);
app.use(express.json());


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}: http://localhost:${port}`)
})