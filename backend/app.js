const express = require('express');
const products = require('./dev-data/data/products');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
